import React from 'react';
import { Box } from '@mui/material';
import '../pages/dashboard/dashboard.css';

const SongRequestPricing = ({
  chargeCustomers,
  setChargeCustomers,
  songAmount,
  amountList,
  categoryList,
  setSongAmount,
}) => {
  const handleCustomSongAmount = (e, key) => {
    chargeCustomers &&
      setSongAmount(
        songAmount
          ? { ...songAmount, [key]: Number(e?.target?.value) }
          : {
              [key]: Number(e?.target?.value),
            }
      );
  };

  return (
    <Box className={'gridContainer'}>
      <Box className={'gridItem'}>
        <Box>Do You want to change your customers for requesting songs?</Box>
        <Box>Custom song request amount-</Box>
        <Box>Regular song request amounts from high to low-</Box>
      </Box>
      <Box className={'gridItem'}>
        <Box display='flex' justifyContent='center' gap={1} alignItems='center'>
          <input
            className={'radioBtn'}
            type='radio'
            checked={chargeCustomers ? true : false}
            onChange={() => {
              setChargeCustomers(!chargeCustomers);
            }}
          />
          Yes
          <input
            className={'radioBtn'}
            checked={chargeCustomers ? false : true}
            onChange={() => {
              setChargeCustomers(!chargeCustomers);
            }}
            type='radio'
          />
          No
        </Box>

        <input
          type='text'
          value={songAmount?.category_6}
          className={'outlinedInputBox'}
          onChange={(e) => handleCustomSongAmount(e, 'category_6')}
          required={chargeCustomers || false}
        ></input>

        <Box display='flex' justifyContent='space-between'>
          {amountList &&
            amountList.slice(1, amountList.length).map((category, index) => {
              const categoryKey = categoryList && categoryList[index + 1];
              return (
                <input
                  key={index}
                  style={{ width: '40px' }}
                  type='text'
                  value={songAmount[categoryKey]}
                  className={'outlinedInputBox'}
                  onChange={(e) => handleCustomSongAmount(e, categoryKey)}
                  required={chargeCustomers || false}
                ></input>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default SongRequestPricing;
