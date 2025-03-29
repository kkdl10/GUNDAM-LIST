from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import GundamChecklist
from .serializers import GundamChecklistSerializer

class UserChecklistView(generics.ListCreateAPIView):
    serializer_class = GundamChecklistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return GundamChecklist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
