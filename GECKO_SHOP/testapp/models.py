from django.db import models

# Create your models here.
class Category(models.Model):
    cat_id = models.AutoField(primary_key=True)
    cat_name = models.CharField(max_length=100)


class Product(models.Model):
    prod_id = models.AutoField(primary_key=True)
    prod_name = models.CharField(max_length=100)
    prod_desc = models.CharField(max_length=200)
    prod_pic = models.CharField(max_length=150)
    unit_price = models.DecimalField(max_digits=6, decimal_places=2)
    cat_id = models.IntegerField()


class Stock(models.Model):
    prod_id = models.IntegerField(primary_key=True)
    description = models.CharField(max_length=5000)
    manufacturer = models.CharField(max_length=200)
    stock_level = models.IntegerField()
    next_shipment = models.DateField()

class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    phone_no = models.IntegerField()
    email = models.CharField(max_length=100)
    eircode = models.CharField(max_length=10)


class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    customer_id = models.IntegerField()
    date_placed = models.DateField()
    time_placed = models.TimeField()
    total_value = models.DecimalField(max_digits=5, decimal_places=2)
    prod_id = models.IntegerField()


class Reviews(models.Model):
    review_id = models.AutoField(primary_key=True)
    review = models.CharField(max_length=500)
