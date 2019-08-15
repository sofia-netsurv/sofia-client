import onvif from "onvif";
import { http } from "http";
import { Cam } from "onvif";
import  flow  from "nimble";


const probeRange = (parentThis, options) => {


var IP_RANGE_START = options.IP_RANGE_START;
var IP_RANGE_END = options.IP_RANGE_END;
var PORT_LIST = options.PORT_LIST;
var USERNAME = options.USERNAME;
var PASSWORD = options.PASSWORD;

var ip_list = generate_range(IP_RANGE_START, IP_RANGE_END);
var port_list = PORT_LIST;

// hide error messages
console.error = function() {};

// try each IP address and each Port
ip_list.forEach(function(ip_entry) {
    port_list.forEach(function(port_entry) {

        //console.log(ip_entry + ' ' + port_entry);

        new Cam({
            hostname: ip_entry,
            username: USERNAME,
            password: PASSWORD,
            port: port_entry,
timeout : 5000
        }, function CamFunc(err) {
            if (err) return;

            var cam_obj = this;

            var got_date;
            var got_info;
            var got_live_stream_tcp;
            var got_live_stream_udp;
            var got_live_stream_multicast;
            var got_recordings;
            var got_replay_stream;

            // Use Nimble to execute each ONVIF function in turn
            // This is used so we can wait on all ONVIF replies before
            // writing to the console
            flow.series([
                function(callback) {
                    cam_obj.getSystemDateAndTime(function(err, date, xml) {
                        if (!err) got_date = date;
                        callback();
                    });
                },
                function(callback) {
                    cam_obj.getDeviceInformation(function(err, info, xml) {
                        if (!err) got_info = info;
                        callback();
                    });
                },
                function(callback) {
                try {
                    cam_obj.getStreamUri({
                        protocol: 'RTSP',
                        stream: 'RTP-Unicast'
                    }, function(err, stream, xml) {
                        if (!err) got_live_stream_tcp = stream;
                        callback();
                    });
                } catch(err) {callback();}
                },
                function(callback) {
                try {
                    cam_obj.getStreamUri({
                        protocol: 'UDP',
                        stream: 'RTP-Unicast'
                    }, function(err, stream, xml) {
                        if (!err) got_live_stream_udp = stream;
                        callback();
                    });
                } catch(err) {callback();}
                },
                function(callback) {
                try {
                    cam_obj.getStreamUri({
                        protocol: 'UDP',
                        stream: 'RTP-Multicast'
                    }, function(err, stream, xml) {
                        if (!err) got_live_stream_multicast = stream;
                        callback();
                    });
                } catch(err) {callback();}
                },
                function(callback) {
                    cam_obj.getRecordings(function(err, recordings, xml) {
                        if (!err) got_recordings = recordings;
                        callback();
                    });
                },
                function(callback) {
                    // Get Recording URI for the first recording on the NVR
                    if (got_recordings) {
                        cam_obj.getReplayUri({
                            protocol: 'RTSP',
                            recordingToken: got_recordings[0].recordingToken
                        }, function(err, stream, xml) {
                            if (!err) got_replay_stream = stream;
                            callback();
                        });
                    } else {
                        callback();
                    }
                },
                function(callback) {
                    console.log('------------------------------');
                    console.log('Host: ' + ip_entry + ' Port: ' + port_entry);
                    console.log('Date: = ' + got_date);
                    console.log('Info: = ' + JSON.stringify(got_info));
                    if (got_live_stream_tcp) {
                        console.log('First Live TCP Stream: =       ' + got_live_stream_tcp.uri);
                    }
                    if (got_live_stream_udp) {
                        console.log('First Live UDP Stream: =       ' + got_live_stream_udp.uri);
                    }
                    if (got_live_stream_multicast) {
                        console.log('First Live Multicast Stream: = ' + got_live_stream_multicast.uri);
                    }
                    if (got_replay_stream) {
                        console.log('First Replay Stream: = ' + got_replay_stream.uri);
                    }
                    console.log('------------------------------');

                    let camFound = parentThis.state.detectedDevices.find(function(element) {
                        return element.ip == ip_entry;
                    });
                    if (!camFound) {
                        const joinedDevices = parentThis.state.detectedDevices.concat({
                            ip: ip_entry,
                            uri: got_live_stream_tcp.uri,
                            device_info : got_info
                        });
                        parentThis.setState({ detectedDevices: joinedDevices });
                    }
                    callback();
                },

            ]); // end flow

        });
    }); // foreach
}); // foreach

}

function generate_range(start_ip, end_ip) {
  var start_long = toLong(start_ip);
  var end_long = toLong(end_ip);
  if (start_long > end_long) {
    var tmp=start_long;
    start_long=end_long
    end_long=tmp;
  }
  var range_array = [];
  var i;
  for (i=start_long; i<=end_long;i++) {
    range_array.push(fromLong(i));
  }
  return range_array;
}

//toLong taken from NPM package 'ip'
function toLong(ip) {
  var ipl = 0;
  ip.split('.').forEach(function(octet) {
    ipl <<= 8;
    ipl += parseInt(octet);
  });
  return(ipl >>> 0);
}

//fromLong taken from NPM package 'ip'
function fromLong(ipl) {
  return ((ipl >>> 24) + '.' +
      (ipl >> 16 & 255) + '.' +
      (ipl >> 8 & 255) + '.' +
      (ipl & 255) );
}

const probeWs = (parentThis, username, password) => {
onvif.Discovery.on("device", function (cam, rinfo, xml) {
    let rtsp_cam = new Cam(
        {
            hostname: cam.hostname,
            username: username,
            password: password,
            port: cam.port
        },
        function (err) {
            let camThis = this;
            this.getStreamUri({ protocol: "RTSP" }, function (err, stream) {
                let got_info;
                camThis.getDeviceInformation(function (err, info, xml) {
                    if (!err) got_info = info;


                    let camFound = parentThis.state.detectedDevices.find(function (element) {
                        return element.ip == rtsp_cam.hostname;
                    });
                    if (!camFound) {
                        const joinedDevices = parentThis.state.detectedDevices.concat({
                            ip: rtsp_cam.hostname,
                            uri: stream.uri,
                            device_info: got_info
                        });
                        parentThis.setState({ detectedDevices: joinedDevices });
                    }
                });


            });
        }
    );
});

onvif.Discovery.probe();

}

const probe = (parentThis) => {
    console.log("Probing ONVIF using ws-discovery");
    probeWs(parentThis, 'admin', 'tlJwpbo6');

    console.log("Probing ONVIF using IP range");
    const options = { IP_RANGE_START: '192.168.2.1', IP_RANGE_END: '192.168.2.254', PORT_LIST: [80, 7575, 8000, 8080, 8081, 8899], USERNAME: 'admin', PASSWORD: 'tlJwpbo6' };
    probeRange(parentThis, options);

}

export default probe;
