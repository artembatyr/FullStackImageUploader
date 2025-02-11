from rest_framework import serializers
from .models import DicomFile

class DicomFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DicomFile
        fields = "__all__"