import numpy as np
import pydicom
import base64
import io
import os
import logging
from datetime import datetime
from PIL import Image
from django.conf import settings
from rest_framework.response import Response
from graphene_django.views import GraphQLView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from .models import DicomFile
from .serializers import DicomFileSerializer

class DicomUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = DicomFileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_instance = file_serializer.save()

            # Process the DICOM file
            dicom_data = pydicom.dcmread(file_instance.file.path)

            # Extract metadata
            patient_name = str(dicom_data.get("PatientName", ""))
            raw_birth_date = str(dicom_data.get("PatientBirthDate", ""))  # DICOM date format
            series_description = str(dicom_data.get("SeriesDescription", ""))
            modality = str(dicom_data.get("Modality", ""))
            study_date = str(dicom_data.get("StudyDate", ""))

            # Convert birth date to YYYY-MM-DD format
            def convert_dicom_date(date_str):
                if not date_str or date_str == "None":
                    return None  # Handle empty values
                try:
                    # DICOM date formats: YYYYMMDD or MM/YYYY
                    if len(date_str) == 8:  # YYYYMMDD format
                        return datetime.strptime(date_str, "%Y%m%d").date()
                    elif len(date_str) == 7:  # MM/YYYY format
                        return datetime.strptime(date_str, "%m/%Y").date()
                    elif len(date_str) == 4:  # YYYY format (approximate birth year)
                        return datetime.strptime(date_str, "%Y").date()
                except ValueError:
                    return None  # Ignore invalid formats

            patient_birth_date = convert_dicom_date(raw_birth_date)

            # Update the model instance with extracted data
            file_instance.patient_name = patient_name
            file_instance.patient_birth_date = patient_birth_date  # Now correctly formatted
            file_instance.series_description = series_description
            file_instance.save()  # Save changes to the database

            # Convert DICOM image to PNG and save it as a file
            pixel_data = dicom_data.pixel_array.astype(float)
            pixel_data = ((pixel_data - pixel_data.min()) / (pixel_data.max() - pixel_data.min())) * 255.0
            pixel_data = pixel_data.astype(np.uint8)
            img = Image.fromarray(pixel_data)

            # Define the file path for the image
            image_filename = f"{file_instance.id}.png"
            image_path = os.path.join(settings.MEDIA_ROOT, "dicom_images", image_filename)

            # Create the directory if it doesn't exist
            os.makedirs(os.path.dirname(image_path), exist_ok=True)

            # Save the image to disk
            img.save(image_path)

            # Prepare the response with metadata and image URL
            response_data = {
                "PatientName": patient_name,
                "PatientBirthDate": str(patient_birth_date),  # Convert back to string for response
                "SeriesDescription": series_description,
                "Modality": modality,
                "StudyDate": study_date,
                "image_url": f"/media/dicom_images/{image_filename}",  # Return image URL instead of Base64
            }

            return Response(response_data)

        return Response(file_serializer.errors, status=400)


logger = logging.getLogger(__name__)

class CustomGraphQLView(GraphQLView):
    def dispatch(self, *args, **kwargs):
        logger.debug("Handling GraphQL request")
        return super().dispatch(*args, **kwargs)
