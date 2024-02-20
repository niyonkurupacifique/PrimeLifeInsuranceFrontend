import React, { useEffect, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { concat, result } from 'lodash';
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Zoom } from 'react-swift-reveal';
import zxcvbn from 'zxcvbn';


const RequestPassword = (props) => {
   
    const[UserName,setUserName]=React.useState("")
    localStorage.setItem("usernamee",UserName)
    const navigate= useNavigate(Navigate);
    const{setOpenVerifyPasswordForm}=props
    const{setopenRequestPasswordForm}=props
    const toast = useToast()
    

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const loadingToastId = toast({
          title: 'Sending new Password...',
          description: 'Please wait...',
          status: 'loading',
          position: 'top',
          duration: null,
        });
    
        try {
          const response = await fetch(`https://apps.prime.rw/customerbackend/User/send-new-password?username=${UserName}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            setOpenVerifyPasswordForm(true)
            setopenRequestPasswordForm(false)
            toast({
              title: 'New Password sent successfully',
              description: 'Check your message',
              position: 'top',
              status: 'success',
              duration: 3000,
            });
          } else {
            // setResendOtp(true);
            // console.log('Verification Error Message:');
            toast({
              title: 'Failed to Send new password',
              description: 'Contact prime life insurance for support',
              position: 'top',
              status: 'error',
              duration: 3000,
            });
          }
        } catch (error) {
          console.error('password generation failed:', error);
          toast({
            title: 'Failed to send new password',
            description: 'Contact prime life insurance for support',
            position: 'top',
            status: 'error',
            duration: 3000,
          });
        } finally {
          toast.close(loadingToastId);
        }
      };



  
return (
    <Zoom>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="container bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center gap-y-5">
        
          <h4 className="text-lg font-medium text-gray-700">Enter your Username to Reset your Password</h4>
             
          <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>

         <TextField  onChange={(e)=>{setUserName(e.target.value)}}
            required
        fullWidth
            name="UserName"
       label="PhoneNumber"
        type="UserName"
      id="UserName"
       autoComplete="off"
       />
      </Grid>
     
    </Grid>
           
            <Grid className=' mt-3' container justifyContent="flex-end">
                <div className=' flex space-x-2'>
                <button onClick={handleResetPassword}   class="bn47 w-full" >Submit</button>
                <button onClick={()=>{setopenRequestPasswordForm(false)}}   class="bn47  bg-red-300  w-full" > <span className=' text-white'>Cancel</span></button>
                </div>
           
            </Grid>
          </Box>
        </Box>



        </div>
      </div>
    </Zoom>
  );
};

export default RequestPassword;
