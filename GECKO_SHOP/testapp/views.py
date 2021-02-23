# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.shortcuts import render
from .models import *

import time


# Create your views here.


def home(request):
    return HttpResponse('Hello, World!')

def datetime(request):
    return HttpResponse(time.strftime("%I:%M:%S"))

def homepage(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def error(request):
    return render(request, '404_page.html')

def all_products(request):
    all_p = Product.objects.all()
    return render(request, 'all_products.html', {'products': all_p})