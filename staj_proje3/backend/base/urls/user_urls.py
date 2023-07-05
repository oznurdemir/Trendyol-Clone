from django.contrib import admin
from django.urls import path,include
from base.views import user_views as views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.getUserProfile, name='user-profile'), # view'de yazdığımız fonk burada tanımladık
    path('', views.getUsers, name='users'), # view'de yazdığımız fonk burada tanımladık
    path('register/', views.registerUser, name='register'),
]