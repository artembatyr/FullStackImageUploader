from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
# from .views import FileUploadView
from .views import DicomUploadView
# from graphene_django.views import GraphQLView
from .schema import schema  # Import your GraphQL schema
from .views import CustomGraphQLView

urlpatterns = [
    path('upload', DicomUploadView.as_view()),
    path('graphql/', CustomGraphQLView.as_view(graphiql=True, schema=schema))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 