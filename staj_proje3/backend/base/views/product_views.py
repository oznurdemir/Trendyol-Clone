import cProfile
from calendar import c
from itertools import product
from math import prod
from django.shortcuts import render
from rest_framework.response import Response # restframework ile geldi
from rest_framework.decorators import api_view
from base.models import Product
from base.serializer import ProductSerializer # GET,POST gibi komutlarda ne için çalıştıracağımızı belli etmemiz için dahil ettik.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data["username"] = self.user.username
        data["email"] = self.user.email



        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.

@api_view(['GET'])
def getRequest(request):
    routes = [
        "api/product",
        "api/product/create",
        "api/product/<int:id>"
    ]
    return Response(routes)

@api_view(['GET'])
def getProducts(request): # bu fonk. products değişkenini döndürüyoruz.
    products = Product.objects.all()
    serializers = ProductSerializer(products,many=True) # Birden fazla gösterilecek kayıt olduğunda true yapıyoruz
    return Response(serializers.data)

@api_view(['GET'])
def getProduct(request,pk): # bir id değeri alıyoruz.
    print("********************",pk)
    product = Product.objects.get(_id=pk)
    serializers = ProductSerializer(product,many=False)
    return Response(serializers.data)
