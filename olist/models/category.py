from django.db import models
from django.contrib import admin
from cnpj_field.models import CNPJField

class Category(models.Model):
    id = models.AutoField(
        db_column='catId',
        primary_key=True,
    )
    category_name = models.CharField(
        db_column='proName', 
        max_length=100,
        default='',
    )
    category_description = models.CharField(
        db_column='proDescription', 
        max_length=255,
        default='',
    )

    def __str__(self):
        return f"{self.id} - {self.category_name} - {self.category_description}"

    class Meta:
        managed = True
        db_table = 'Category'
        unique_together = (('category_name', 'category_description'),)
        
admin.site.register(Category)