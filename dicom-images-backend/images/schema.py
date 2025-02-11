import graphene
from graphene_django.types import DjangoObjectType
from .models import DicomFile

class DicomFileType(DjangoObjectType):
    class Meta:
        model = DicomFile
        fields = ("id", "patient_name", "patient_birth_date", "series_description", "file", "uploaded_at", "image_url")

class Query(graphene.ObjectType):
    dicom_files = graphene.List(DicomFileType)

    def resolve_dicom_files(self, info):
        return DicomFile.objects.all()

schema = graphene.Schema(query=Query)
