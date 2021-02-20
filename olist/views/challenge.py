from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.views import APIView
from rest_framework.response import Response

class Challenge(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name='base.html'

    def get(self, request, *args, **kwargs):
        return Response({'request': request})