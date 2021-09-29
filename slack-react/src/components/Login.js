import React from "react";
import styled from "styled-components";
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';

const Login = () => {
    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch(e => alert(e.message));
    }

  return (
    <LoginContainer>
      <LoginInner>
        <img
          src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/2019-01_BrandRefresh_slack-brand-refresh_header-1.png"
          alt=""
              />
              <h1>Sign in to the Slack</h1>
              <p>sid.slack.com</p>

              <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInner>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInner = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: var(--slack-color) !important;
    color: white;
  }
`;