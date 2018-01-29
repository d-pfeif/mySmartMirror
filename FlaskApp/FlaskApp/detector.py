#!/home/pi/.virtualenvs/cv/
#import os
#print(os.environ['VIRTUAL_ENV'])
# import libraries
import time
import cv2
import numpy as np
from picamera import PiCamera
from picamera.array import PiRGBArray
import sqlite3
from collections import Counter

# import face cascades
faceDetect = cv2.CascadeClassifier('faces.xml')

# initialize the camera and grab a reference to the raw camera capture
#cam = PiCamera()
#cam.resolution = (320,240)
#cam.framerate = 32
#rawCapture = PiRGBArray(cam, size=(320,240))

def Most_Common(lst):
	data = Counter(lst)
	return data.most_common(1)[0][0]

def most_common(lst):
	data = Counter(lst)
	return max(lst, key=data.get)

def getUserInfo(id):
	db = sqlite3.connect('facedata.db')
	c = db.cursor()
	cmd = c.execute('SELECT * FROM People WHERE ID='+str(id))
	#print(cmd)
	profile = None;
	for row in cmd:
		profile=row
		#print(profile)
	db.close()
	return profile


def detectUser():
	# initialize the camera and grab a reference to the raw camera capture
	cam = PiCamera()
	cam.resolution = (320,240)
	cam.framerate = 32
	rawCapture = PiRGBArray(cam)


	# allow the camera to warm up
	time.sleep(2)

	# create face recognizer
	rec = cv2.face.LBPHFaceRecognizer_create()
	rec.read('./recognizer/trainingData.yml')
	id = 0

	# declare font for user detection
	font = cv2.FONT_HERSHEY_COMPLEX_SMALL

	nameArr = []

	# capture frames from the camera
	for frame in cam.capture_continuous(rawCapture, format="bgr", use_video_port=True):
		image = frame.array
		# cv2.imshow('Frame', image)
		gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
		faces = faceDetect.detectMultiScale(gray, 1.1, 5)
		for (x,y,w,h) in faces:
			cv2.rectangle(image, (x,y), (x+w,y+h), (255,255,0), 1)
			id,conf=rec.predict(gray[y:y+h,x:x+w])
			profile=getUserInfo(id)
			while len(nameArr) < 21:
				nameArr.append(profile[1])
				if len(nameArr) == 20:
					print(Most_Common(nameArr))
					return Most_Common(nameArr)
					StopIteration;
					break;
			#print(nameArr)
			if (profile!=None):
				cv2.putText(image, str(profile[0]), (x,y+h+15), font, 0.5, (255,255,255))
				cv2.putText(image, str(profile[1]), (x,y+h+30), font, 0.5, (255,255,255))
				#print(Most_Common(nameArr))
				#return Most_Common(nameArr)
				break;
		#cv2.imshow('Frame', image)
		#print("Hello "+str(id)+"!")

		rawCapture.truncate(0)


		key = cv2.waitKey(1)
		if key == ord('u'):
			ans = input("Are you a new user? (Y/N) ")
			if ans == "Y":
				print("Sorry, that function isn't working yet.")
				# dataSetCreator.createDataSet(cam, rawCapture, frame)
			#else:

				#detectUser()
		elif key == ord('q'):
			break;
detectUser()
#getUserInfo(1)
