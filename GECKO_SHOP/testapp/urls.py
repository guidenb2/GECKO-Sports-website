from django.urls import path
from . import views
from .forms import *
from django.contrib.auth.decorators import user_passes_test
from .views import *
from rest_framework import routers
from .models import CaUser

router = routers.DefaultRouter()
router.register(r'users', UserViewSet) # when we go to /api/users - load the users json
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('', views.homepage, name='index'),

    # When testapp/current/ is visited, the project (GECKO_SHOP) will send a request to the app (testapp),
    # and the app will retrieve the result from the execution of the datetime function (views.datetime)
    path('current/', views.datetime, name='datetime'),
    path('about/', views.about, name='about'),
    path('error/', views.error, name='error'),
    path('allproducts/', views.all_products, name="all_products"),
    path('singleproduct/<int:prod_id>', views.singleproduct, name="product_single"),
    path('productform/', views.productform),
    path('usersignup/', views.CaUserSignupView.as_view(), name="register"),
    path('adminsignup/', user_passes_test(lambda u: u.is_active and u.is_admin)(views.AdminSignupView.as_view()), name="Admin register"),
    path('login/', views.Login.as_view(template_name="login.html", authentication_form=UserLoginForm), name='login'),
    path('logout/', views.logout_view, name="logout"),
    path('reviews/', views.customer_reviews, name="reviews"),
    path('orders/', views.all_orders, name="all_orders"),
    path('cart/', views.basket, name="basket"),
    path('addbasket/<int:prodid>', views.add_to_basket, name="add_to_basket"),
    path('basket/', views.order_form),
    path('api/', include(router.urls))
]

