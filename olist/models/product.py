from django.db import models
from django.contrib import admin

class Product(models.Model):
    id = models.AutoField(
        db_column='proId',
        primary_key=True,
    )
    product_name = models.CharField(
        db_column='proName', 
        max_length=100,
        default='',
    )
    product_description = models.CharField(
        db_column='proDescription', 
        max_length=255,
        default='',
    )
    product_value = models.FloatField(
        db_column='proValue',
        default=0
    )
    categories = models.ManyToManyField(
        'Category',
        db_column='proCategories',
        related_name='products',
    )

    def __str__(self):
        return f"{self.id} - {self.product_name} - {self.product_description} - {self.product_value} - {self.categories}"

    class Meta:
        managed = True
        db_table = 'Product'
        unique_together = (('product_name', 'product_value', 'product_description'),)
        
admin.site.register(Product)