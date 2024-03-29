# Generated by Django 3.1.7 on 2021-03-10 14:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0009_auto_20210309_2101'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Category',
            new_name='ProductCategory',
        ),
        migrations.RenameField(
            model_name='productcategory',
            old_name='cat_id',
            new_name='id',
        ),
        migrations.RenameField(
            model_name='productcategory',
            old_name='cat_name',
            new_name='name',
        ),
        migrations.RemoveField(
            model_name='product',
            name='category_id',
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, to='testapp.productcategory'),
            preserve_default=False,
        ),
    ]
