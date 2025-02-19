# Generated by Django 4.1 on 2025-02-10 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0002_alter_dicomfile_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='dicomfile',
            name='patient_birth_date',
            field=models.DateField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='dicomfile',
            name='patient_name',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='dicomfile',
            name='series_description',
            field=models.CharField(default='', max_length=255),
        ),
    ]
