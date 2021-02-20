from django.db import models
from django.contrib import admin

class MarketPlace(models.Model):
    id = models.AutoField(
        db_column='mplId',
        primary_key=True,
    )
    market_place_name = models.CharField(
        db_column='mplName', 
        max_length=100,
        default='',
    )
    market_place_description = models.CharField(
        db_column='mplDescription', 
        max_length=255,
        default='',
    )
    site = models.FloatField(
        db_column='mplSite',
        default=0
    )
    contact_email = models.EmailField(
        db_column='mplContactEmail', 
        max_length=100,
        default='',
    )
    phone_number = models.IntegerField(
        db_column='mplPhoneNumber',
        default=0,
    )
    technical_contact = models.CharField(
        db_column='mplTechnicalContact',
        max_length=255,
        default='',
    )

    def __str__(self):
        return f"{self.id} - {self.market_place_name} - {self.site} - {self.technical_contact}"

    class Meta:
        managed = True
        db_table = 'MarketPlace'
        unique_together = (('market_place_name', 'site', 'market_place_description', 'contact_email', 'phone_number', 'technical_contact'),)
        
admin.site.register(MarketPlace)