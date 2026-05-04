from django.urls import path
from . import views

urlpatterns = [
    path('', views.ApiRoot.as_view(), name='api-root'),
    path('plans/', views.PlanListView.as_view(), name='plan-list'),
    path('submission/', views.PlanSubmissionView.as_view(), name='plan-submission'),
    path('contact/', views.ContactView.as_view(), name='contact'),
    path('custom-plan/', views.CustomPlanRequestView.as_view(), name='custom-plan'),
]
