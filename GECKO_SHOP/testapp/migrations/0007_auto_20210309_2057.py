# Generated by Django 3.1.7 on 2021-03-09 20:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0006_auto_20210309_2056'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='product',
            new_name='prod',
        ),
    ]
