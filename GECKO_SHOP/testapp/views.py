# -*- coding: utf-8 -*-
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
from .models import *
from .forms import *
from django.views.generic import CreateView
from django.contrib.auth import login, logout
from django.contrib.auth.views import LoginView, login_required
from django.contrib.auth.decorators import user_passes_test

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


@login_required
@user_passes_test(lambda u: u.is_admin)
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


@login_required
@user_passes_test(lambda u: u.is_admin)
def all_orders(request):
    all_ords = Order.objects.all()
    total = Order.objects.all().count()
    return render(request, 'orders.html', {'orders': all_ords, 'count': total})


@login_required
def basket(request):
    user = request.user
    shopping_basket = ShoppingBasket.objects.filter(user_id=user).first()
    sbi = ShoppingBasketItems.objects.filter(basket_id=shopping_basket.id)
    return render(request, 'basket.html', {'basket': sbi})


@login_required
def add_to_basket(request, prodid):
    user = request.user
    shopping_basket = ShoppingBasket.objects.filter(user_id=user).first()

    if not shopping_basket:
        shopping_basket = ShoppingBasket(user_id=user).save()
        shopping_basket = ShoppingBasket.objects.filter(user_id=user).first()

    product = Product.objects.get(pk=prodid)
    sbi = ShoppingBasketItems.objects.filter(basket_id=shopping_basket.id, product_id=product.id).first()

    if sbi is None:
        sbi = ShoppingBasketItems(basket_id=shopping_basket, product_id=product.id).save()
    else:
        sbi.quantity = sbi.quantity + 1
        sbi.save()

    return render(request, 'single_product.html', {'product': product, 'added': True})


@login_required
def order_form(request):
    user = request.user
    shopping_basket = ShoppingBasket.objects.filter(user_id=user).first()
    if not shopping_basket:
        return redirect(request, '/')
    sbi = ShoppingBasketItems.objects.filter(basket_id=shopping_basket.id)
    if request.method == 'POST':
        form = OrderForm\
            (request.POST)
        if form.is_valid():
            order = form.save(commit=False)
            order.user_id = request.user
            order.save()
            order_items = []
            for basketitem in sbi:
                order_item = OrderItems(order_id=order, product_id=basketitem.product, quantity=basketitem.quantity)
                order_items.append(order_item)
            shopping_basket.delete()
            return render(request, 'ordercomplete.html', {'order': order, 'items': order_items})
    else:
        form = OrderForm()
        return render(request, 'orderform.html', {'form': form, 'basket': shopping_basket, 'items': sbi})
