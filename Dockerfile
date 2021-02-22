FROM python:3.8
LABEL maintainer="Matheus <matheusot2000@gmail.com>"

RUN mkdir /olist
WORKDIR /olist/

COPY . .

RUN pip install -r requirements.txt && pip install gunicorn
