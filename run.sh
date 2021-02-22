#!/bin/bash

workers=2

source /usr/share/virtualenvwrapper/virtualenvwrapper.sh
workon olist
dr=`dirname $0`

${dr}/manage.py makemigrations
${dr}/manage.py migrate
${dr}/manage.py test
${dr}/manage.py runserver 0.0.0.0:7000