# Generated by Django 3.1.7 on 2021-03-09 20:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0007_auto_20210309_2057'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='prod',
            new_name='product',
        ),
    ]
