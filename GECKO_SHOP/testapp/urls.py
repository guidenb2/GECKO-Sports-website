from django.urls import path
from . import views
from .forms import *

urlpatterns = [
    path('', views.homepage, name='index'),

    # When testapp/current/ is visited, the project (GECKO_SHOP) will send a request to the app (testapp),
    # and the app will retrieve the result from the execution of the datetime function (views.datetime)
    path('current/', views.datetime, name='datetime'),
    path('about/', views.about, name='about'),
    path('error/', views.error, name='error'),
    path('allproducts/', views.all_products, name="all_products"),
    path('reviews/', views.customer_reviews, name="reviews"),
    path('singleproduct/<int:prod_id>', views.singleproduct, name="product_single"),
    path('productform/', views.productform),
    path('usersignup/', views.CaUserSignupView.as_view(), name="register"),
    path('adminsignup/', views.AdminSignupView.as_view(), name="Admin register"),
    path('login/', views.Login.as_view(template_name="login.html", authentication_form=UserLoginForm), name='login'),
    path('logout/', views.logout_view, name="logout"),
    path('reviews/', views.customer_reviews, name="reviews"),
    path('orders/', views.all_orders, name="all_orders")
]
