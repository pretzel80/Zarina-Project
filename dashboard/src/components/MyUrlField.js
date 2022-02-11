import * as React from "react";
import { useRecordContext } from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
import LaunchIcon from "@material-ui/icons/Launch";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    wordBreak: "break-word",
  },
  icon: {
    width: "1em",
    height: "1em",
    paddingLeft: 2,
  },
});

const MyUrlField = ({ source }) => {
  const record = useRecordContext();
  const classes = useStyles();
  return record ? (
    <a href={record[source]} className={classes.link}>
      <LaunchIcon className={classes.icon} />
    </a>
  ) : null;
};

export default MyUrlField;
