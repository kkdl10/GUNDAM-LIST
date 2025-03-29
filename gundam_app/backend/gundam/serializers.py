from rest_framework import serializers
from .models import GundamChecklist

class GundamChecklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = GundamChecklist
        fields = '__all__'
