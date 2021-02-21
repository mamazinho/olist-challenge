from django.db import models
from django.contrib import admin

class Seller(models.Model):
    id = models.AutoField(
        db_column='selId',
        primary_key=True,
    )
    nick_name = models.CharField(
        db_column='selNick', 
        max_length=64,
        default='',
    )
    corporate_name = models.CharField(
        db_column='selCorporateName', 
        max_length=255,
        default='',
    )
    seller_cnpj = models.IntegerField(
        db_column='selCNPJ',
        default=0,
    )
    contact_email = models.EmailField(
        db_column='selContactEmail', 
        max_length=100,
        default='',
    )
    phone_number = models.BigIntegerField(
        db_column='selPhoneNumber',
    )
    address = models.CharField(
        db_column='selAddress', 
        max_length=255,
        default='',
    )

    def __str__(self):
        return f"{self.id} - {self.nick_name} - {self.contact_email} - {self.seller_cnpj}"

    class Meta:
        managed = True
        db_table = 'Seller'
        unique_together = (('nick_name', 'corporate_name', 'contact_email', 'address', 'seller_cnpj', 'phone_number'),)
        
admin.site.register(Seller)