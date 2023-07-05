
import email
from email import message
from rest_framework.response import Response # restframework ile geldi
from rest_framework.decorators import api_view
from base.models import User
from base.serializer import UserSerialzer,UserSerializerWithToken # GET,POST gibi komutlarda ne için çalıştıracağımızı belli etmemiz için dahil ettik.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.decorators import permission_classes
from django.contrib.auth.hashers import make_password
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # user login
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v



        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


#user profile
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def getUserProfile(request): # Giriş yapan kullanıcının bilgileri get ediyor
    user = request.user
    serializer = UserSerialzer(user, many=False)
    return Response(serializer.data)

#tüm userları getirme
@api_view(['GET'])
@permission_classes([IsAdminUser])# sadece admin kullanıcısı giriş yaptığında 
def getUsers(request): # tüm kullanıcıların bilgilerini get ediyor
    users = User.objects.all()
    serializers = UserSerialzer(users,many=True) # Birden fazla gösterilecek kayıt olduğunda true yapıyoruz
    return Response(serializers.data)

# user register
@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password']),
        )
        serializer = UserSerializerWithToken(user, many = False)
        return Response(serializer.data)

    except:
        message = {'detail' : 'Username veya email kullanılıyor.'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)



