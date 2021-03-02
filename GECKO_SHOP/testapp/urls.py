from django.urls import path
from . import views


urlpatterns = [
    path('', views.homepage, name='index'),

    # When testapp/current/ is visited, the project (GECKO_SHOP) will send a request to the app (testapp),
    # and the app will retrieve the result from the execution of the datetime function (views.datetime)
    path('current/', views.datetime, name='datetime'),
    path('about/', views.about, name='about'),
    path('error/', views.error, name='error'),
    path('allproducts/', views.all_products, name="all_products"),
    path('singleproduct/<int:prod_id>', views.singleproduct, name="product_single"),
    path('myform/', views.myform)
]