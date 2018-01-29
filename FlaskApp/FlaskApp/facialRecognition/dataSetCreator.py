# import libraries
import time
import os
import cv2
import numpy as np
from picamera import PiCamera
from picamera.array import PiRGBArray
import sqlite3


def createDataSet():

	# import face cascades
	faceDetect = cv2.CascadeClassifier('faces.xml')

	# initialize the camera and grab a reference to the raw camera capture
	cam = PiCamera()
	cam.resolution = (320,240)
	cam.framerate = 32
	rawCapture = PiRGBArray(cam, size=(320,240))

	# allow the camera to warm up
	time.sleep(0.1)


	# insert or update data to database
	def insertOrUpdate(Id, Name):
		db = sqlite3.connect("facedata.db")
		c = db.cursor()
		#print(cursor)
		#cmd = c.execute("SELECT * FROM  people WHERE ID="+str(Id))
		#for row in cmd:
			#if (row[0] == Id):
				#c.execute("UPDATE people SET name=:userName WHERE ID=:userId", {"userName": Name, "userId": Id})
			#else:
		c.execute("INSERT INTO people(name) VALUES(:user)", {"user": Name})
		db.commit()
		db.close()
	# create unique file name for each new face
	n = input("Hello! What's your name? ")

	sampleNum = 0
	path = "dataSet"
	imagePaths = [os.path.join(path,f) for f in os.listdir(path)]
	IDs = []
	id = 1
	for imagePath in imagePaths:
		if os.path.split(imagePath)[-1].split('.')[1]  in IDs:
			print(IDs)
		else:
			IDs.append(os.path.split(imagePath)[-1].split('.')[1])
	for i in IDs:
		if str(id) == i:
			id = id + 1
	print(id)
	print(IDs)
	insertOrUpdate(id, n)
	# capture frames from the camera
	for frame in cam.capture_continuous(rawCapture, format="bgr", use_video_port=True):
		image = frame.array
		#cv2.imshow('Frame', image)
		gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
		faces = faceDetect.detectMultiScale(gray, 1.1, 5)
		for (x,y,w,h) in faces:
			sampleNum = sampleNum + 1
			cv2.imwrite("dataSet/User."+str(id)+"."+str(sampleNum)+".jpg", gray[y:y+h,x:x+w])
			cv2.rectangle(image, (x,y), (x+w,y+h), (255,255,0), 1)
			# cv2.imshow('Frame', image)
		cv2.imshow('Frame', image)
		rawCapture.truncate(0)

		cv2.waitKey(1)
		if(sampleNum>20):
			break;

#createDataSet()
