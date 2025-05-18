from django.urls import re_path
from rtsp_server.views import StreamConsumer

websocket_urlpatterns = [
    re_path(r'ws/stream/$', StreamConsumer.as_asgi()),
]