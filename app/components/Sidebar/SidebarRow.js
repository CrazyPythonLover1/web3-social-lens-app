'use client'
import React from 'react';
import "./SidebarRow.css"
import { makeStyles } from '@mui/styles';
import { Avatar } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: '8px',
      },
    },
    small: {
      width: '24px',
      height: '24px',
    },
  }));

const SidebarRow = ({src,Icon, title}) => {
    const classes = useStyles();
    return (
        <div className="sidebarRow">
            {src && <Avatar className={classes.small} src={src} />}
            {Icon && <Icon />}
            <h4>{title}</h4>
        </div>
    );
};

export default SidebarRow;