from django.forms import ModelForm, ModelChoiceField
from .models import Product, CaUser, ProductCategory, Order
from django.contrib.auth.forms import UserCreationForm
from django.db import transaction
from django import forms
from django.contrib.auth.forms import AuthenticationForm


class CategoryChoiceField(ModelChoiceField):
    def label_from_instance(self, obj):
        return obj.name


class UserLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(UserLoginForm, self).__init__(*args, **kwargs)
    username = forms.TextInput(attrs={'class': 'form-control', 'placeholder': '', 'id': 'hello'})
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': '', 'id': 'hi'}))


class ProductForm(ModelForm):
    category = CategoryChoiceField(queryset=ProductCategory.objects.all())
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'category', 'picture']


class CASignupForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CaUser

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_admin = False
        user.save()
        return user


class AdminSignupForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CaUser

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_admin = True
        user.save()
        return user


class OrderForm(ModelForm):
    shipping_addr = forms.CharField(label="Shipping Address", widget=forms.TextInput())
    class Meta:
        model = Order
        fields = ['shipping_addr']
