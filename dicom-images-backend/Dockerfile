FROM python:3.10.11
# Django logs
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
RUN apt-get update && apt-get install -y netcat
COPY . /app

CMD python manage.py runserver 0.0.0.0:8000
#CMD python manage.py runserver 127.0.0.1:8000