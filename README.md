# MyViewport
#### a smart mirror designed for you

[Youtube Demo](https://www.youtube.com/watch?v=-42N0AdAzV8)

## Instructions

To run this locally I'll assume you have a Raspberry Pi 3 Model B with Raspbian Stretch already downloaded. 

Install apache2 with the command:
- sudo apt-get install apache2 apache2-doc apache2-utils

This app makes use of Flask so you'll have to install Flask. If you're using python3+ use:
- sudo pip3 install flask
Otherwise
- sudo pip install flask

git clone this repository into /var/www/

You'll need to make a wsgi file for Flask and Apache to talk to eachother. Use the following command to get to apache2's folder:
- cd /etc/apache2

and traverse into the sites-available folder
- cd sites-available

In this folder you'll have to create a {{your project name}}.conf file that communicates with apache2.
Paste the following code into it:

 WSGIDaemonProcess sysinfo user=pi group=www-data threads=5
 WSGIScriptAlias /sysinfo /home/pi/www/sysinfo/sysinfo.wsgi
 <Directory "/home/pi/www/sysinfo">
 	WSGIProcessGroup sysinfo
 	WSGIScriptReloading On
 	WSGIApplicationGroup %{GLOBAL}
 	Require all granted
 </Directory>
 ErrorLog /home/pi/www/sysinfo/logs/error.log

Now open Chromium and in the URL put: http://localhost:4200

If you see the webpage the HURRAY!! Continue on. Otherwise message me and I'll troubleshoot with you.

If you want to rotate your screen enter the following code:

-sudo nano /boot/config.txt

and at the bottom of the document add the following line

- display_rotate=1
- I had to put 3 in order to get the proper distance for my cable setup on the back of the screen.

Next modify the autostart file on raspberry pi to run this on start up:

- sudo nano ~/.config/lxsession/LXDE-pi/autostart

and modify to the following script:

-@pcmanfm –desctop –profile LXDE-pi 
-#@xscreensaver –no-splash 
-@xset s off 
-@xset -dpms 
-@xset s noblank 
-@chromium-browser --kiosk --incognito http://localhost:4200

Finally run reboot in the terminal and watch the magic happen!
FIRST MAKE SURE YOU CAN OPEN UP ANOTHER TERMINAL WITH Alt+Ctl+T!!

## Alexa Optional

To install Alexa onto your Pi follow [this github repo](https://github.com/alexa/alexa-avs-sample-app/wiki/Raspberry-Pi)

After installation and everything works accordingly, you will need to create a shell script to run on start up. Navigate to your home directory:
- cd ~
and create a new file
- touch alexa_startup.sh

paste the following code into the new file.


Then modify the Raspberry Pi autostart file to the following:
