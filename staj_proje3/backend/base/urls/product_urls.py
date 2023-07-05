from django.contrib import admin
from django.urls import path,include
from base.views import product_views as views


urlpatterns = [

    path('test/', views.getRequest, name="routes"),
    path('', views.getProducts, name="products"),# products/ uzantısına gitiiğimizde getProducts fonksiyonuna gidip fonk. çalıştıracak.
    path('<str:pk>', views.getProduct, name="product"), # tek ürünü getirtmek için product ile birlikte istedğimiz ürünün id'sini yolla.
    
]