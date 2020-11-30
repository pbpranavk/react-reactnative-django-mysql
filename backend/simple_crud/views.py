from django.shortcuts import render
from rest_framework import viewsets
from simple_crud.serializers import SimpleSerializer
from simple_crud.models import SimpleModel

# Create your views here.


class SimpleViewSet(viewsets.ModelViewSet):
    queryset = SimpleModel.objects.all()
    serializer_class = SimpleSerializer
