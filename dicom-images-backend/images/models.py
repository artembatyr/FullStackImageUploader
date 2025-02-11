from django.db import models

class DicomFile(models.Model):
    file = models.FileField()
    patient_name = models.CharField(max_length=255, default='')
    patient_birth_date = models.DateField(max_length=255, null=True, blank=True)
    series_description = models.CharField(max_length=255, default='')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    image_url = models.CharField(max_length=255, null=True, blank=True)