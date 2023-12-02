import React, { useState } from 'react';
// import classes from '../styles/login.module.css';
import './loginPage.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Box, Typography } from '@mui/material';
import { setUser, logIn } from '../../service/userServices';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    showPassword: false,
    showNameError: '',
    showPasswordError: '',
  });

  const onChangeHandler = (e, type) => {
    switch (type) {
      case 'username':
        return setUserData({ ...userData, username: e?.target?.value });
      case 'password':
        return setUserData({ ...userData, password: e?.target?.value });
      default:
        return setUserData({ ...userData });
    }
  };

  const onSignInBtnHandler = async () => {
    const { username, password } = userData;
    const isValidUsername = username && username.length >= 2;
    var pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidPassword = password && pattern.test(password);

    if (!isValidUsername && !isValidPassword) {
      setUserData({
        ...userData,
        showError: 'Please enter the username and password.',
      });
    } else if (!isValidUsername) {
      setUserData({
        ...userData,
        showNameError: 'Username must contain characters between 2 to 60.',
      });
    } else if (!isValidPassword) {
      setUserData({
        ...userData,
        showPasswordError:
          'Please enter strong password. You password must have at least one uppercase, lowercase, special character and a number.',
      });
    } else if (isValidUsername && isValidPassword) {
      try {
        const data = await logIn({ username, password });
        setUser({ username, password, ...data });
        navigate('/');
      } catch {
        setUserData({
          ...userData,
          showError: 'Username or Password is not valid',
        });
      }
    }
  };

  return (
    <Box className={`container main-container`}>
      <p className='heading'>Venue Admin Login</p>
      <input
        className={'inputText'}
        placeholder='Username'
        type='text'
        value={userData.username}
        onChange={(e) => onChangeHandler(e, 'username')}
      />
      {userData.showNameError && (
        <Typography className={'errMsg'} variant='span'>
          {userData.showNameError}
        </Typography>
      )}
      <br />

      <Box position={'relative'}>
        <input
          className={'inputText'}
          placeholder='Password'
          type={userData.showPassword ? 'text' : 'password'}
          value={userData.password}
          onChange={(e) => onChangeHandler(e, 'password')}
        />
        {userData.showPassword ? (
          <VisibilityOff
            className={'visibilityIcon'}
            onClick={() =>
              setUserData({ ...userData, showPassword: !userData.showPassword })
            }
          />
        ) : (
          <Visibility
            className={'visibilityIcon'}
            onClick={() =>
              setUserData({ ...userData, showPassword: !userData.showPassword })
            }
          />
        )}
      </Box>
      {userData.showPasswordError && (
        <Typography className={'errMsg'} variant='span'>
          {userData.showPasswordError}
        </Typography>
      )}
      {userData.showError && (
        <Typography className={'errMsg'} variant='span'>
          {userData.showError}
        </Typography>
      )}
      <Button
        variant='contained'
        className='submitBtn'
        type='submit'
        onClick={onSignInBtnHandler}
      >
        Sign In
      </Button>
      <p className={'newRegText'}>New Registration?</p>
    </Box>
  );
};

export default LoginPage;
