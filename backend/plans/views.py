from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Plan, PlanSubmission, CustomPlanRequest
from .serializers import PlanSerializer, PlanSubmissionSerializer, CustomPlanRequestSerializer


class PlanListView(generics.ListAPIView):
    queryset = Plan.objects.filter(is_active=True)
    serializer_class = PlanSerializer


class PlanSubmissionView(generics.CreateAPIView):
    queryset = PlanSubmission.objects.all()
    serializer_class = PlanSubmissionSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({
            'message': 'Votre soumission a été reçue. Notre équipe va la valider.',
            'data': response.data,
        }, status=status.HTTP_201_CREATED)


class ContactView(APIView):
    def post(self, request, *args, **kwargs):
        name = request.data.get('name', '')
        phone = request.data.get('phone', '')
        message = request.data.get('message', '')
        return Response({
            'message': 'Message prêt pour WhatsApp',
            'whatsapp_text': f"Bonjour, je suis {name}. {message} Contact : {phone}",
        }, status=status.HTTP_200_OK)


class ApiRoot(APIView):
    def get(self, request, *args, **kwargs):
        return Response({
            'plans': request.build_absolute_uri('plans/'),
            'submission': request.build_absolute_uri('submission/'),
            'contact': request.build_absolute_uri('contact/'),
            'custom_plan': request.build_absolute_uri('custom-plan/'),
        })


class CustomPlanRequestView(generics.CreateAPIView):
    queryset = CustomPlanRequest.objects.all()
    serializer_class = CustomPlanRequestSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        data = response.data
        whatsapp_text = (
            f"Bonjour, je souhaite un plan {data.get('style')} sur un terrain de {data.get('terrain_size')} "
            f"avec {data.get('rooms')} chambres, budget {data.get('budget')}. {data.get('comment')} "
            f"Mon contact : {data.get('phone')}"
        ).strip()
        return Response({
            'message': 'Demande de personnalisation reçue.',
            'data': data,
            'whatsapp_text': whatsapp_text,
        }, status=status.HTTP_201_CREATED)
