import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { PythonShell } from 'python-shell';
import { exec } from 'child_process';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function ConfigPicker(props) {
  //getInfo();
  const classes = useStyles();
  const [mode, setMode] = React.useState('');
  const [config, setConfig] = React.useState('');
  const ip = props.ip;
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    getInfo();
    setInfo(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  function getInfo() {
    console.log(mode);
    exec(
      'python3 connect.py ' + ip + ' get ' + props.settingsProfile,
      (err, stdout, stderr) => {
        if (err) {
          console.error(err);
        }
        console.log(stdout);
      }
    );
  }
  function setInfo(newMode) {
    let returnVal = false;
    let val;

    let obj = props.configOptions.find(obj => obj.value == newMode);

    console.log(obj);
    val = obj.setting;
    console.log(props.settingsProfile);
    console.log(props.settingsName);
    exec(
      'python3 connect.py ' +
        ip +
        ' set ' +
        props.settingsProfile +
        ' ' +
        props.settingsName +
        ' ' +
        val,
      (err, stdout, stderr) => {
        if (err) {
          console.error(err);
        }
        console.log(stdout);
        if (!stdout) {
          return false;
        }
        const response = JSON.parse(stdout);
        returnVal = response['success'];
        if (returnVal) {
          setMode(newMode);
        }
      }
    );
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
            name: 'age',
            id: 'demo-controlled-open-select'
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
