import { onvif } from "onvif";
import { http } from "http";
import Cam from "onvif";

export function probeOnvif() {
  console.log("probing onvif");
  const PORT_TO_LISTEN = 3030;

  onvif.Discovery.on("device", function(cam, rinfo, xml) {
    // function will be called as soon as NVT responses
    console.log("Reply from " + rinfo.address);
    console.log(cam.hostname + ":" + cam.port + cam.path);
    cam.username = "admin";
    cam.password = "tlJwpbo6";

    const CAMERA_HOST = cam.hostname,
      USERNAME = cam.username,
      PASSWORD = cam.password,
      PORT = cam.port;

    const test_cam = new Cam(
      {
        hostname: CAMERA_HOST,
        username: USERNAME,
        password: PASSWORD,
        port: PORT
      },
      function(err) {
        if (err) {
          console.log(
            "Connection Failed for " +
              CAMERA_HOST +
              " Port: " +
              PORT +
              " Username: " +
              USERNAME +
              " Password: " +
              PASSWORD
          );
          return;
        }
        console.log("CONNECTED");
        this.absoluteMove({
          x: 1,
          y: 1,
          zoom: 1
        });
        this.getStreamUri({ protocol: "RTSP" }, function(err, stream) {
          console.log(stream.uri);
        });
        console.log(this.profiles);
      }
    );
  });
  onvif.Discovery.probe();

  return true;
}
