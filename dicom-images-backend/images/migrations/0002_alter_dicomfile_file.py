# Generated by Django 4.1 on 2025-02-09 22:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dicomfile',
            name='file',
            field=models.FileField(upload_to=''),
        ),
    ]
