#!/home/pi/.virtualenvs/cv/:/home/pi/opencv_contrib-3.4.0/

#!/usr/bin/env python3
import os
import sys
from flask import Flask
from flask import render_template
from flask import redirect
import subprocess

app = Flask(__name__)

sys.path.append('/var/www/FlaskApp/FlaskApp/')
python_bin = '/home/pi/.virtualenvs/cv'
script_file = '/var/www/FlaskApp/FlaskApp/detector.py'
#from detector import detectUser
#try:
	#getUser=os.system('/home/pi/.virtualenvs/cv/bin/python3 /var/www/FlaskApp/FlaskApp/detector.py')
#except getUser == Number:
getUser = ''
@app.route('/')
def index():
	#getUser=exec('/var/www/FlaskApp/FlaskApp/detector.py')
	return redirect('/test/user')

@app.route('/user')
def user():
	return render_template('index.html', userName=getUser)

if __name__ ==  "__main__":
	#getUser = detector.detectUser
	app.run(host='0.0.0.0', port=80, debug=False)
