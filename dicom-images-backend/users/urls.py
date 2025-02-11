from django.contrib import admin
from django.urls import path
from .views import users, register, login, logout, AutheticatedUser

urlpatterns = [
    path('users', users),
    path('register', register),
    path('login', login),
    path('logout', logout),
    path('user', AutheticatedUser.as_view())
]