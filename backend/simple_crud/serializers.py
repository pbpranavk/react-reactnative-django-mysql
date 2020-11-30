from rest_framework import serializers
from simple_crud.models import SimpleModel


class SimpleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SimpleModel
        fields = ["text"]
