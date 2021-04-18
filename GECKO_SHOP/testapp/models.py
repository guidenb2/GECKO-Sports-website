from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class ProductCategory(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)
    picture = models.FileField(upload_to='product_img/', blank=True)


class CaUser(AbstractUser):
    is_admin = models.BooleanField(default=False)


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(CaUser, on_delete=models.CASCADE)
    date_created = models.DateField(auto_now_add=True)
    shipping_addr = models.CharField(max_length=500)


class OrderItems(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)


class ShoppingBasket(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.OneToOneField(CaUser, on_delete=models.CASCADE)


class ShoppingBasketItems(models.Model):
    id = models.AutoField(primary_key=True)
    basket_id = models.ForeignKey(ShoppingBasket, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def price(self):
        return self.product.price * self.quantity

class Reviews(models.Model):
    review_id = models.AutoField(primary_key=True)
    customer_pic = models.CharField(max_length=500)
    customer_name = models.CharField(max_length=40, default=True)
    role = models.CharField(max_length=40)
    review = models.CharField(max_length=500)

