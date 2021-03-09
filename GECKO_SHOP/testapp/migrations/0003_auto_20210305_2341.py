# Generated by Django 3.1.5 on 2021-03-05 23:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0002_reviews'),
    ]

    operations = [
        migrations.AddField(
            model_name='reviews',
            name='customer_name',
            field=models.CharField(default=True, max_length=40),
        ),
        migrations.AddField(
            model_name='reviews',
            name='customer_pic',
            field=models.CharField(default=1, max_length=500),
            preserve_default=False,
        ),
    ]