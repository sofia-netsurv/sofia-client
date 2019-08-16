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
import ConfigGeneral from "../components/ConfigGeneral";
import ConfigCamera from "../components/ConfigCamera";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

export default function ConfigTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const ip = props.ip;
  console.log("tabs ip", ip);
  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          aria-label="select camera config"
        >
          <Tab icon={<SettingsIcon />} label="General" {...a11yProps(0)} />
          <Tab icon={<TvIcon />} label="Camera " {...a11yProps(1)} />
          <Tab icon={<PolymerIcon />} label="Encoding" {...a11yProps(2)} />
          <Tab
            icon={<SettingsEthernetIcon />}
            label="Network "
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ConfigGeneral ip={ip} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ConfigCamera ip={ip} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item F
      </TabPanel>
    </div>
  );
}
