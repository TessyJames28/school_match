from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import status, generics, viewsets
from rest_framework.response import Response 
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import UserSerializer, FavoriteSerializer, FavoritePostSerializer, UserUpdateSerializer
from .models import Favorite
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import obtain_auth_token
from django.db.models import Q 

# Create your views here.
@api_view(['POST'])
def user_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        password = serializer.validated_data.get('password')
        confirm_password = serializer.validated_data.get('confirm_password')
        if password != confirm_password:
            return Response({'error': 'Password mismatch'}) 
        else:
            user = serializer.save()
            user.set_password(request.data['password'])
            user.save()
            return Response({'success': True, 'message': 'Registration successful', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 


@api_view()
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['POST'])
def login(request):
    response = obtain_auth_token(request._request)
    if response.status_code == 200:
        token = response.data.get('token')
        return Response({"token": token, "redirect_url": '/api/user/profile'})
    else:
        return redirect('login')    
    
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    #get user associated with the request
    user = request.user
    
    # delete associated token
    Token.objects.filter(user=user).delete()
    
    return Response({"detail": "Logout successfully"}, 200)
    

class UserUpdate(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    # Returns authenticated user for update
    def get_object(self):
        return self.request.user
    
    
class FavoriteView(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return FavoriteSerializer
        else:
            return FavoritePostSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        return Favorite.objects.filter(user_id=user_id)
    
    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, id=self.kwargs['user_id'])
        self.check_object_permissions(self.request, obj)
        return obj
    

class FavoriteSearch(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    search_fields = ['department__school__name', 'department__program__name', 'department__course__name']


    
class RetrieveDeleteFavorite(generics.RetrieveDestroyAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        user_id = self.kwargs['user_id']
        fav_id = self.kwargs['id']
        user = get_object_or_404(User, id=user_id)
        return get_object_or_404(Favorite, user=user, id=fav_id)
