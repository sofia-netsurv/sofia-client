import sys
from netsurv import DVRIPCam
from time import sleep
import json

if len(sys.argv) > 1:
	if str(sys.argv[1] == 'interactive'):
		host_ip = input()
	else:
		host_ip = str(sys.argv[1])
else:
	host_ip = '192.168.1.139'


send_str = '{"Ret": 100, "Camera": {"FishLensParam": [{"Version": 0, "CenterOffsetY": 0, "ImageWidth": 1280, "LensType": 0, "ViewMode": 0, "Radius": 0, "Zoom": 100, "ImageHeight": 720, "CenterOffsetX": 0, "ViewAngle": 0}], "Param": [{"DayNightColor": "0x1", "IrcutSwap": 0, "ApertureMode": "0x0", "PictureMirror": "0x0", "AeSensitivity": 5, "PictureFlip": "0x0", "ExposureParam": {"Level": 0, "MostTime": "0x10000", "LeastTime": "0x100"}, "GainParam": {"AutoGain": 1, "Gain": 50}, "Day_nfLevel": 3, "EsShutter": "0x02", "IRCUTMode": 0, "WhiteBalance": "0x0", "RejectFlicker": 0, "Night_nfLevel": 3, "BLCMode": "0x0", "ElecLevel": 50, "DncThr": 30}], "DistortionCorrect": {"Version": 0, "Lenstype": 1}, "ParamEx": [{"ExposureTime": "0x100", "BroadTrends": {"AutoGain": 0, "Gain": 50}, "Style": "type1", "CorridorMode": 0, "LightRestrainLevel": 16}], "ClearFog": [{"enable": 0, "level": 50}]}, "SessionID": "0x00000000", "Name": "Camera"}'
cam = DVRIPCam(host_ip)
if cam.connect():
	if cam.login():
		print(json.dumps({"command" : "connect", "success" : True }));

		while True:
			command = input()

			if command == "status":
				print(json.dumps({"command" : "status", "success" : True, "response" : "connected" }));
			elif command == "camera get":
				print(json.dumps({"command" : "camera get", "success" : True, "response" : cam.get_info("Camera") }));
			elif command == "camera set":
				print("whas up")
				payload_str = input()
				
				print(json.dumps({"command" : "camera set", "success" : True, "response" : cam.set_info("Camera", payload_str) }));



	else:
		print(json.dumps({"command" : "connect", "success" : False}));
	cam.close()
