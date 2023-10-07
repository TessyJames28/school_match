from .models import Favorite 
from rest_framework import serializers
from django.contrib.auth.models import User 

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'confirm_password']

    def create(self, validated_data):
        # extra and remove the 'password' field from the validated data
        password = validated_data.pop('password')
        confirm_password = validated_data.pop('confirm_password', None)
        
        if 'password' in validated_data and confirm_password != validated_data['password']:
            raise serializers.ValidationError("Password do not match")
        
        # create the user with the remaining validated data
        user = User.objects.create_user(**validated_data)
        
        # set user's password separately
        user.set_password(password)
        user.save()
        
        return user
    

class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'confirm_password']
        
    def update(self, instance, validated_data):
        # check if the 'password' field is included
        password = validated_data.get('password')
        if password:
            instance.set_password(password)
            instance.save()
            
        # Remove 'password' and 'confirm_password' fields from validated data
        validated_data.pop('password')
        validated_data.pop('confirm_password')
        
        #update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        return instance
    

class FavoriteSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Favorite
        fields = ['id', 'user', 'department']
        depth = 2


class FavoritePostSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Favorite
        fields = ['id', 'user', 'department']

        # read_only_fields = ['user', 'department']
        
        # def create(self, validated_data):
        #     validated_data.pop('user', None)
        #     validated_data.pop('department', None)
        #     return super().create(validated_data)
        
        # def update(self, instance, validated_data):
        #     validated_data.pop('user', None)
        #     validated_data.pop('department', None)
        #     return super().update(instance, validated_data)
