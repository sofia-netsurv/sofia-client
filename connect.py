import sys
from netsurv import DVRIPCam
from time import sleep
import json
from nested_lookup import nested_update, nested_lookup


if len(sys.argv) > 2:
	host_ip = sys.argv[1]
	command = sys.argv[2]
	if len(sys.argv) > 3:
		profile = sys.argv[3]
	if len(sys.argv) > 4:
		setting = sys.argv[4]
		value = sys.argv[5]

	cam = DVRIPCam(host_ip)
	if cam.connect():
		if cam.login():

			if command == "status":
				print(json.dumps({"command" : "status", "success" : True, "response" : "connected" }))
			elif command == "get":
				print(json.dumps({"command" : "camera get", "success" : True, "response" : cam.get_info(profile) }))
			elif command == "set":
				config = cam.get_info(profile)

				nested_update(config, key=setting, value=value)
				response = cam.set_info(profile, config)
				new_config = cam.get_info(profile)
				if nested_lookup(setting, config)[0] == nested_lookup(setting, new_config)[0]:
					print(json.dumps({"command" : "camera set", "success" : True, "response" : response, "value" : value }))
				else:
					print(json.dumps({"command" : "camera set", "success" : False, "message" : "value not set"}))


			else:
				print(json.dumps({"command" : "camera set", "success" : False, "message" : "unknown command"}))


		else:
			print(json.dumps({"command" : "connect", "success" : False}))
		cam.close()
