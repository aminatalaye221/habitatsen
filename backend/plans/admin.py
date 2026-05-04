from django.contrib import admin
from .models import Plan, PlanSubmission, CustomPlanRequest

@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'surface')
    search_fields = ('title', 'description')

@admin.register(PlanSubmission)
class PlanSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'status', 'created_at')
    list_filter = ('status',)


@admin.register(CustomPlanRequest)
class CustomPlanRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'style', 'budget', 'created_at')
    search_fields = ('name', 'terrain_size', 'comment')
