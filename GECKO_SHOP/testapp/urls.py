from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),

    # When testapp/current/ is visited, the project (GECKO_SHOP) will send a request to the app (testapp),
    # and the app will retrieve the result from the execution of the datetime function (views.datetime)
    path('current/', views.datetime, name='datetime'),

    path('home/', views.homepage, name='homepage'),

    path('about/', views.about, name='about'),
]