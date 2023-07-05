from dataclasses import field, fields
from lib2to3.pgen2 import token
from pyexpat import model
from weakref import ReferenceType
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product
from rest_framework_simplejwt.tokens import RefreshToken

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class UserSerialzer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only = True) # name, _id, IsAdmin sadece okunabilir olsun.
    _id = serializers.SerializerMethodField(read_only = True)
    isAdmin  = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = User
        fields = ['id','_id','username','email','name','isAdmin'] # bu değerleri okusun
        
    def get__id(self,obj): # id yi göster
        return obj.id

    def get_isAdmin(self,obj): #admin olup olmadığını göster
        return obj.is_staff

    def get_name(self,obj): #adını göster
        name = obj.first_name
        if name == '':
            name = obj.email
        return name



class UserSerializerWithToken(UserSerialzer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
