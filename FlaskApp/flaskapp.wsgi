#!/usr/bin/python3.5
# /var/www/FlaskApp/FlaskApp
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, "/var/www/FlaskApp")

from FlaskApp import app as application
application.secret_key = "Kingdom Hearts"
