// import React from 'react';
'use client'
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Avatar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ForumIcon from '@mui/icons-material/Forum';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Header = () => {
    return (
        <div className="header">
            <div className="header__left">
                {/* https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg */}
                {/* <img src="" alt=""/> */}
                <h5>Web3 Social Book</h5>

                <div className="header__input">
                    <SearchIcon/>
                    <input placeholder="Search Facebook" type="text"/>
                </div>
            </div>

            <div className="header__center">
                <div className="header__option header__option__active">
                    <HomeIcon fontSize="large" />
                </div>
                <div className="header__option">
                    <FlagIcon fontSize="large"  />
                </div>
                <div className="header__option">
                    <SubscriptionsIcon fontSize="large"  />
                </div>
                <div className="header__option">
                    <SupervisedUserCircleIcon fontSize="large"  />
                </div>
                <div className="header__option">
                    <StorefrontIcon fontSize="large"  />
                </div>
                
            </div>

            <div className="header__right">
                <div className="header__info">
                    <Avatar src="https://avatars2.githubusercontent.com/u/53335400?s=460&u=66cb296ad68ebb5d86c162a6b5aece93977865fd&v=4" title="Crazy Python Lover" />
                    {/* <h4> MIF </h4> */}
                </div>
                <div className="account__control">
                <IconButton className="icon">
                    <AddIcon />
                </IconButton >
                <IconButton className="icon">
                    <ForumIcon />
                </IconButton>
                <IconButton className="icon">
                    <NotificationsActiveIcon />
                </IconButton>
                <IconButton className="icon">
                    <ExpandMoreIcon />
                </IconButton>
                </div>
            </div>
        </div>
    );
};

export default Header;