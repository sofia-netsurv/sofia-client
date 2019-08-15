import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { PythonShell } from "python-shell";

let pyshell = new PythonShell("connect.py");

const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

pyshell.on("message", function(message) {
  console.log("message from netsurv");
  console.log(message);
});
pyshell.on("close", function(message) {
  console.log("stream close");
  console.log(message);
  pyshell = new PythonShell("connect.py");
});

export default function ConfigPicker(props) {
  //getInfo();
  const classes = useStyles();
  const [mode, setMode] = React.useState("");
  const [config, setConfig] = React.useState("");

  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    getInfo();
    setInfo();
    setMode(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  function getInfo() {
    console.log("get info");
    pyshell.once("message", function(message) {
      let messageJson = JSON.parse(message);
      console.log(messageJson);
      console.log(messageJson.response.Camera.Param[0].DayNightColor);
      setConfig(messageJson.response);
      console.log(config);
      let dayNight = messageJson.response.Camera.Param[0].DayNightColor;

      if (dayNight == "0x00000000" || dayNight == "0x0") {
        setMode("star_ir");
      } else if (dayNight == "0x00000001" || dayNight == "0x1") {
        setMode("full_color");
      } else if (dayNight == "0x00000002" || dayNight == "0x2") {
        setMode("black_and_white");
      }
    });
    let response = pyshell.send("camera get");
  }
  function setInfo() {
    console.log(mode);
    if (config) {
      let dayNight;
      if (mode == "star_ir") {
        dayNight = "0x00000000";
      } else if (mode == "full_color") {
        dayNight = "0x00000001";
      } else {
        dayNight = "0x00000002";
      }
      config.Camera.Param[0].DayNightColor = dayNight;
      console.log("sent config");
      console.log(config);

      pyshell.send("camera set");
      pyshell.send("day_night");

      pyshell.send(dayNight);
    }
  }
  return (
    <form autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">
          {props.configLabel}
        </InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={mode}
          onChange={handleChange}
          inputProps={{
            name: "age",
            id: "demo-controlled-open-select"
          }}
        >
          {props.configOptions.map((item, i) => (
            <MenuItem value={item.value} key={i}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}
