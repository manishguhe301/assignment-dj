import React, { useEffect, useState } from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import {
  getUser,
  modifyPrice,
  fetchUserDetails,
} from '../../service/userServices';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import { axisClasses } from '@mui/x-charts';
import SongRequestPricing from '../../components/SongRequestPricing';

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [chargeCustomers, setChargeCustomers] = useState(false);
  const [songAmount, setSongAmount] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();
  const minSongAmount = {
    category_6: 99,
    category_7: 79,
    category_8: 59,
    category_9: 39,
    category_10: 19,
  };

  const user = getUser();
  const amountList = songAmount && Object.values(songAmount);
  const categoryList = songAmount && Object.keys(songAmount);

  const setDisabled = () => {
    if (!chargeCustomers || !songAmount) {
      setIsDisabled(true);
      return;
    }
    if (amountList) {
      for (let index = 0; index < amountList.length; index++) {
        const value = amountList[index];
        const categoryKey = categoryList && categoryList[index];

        if (parseInt(value) < minSongAmount[categoryKey]) {
          setIsDisabled(true);
          return;
        }
      }
      setIsDisabled(false);
    } else {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const data = user && (await fetchUserDetails(user?.id));
        data && setUserDetails(data);
        data && setSongAmount(data?.amount);
        data?.charge_customers && setChargeCustomers(data?.charge_customers);
      } catch {
        return null;
      }
    };

    const timer = setTimeout(() => {
      !userDetails && getUserDetails();
      if (!user) {
        navigate('/login');
        return null;
      }
    }, 1000);

    setDisabled();
    return () => clearTimeout(timer);

    // eslint-disable-next-line
  }, [userDetails, user, chargeCustomers]);

  const handleUpdatePrice = async () => {
    const data = await modifyPrice({ userId: user?.id, songAmount });
    data && setSongAmount(data?.amount);
  };

  const isMobile = useMediaQuery('(max-width:680px)');

  const chartSetting = {
    yAxis: [
      {
        label: '₹',
      },
    ],
    width: isMobile ? 400 : 600,
    height: isMobile ? 400 : 500,
    sx: {
      stroke: '#fff',
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-10px, 0)',
      },
    },
  };

  return userDetails ? (
    <Box className='main-container'>
      <p className='heading'>
        {userDetails?.name || ''}, {userDetails?.location || ''} on Dhun Jam
      </p>
      <SongRequestPricing
        chargeCustomers={chargeCustomers}
        setChargeCustomers={setChargeCustomers}
        songAmount={songAmount}
        amountList={amountList}
        categoryList={categoryList}
        setSongAmount={setSongAmount}
      />
      {chargeCustomers && (
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: [
                'Custom',
                'Category 1',
                'Category 2',
                'Category 3',
                'Category 4',
              ],

              scaleType: 'band',
            },
          ]}
          colors={['#f0c3f1']}
          series={[
            {
              data: amountList,
            },
          ]}
          {...chartSetting}
        />
      )}
      <Button
        disabled={isDisabled}
        variant='contained'
        className='submitBtn'
        onClick={handleUpdatePrice}
      >
        Save
      </Button>
    </Box>
  ) : (
    <Loader />
  );
};

export default Dashboard;
