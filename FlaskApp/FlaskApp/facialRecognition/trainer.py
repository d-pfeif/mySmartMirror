import os
import cv2
import numpy as np
import PIL
from PIL import Image

def train():
	recognizer = cv2.face.LBPHFaceRecognizer_create()
	path = "dataSet"

	def getImagesWithName(path):
		imagePaths = [os.path.join(path,f) for f in os.listdir(path)]
		faces = []
		IDs = []
		for imagePath in imagePaths:
			faceImg=Image.open(imagePath).convert('L')
			faceNp=np.array(faceImg,'uint8')
			ID = int(os.path.split(imagePath)[-1].split('.')[1])
			faces.append(faceNp)
			print(ID)
			IDs.append(ID)
			cv2.imshow("training", faceNp)
			cv2.waitKey(10)
		return IDs, faces

	IDs,faces=getImagesWithName(path)
	recognizer.train(faces, np.array(IDs))
	recognizer.save('recognizer/trainingData.yml')
	cv2.destroyAllWindows()
#train()
