Essa aplicação faz parte do desafio da Olist

Leia essa documentação em [EN-US](README.md)

## Tecnologias
* Django
* Django Rest framework
* AngularJs
* Docker

## A base do projeto:
* Temos um template principal renderizado pelo Django, após carregado, os resto do front-end é renderizado pelo AngularJS, onde ele começará a enviar requisições para a API, que esta rodando no Django Rest Framework. Por isso as rotas na URL nunca mudam, o angularJs mantém a rota principal e troca apenas os templates, e esse front-end bate nas APIs do back-end em rotas diferentes.


## Dúvidas:
***Por que usar um Framework Front-end?***
* Eu optei por usar um framework front-end porque ele é de grande ajuda na interatividade e em como os dados são mostrados ao usuário, como o principal objetivo do Django Rest Framework é ser um API, eu o tratei assim, deixando as renderizações para o front-end e entregando um fluxo completo.

***Por que AngularJs?***
* Apesar de eu preferir VueJs para front-end, o angularJs permite uma simplicidade por rodar dentro do Django, dessa maneira o angularJs pode ser usado como um mini-framework melhor do que o vueJs.

***Por que Docker em ambiente de desenvolvimento?***
* Docker nos permite trabalhar com o mesmo ambiente e as mesmas versões de libs de maneira estática. Ele também nos dá uma facilidade na escabilidade do projeto, caso esse venha a crescer (mesmo esse não sendo o caso), além da economia de rescursos e divisão de containers com diferentes configurações.

## Rodando na sua máquina local
Você encontra como fazer seu setup em sua máquina Linux local através do texto abaixo (para outro SOs, basta seguir o guia de instalação do docker-compose):

## Instalação do Docker-compose e como rodar-lo:
    $ sudo apt install docker-compose
    $ sudo docker-compose up --build

## Como acessar:
    Acesse 'http://127.0.0.1:7000' em seu navegador.

## Testes unitários dentro do container:
Os testes são feitos automaticamente ao rodar o projeto, mas caso queira rodar novamente, siga as instruções abaixo:
Certifique-se que as etapas anteriores foram feitas e o container está rodando.
$ sudo docker-compose run djserver python manage.py test

## Configurações do container:
### As etapas a seguir não são para rodar na sua máquina local, a menos que você queria rodar local, elas estão aqui apenas para ilustrar as configurações de setup do container. 

## Instalando virtualenvwrapper and criando um virtualenv:
    $ sudo apt-get install python-pip
    $ pip install --upgrade virtualenv
    $ sudo apt-get install python3 python3-pip virtualenvwrapper libmysqlclient-dev libsnappy-dev gcc libssl-dev
    $ source /etc/bash_completion.d/virtualenvwrapper
    $ mkvirtualenv -p /usr/bin/python3 olist

## Como configurar o banco de dados:
    $ sudo apt install mysql-server
    $ sudo mysql -e "CREATE DATABASE olist"
    $ sudo mysql -e "CREATE USER olist IDENTIFIED BY '0l1st'"
    $ sudo mysql -e "GRANT ALL ON olist.* TO 'olist'@'%' IDENTIFIED BY '0l1st'"
    $ sudo mysql -e "GRANT ALL ON test_olist.* TO 'olist'@'%' IDENTIFIED BY '0l1st'"

## Como fazer as configurações básicas do projeto:
    $ workon olist
    $ pip install -r requirements.txt

## Como rodar:
    $ python manage.py runserver

## Como rodar os testes unitários:
    $ python manage.py test