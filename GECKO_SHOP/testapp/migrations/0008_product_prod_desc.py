# Generated by Django 3.1.7 on 2021-02-23 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0007_auto_20210223_1532'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='prod_desc',
            field=models.CharField(default='description missing', max_length=200),
            preserve_default=False,
        ),
    ]
