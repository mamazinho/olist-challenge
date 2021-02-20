Essa aplicação faz parte do desafio da Olist

Leia essa documentação em [EN-US](README.md)

## Tecnologias
* Django
* Django Rest framework
* AngularJs

## A base do projeto:
* Temos um template principal renderizado pelo Django, após carregado, os resto do front-end é renderizado pelo AngularJS, onde ele começará a enviar requisições para a API, que esta rodando no Django Rest Framework.


## Dúvidas:
***Por que usar um Framework Front-end?***
* Eu optei por usar um framework front-end porque ele é de grande ajuda na interatividade e em como os dados são mostrados ao usuário, como o principal objetivo do Django Rest Framework é ser um API, eu o tratei assim, deixando as renderizações para o front-end e entregando um fluxo completo.

***Por que AngularJs?***
* Apesar de eu preferir VueJs para front-end, o angularJs permite uma simplicidade por rodar dentro do Django, dessa maneira o angularJs pode ser usado como um mini-framework melhor do que o vueJs.

***Por que a relação ManyToMany ocorre no Athlete_infos e não no Atleta?***
* Se a relação fosse feita usando o atleta eu poderia abrir o atleta e ter todos os eventos que ele participou mais facilmente, mas eu não teria a mesma facilidade para pegar as informações dos atletas por evento. Então, é melhor a informação do atleta ter vários eventos e vários eventos com essas informações ao invés do atleta em si. Mas estou aberto para receber sugestões sobre modelagem de dados ou qualquer outro problema.

***Por que Heroku?***
* Heroku foi o melhor custo-benefício encontrado, pois oferece um plano gratuito com 10.000 linhas disponíveis para uso nas tabelas do banco de dados e tem uma integração muito fácil com o github.


## Rodando em uma máquina local
Você pode entrar as instruções para rodar o projeto em sua máquina Linux no texto abaixo:

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
    $ python manage.py migrate
    $ python manage.py populateDB
    or, the fast way to populate:
    $ sudo mysql olist < olist/utils/olist.sql

## Como rodar:
    $ python manage.py runserver

## Como rodar os testes unitários:
    $ python manage.py test

## Como accessar:
    No terminal mostrará algo como 'http://127.0.0.1:[port number]', basta colocar esse endereço no seu navegador e usa-lo.