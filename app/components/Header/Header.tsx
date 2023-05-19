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

import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { client, challenge, authenticate } from '../../../api'

declare global {
    interface Window {
        ethereum?: any;
    }
}

const Header = () => {
    /* local state variables to hold user's address and access token */
    const [address, setAddress] = useState<string>()
    const [token, setToken] = useState()
    useEffect(() => {
        /* when the app loads, check to see if the user has already connected their wallet */
        checkConnection()
    }, [])
    async function checkConnection() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts: string[] = await provider.listAccounts()
        if (accounts.length) {
            setAddress(accounts ? accounts[0] : '')
        }
    }
    async function connect() {
        /* this allows the user to connect their wallet */
        const account = await window.ethereum.send('eth_requestAccounts')
        if (account.result.length) {
            setAddress(account.result[0])
        }
    }
    async function login() {
        try {
            /* first request the challenge from the API server */
            const challengeInfo = await client.query({
                query: challenge,
                variables: { address }
            })
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            /* ask the user to sign a message with the challenge info returned from the server */
            const signature = await signer.signMessage(challengeInfo.data.challenge.text)
            /* authenticate the user */
            const authData = await client.mutate({
                mutation: authenticate,
                variables: {
                    address, signature
                }
            })
            /* if user authentication is successful, you will receive an accessToken and refreshToken */
            const { data: { authenticate: { accessToken } } } = authData
            console.log({ accessToken })
            setToken(accessToken)
        } catch (err) {
            console.log('Error signing in: ', err)
        }
    }

    return (
        <div className="header">
            <div className="header__left">
                {/* https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg */}
                {/* <img src="" alt=""/> */}
                <h5>Web3 Social Book</h5>

                <div className="header__input">
                    <SearchIcon />
                    <input placeholder="Search Facebook" type="text" />
                </div>
            </div>

            <div className="header__center">
                <div className="header__option header__option__active">
                    <HomeIcon fontSize="large" />
                </div>
                <div className="header__option">
                    <FlagIcon fontSize="large" />
                </div>
                <div className="header__option">
                    <SubscriptionsIcon fontSize="large" />
                </div>
                <div className="header__option">
                    <SupervisedUserCircleIcon fontSize="large" />
                </div>
                <div className="header__option">
                    <StorefrontIcon fontSize="large" />
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
                    {/* <span className="connect">
                        <ExpandMoreIcon />
                        Connect
                    </span> */}
                    { /* if the user has not yet connected their wallet, show a connect button */}
                    {
                        !address && <span className="connect" onClick={connect}>Connect</span>
                    }
                    { /* if the user has connected their wallet but has not yet authenticated, show them a login button */}
                    {
                        address && !token && (
                            <span className="connect" onClick={login}>
                                Login
                            </span>
                        )
                    }
                    { /* once the user has authenticated, show them a success message "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4MmFEYjM3OTE5MzAyMjlBZGFGQjYwY2YyRTQzRkJCYTFBNjg1NjExRSIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2ODQ1MDU1ODEsImV4cCI6MTY4NDUwNzM4MX0.8Fe8G8qeUwCL0UsOA5dTsKHI-a8hW34jN7x-zuOhEP4"*/}
                    {
                        address && token && <span className="connect">Logged In</span>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;