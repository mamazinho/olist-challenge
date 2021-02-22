This application makes part of Olist challenge

Read this Doc in [PT-BR](README.pt.md)

## Technologies
* Django
* Django Rest framework
* AngularJs
* Docker

## How the project was been build:
* We have a mainly template that will be rendered by django, after load this template, the rest of front-end is render by AngularJS,
where it will start to make requests to the API, which is running with django rest. That's why the URL routes never change, because the angularJs stay in the same route only change the templates, and this front-end hits in different routers in back-end.

## Questions:
***Why use a front-end framework?***
* I chose to use a front-end framework (AngularJs) because it will help so much in interactivity and how the data will be
displayed to user, how the main objective of Django Rest Framework is to be an API (webServices), I treat it like this, leaving the renders
with the front-end and delivering a complete flow.

***Why AngularJs?***
* I prefer VueJs to front-end, but angularJs allows a simplicity, because it runs inside Django and not out, as vueJs. The angularJs can be used
as mini-framework better than vue.

***Why Docker in development enviroment?***
* Docker allows us to work with the same enviroment and same versions of libs. it also allows for ease of scalability, should the project grow (even if this is not the case), in addition to saving resources and dividing containers with different configurations.

## Run in local machine
You can find how make your setup and run the project in your Linux machine in the text below (to another OSs, it's just follow the docker-compose instalation guide):

## Install Docker-compose and how to run it:
    $ sudo apt install docker-compose
    $ sudo docker-compose up --build
    
## How to access:
    Access 'http://127.0.0.1:7000' in your browser.

## Unit tests inside a container:
The unit tests running automatically when the project starts, but if you can run after this, follow the instructions below:
Make sure that the previous steps were done and the container is running.
$ sudo docker-compose run djserver python manage.py test
    

## Container configuration:

### The following steps are not to make in your machine, at least if you want to run out of container, but it's not reccomended, I only show this because it's the container setup:

## Install virtualenvwrapper and create a virtualenv:
    $ sudo apt install python-pip
    $ pip install --upgrade virtualenv
    $ sudo apt install python3 python3-pip virtualenvwrapper libmysqlclient-dev libsnappy-dev gcc libssl-dev
    $ source /etc/bash_completion.d/virtualenvwrapper
    $ mkvirtualenv -p /usr/bin/python3 olist

## How to create DB:
    $ sudo apt install mysql-server
    $ sudo mysql -e "CREATE DATABASE olist"
    $ sudo mysql -e "CREATE USER olist IDENTIFIED BY '0l1st'"
    $ sudo mysql -e "GRANT ALL ON olist.* TO 'olist'@'%' IDENTIFIED BY '0l1st'"
    $ sudo mysql -e "GRANT ALL ON test_olist.* TO 'olist'@'%' IDENTIFIED BY '0l1st'"

## How to Setup:
    $ workon olist
    $ pip install -r requirements.txt

## How to Run:
    $ python manage.py runserver

## How to Run Unit Tests:
    $ python manage.py test