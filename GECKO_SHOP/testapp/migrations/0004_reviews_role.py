# Generated by Django 3.1.5 on 2021-03-09 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0003_auto_20210305_2341'),
    ]

    operations = [
        migrations.AddField(
            model_name='reviews',
            name='role',
            field=models.CharField(default=1, max_length=40),
            preserve_default=False,
        ),
    ]
