from django.urls import path, include
from .models import *  # Import your model
from rest_framework import serializers

# serializers.py deals with the actual visualisation of models (in others what data to show)

# Users
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CaUser
        fields = '__all__'  # Note this is a double underscore !


# Orders
class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'  # Note this is a double underscore !