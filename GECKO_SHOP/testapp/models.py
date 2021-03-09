from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Category(models.Model):
    cat_id = models.AutoField(primary_key=True)
    cat_name = models.CharField(max_length=100)


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category_id = models.IntegerField()


# class Customer(models.Model):
# customer_id = models.AutoField(primary_key=True)
# first_name = models.CharField(max_length=100)
# surname = models.CharField(max_length=100)
# phone_no = models.IntegerField()
# email = models.CharField(max_length=100)
# eircode = models.CharField(max_length=10)


class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    # customer_id = models.IntegerField()
    # date_placed = models.DateField()
    # time_placed = models.TimeField()
    # total_value = models.DecimalField(max_digits=5, decimal_places=2)
    # prod_id = models.IntegerField()

    def price(self):
        return self.product.price * self.quantity


class CaUser(AbstractUser):
    is_admin = models.BooleanField(default=False)


class Reviews(models.Model):
    review_id = models.AutoField(primary_key=True)
    customer_pic = models.CharField(max_length=500)
    customer_name = models.CharField(max_length=40, default=True)
    role = models.CharField(max_length=40);
    review = models.CharField(max_length=500)
