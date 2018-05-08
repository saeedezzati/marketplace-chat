from django.contrib.auth.models import Permission
from django.shortcuts import get_object_or_404

from app.serializers import MessageSerializer
from app.models import Message

from rest_framework import permissions, viewsets, generics, renderers, status
from rest_framework.response import Response
from rest_framework.decorators import action

class MessageViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.AllowAny] 
    @action(methods=['get'], detail=False, permission_classes=[permissions.AllowAny], url_path='get-messages')
    def get_messages(self, request):   
        data = request.query_params
        item=data['item']
        # messages = get_object_or_404(Message, item=item).order_by('date')
        try:
            messages = Message.objects.filter(item=item).order_by('date')
        except Message.DoesNotExist:
            messages = None
        if messages:
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data)
        return Response({'messages':[]}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=False, permission_classes=[permissions.AllowAny], url_path='post-message')
    def post_message(self, request):   
        data = request.data
        # sender = data['sender']
        # item=data['item']
        # message=data['message']
        serializer = MessageSerializer(data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)