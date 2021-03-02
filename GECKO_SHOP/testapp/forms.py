from django.forms import ModelForm
from .models import Product


class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ['prod_name', 'prod_desc', 'unit_price', 'prod_pic', 'cat_id']
