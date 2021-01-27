# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.shortcuts import render

import time


# Create your views here.
def home(request):
    return HttpResponse('Hello, World!')

def datetime(request):
    return HttpResponse(time.strftime("%I:%M:%S"))

def page(request):
    return render(request, 'index.html')