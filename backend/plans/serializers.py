from rest_framework import serializers
from .models import Plan, PlanSubmission, CustomPlanRequest


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ['id', 'title', 'description', 'category', 'surface', 'rooms', 'price', 'image_url', 'is_active']


class PlanSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanSubmission
        fields = ['id', 'name', 'email', 'description', 'file_url', 'status', 'created_at']
        read_only_fields = ['status', 'created_at']


class CustomPlanRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomPlanRequest
        fields = ['id', 'name', 'phone', 'terrain_size', 'rooms', 'style', 'budget', 'comment', 'created_at']
        read_only_fields = ['created_at']
