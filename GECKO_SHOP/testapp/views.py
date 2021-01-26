# -*- coding: utf-8 -*-
from django.http import HttpResponse
import time


# Create your views here.
def home(request):
    return HttpResponse('Hello, World!')

def datetime(request):
    return HttpResponse(time.strftime("%I:%M:%S"))