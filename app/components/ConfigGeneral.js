import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TvIcon from "@material-ui/icons/Tv";
import SettingsIcon from "@material-ui/icons/Settings";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import PolymerIcon from "@material-ui/icons/Polymer";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ConfigPicker from "../components/ConfigPicker";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const ip = props.ip;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabs: {
    inkBarContainerStyle: { background: "white" }
  }
}));

export default function ConfigGeneral(props) {
  const ip = props.ip;
  console.log("general ip", props.ip)
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div>
        <ConfigPicker ip={ip} configType="dropdown" configLabel="Day/Night mode" configValue = "star_ir" configOptions = {[{ 'label' : 'Star IR', 'value' : 'star_ir', 'setting' : '0x0'}, { 'label' : 'Full Color', 'value' : 'full_color', 'setting' : '0x1'},{ 'label' : 'Black & White', 'value' : 'black_and_white', 'setting' : '0x2'}]}/> 

    </div>
  );
}
