from django.urls import path, include
from .models import *  # Import your model
from rest_framework import serializers

# serializers.py deals with the actual visualisation of models (in others what data to show)


# Users
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CaUser
        fields = ['url', 'username', 'email', 'is_admin']


# Orders
class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ['url', 'date_created', 'shipping_addr', 'user_id', 'id']  # Note this is a double underscore !


# Products
class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'picture']


# Reviews
class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Reviews
        fields = '__all__'
