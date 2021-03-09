# -*- coding: utf-8 -*-
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
from .models import *
from .forms import *
from django.views.generic import CreateView
from django.contrib.auth import login, logout
from django.contrib.auth.views import LoginView

import time


# Create your views here.
class CaUserSignupView(CreateView):
    model = CaUser
    form_class = CASignupForm
    template_name = 'causer_signup.html'

    def get_context_data(self, **kwargs):
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('/')


class AdminSignupView(CreateView):
    model = CaUser
    form_class = AdminSignupForm
    template_name = "admin_signup.html"

    def get_context_data(self, **kwargs):
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('/')


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
    total = Product.objects.all().count()
    return render(request, 'all_products.html', {'products': all_p, 'count': total})


def singleproduct(request, prod_id):
    prod = get_object_or_404(Product, pk=prod_id)
    return render(request, 'single_product.html', {'product': prod})


def productform(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            new_product = form.save()
            return render(request, 'single_product.html', {'product:': new_product })
    else:
        form = ProductForm()
        return render(request, 'form.html', {'form': form})


class Login(LoginView):
    template_name = 'login.html'


def logout_view(request):
    logout(request)
    return redirect('/')


def customer_reviews(request):
    reviews = Reviews.objects.all()
    return render(request, 'reviews.html', {'reviews': reviews})
