# Generated by Django 3.1.7 on 2021-03-09 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0004_reviews_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='picture',
            field=models.FileField(blank=True, upload_to='product_img/'),
        ),
    ]
