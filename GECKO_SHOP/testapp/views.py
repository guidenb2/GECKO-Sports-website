# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .models import *
from .forms import *

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


def singleproduct(request, prod_id):
    prod = get_object_or_404(Product, pk=prod_id)
    return render(request, 'single_product.html', {'product': prod})


def customer_reviews(request):
    reviews = Reviews.objects.all()
    return render(request, 'reviews.html', {'reviews': reviews})

def myform(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            new_product = form.save()
            return render(request, 'single_product.html', {'product:': new_product })
    else:
        form = ProductForm()
        return render(request, 'form.html', {'form': form})
