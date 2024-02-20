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


const VerifyPassword = (props) => {
   
    const[UserName,setUserName]=React.useState("")
    const[Password,setPassword]=React.useState("")
    const { setIsPasswordVerified} = props;
    const {setOpenVerifyPasswordForm}=props;
    const navigate= useNavigate(Navigate);
    const toast = useToast()
    

      const handleVerifyPassword = async (event) => {
        event.preventDefault();
    
      // Prepare the data for create password
      const userData = {
        "userName":UserName,
        "password":Password,
      };
      // console.log("userdata is",userData)
    
      // You can show a loading toast here
      const loadingToastId = toast({
        title: 'creating password',
        description: 'Please wait...',
        status: 'loading',
        position: 'top',
        duration: null, // The loading toast will not auto-close
      });
      
  
  
      if (UserName==="") {
        toast({
          title: ' failed',
          description:"UserName field is Required",
          position: 'top',
          status: 'error',
          duration: 3000, // The error toast will auto-close after 3 seconds
        });
        toast.close(loadingToastId);
        return;
      } 
      else if(Password==="")
      {
        toast({
          title: ' failed',
          description:"password filed is Required",
          position: 'top',
          status: 'error',
          duration: 3000, // The error toast will auto-close after 3 seconds
        });
        toast.close(loadingToastId);
         return;
         
      }   
         
    else{
      try {
        // Make a POST request to the registration API
        const response = await fetch('https://apps.prime.rw/customerbackend/User/api/verify-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
    
        if (response.ok) {
          const result2=await response.json()
         
          //  successful
          toast({
            title: 'Thank you! ',
            description:result2.successMessage, 
            position:'top',
            status: 'success',
            duration: 10000, // The success toast will auto-close after 3 seconds
          });
        
          navigate("/login")
       setIsPasswordVerified(true)
        setOpenVerifyPasswordForm(false)
  
        } else {
          // Registration failed
          const result2=await response.json()
          toast({
            title: ' failed',
            description:result2.errorMessage,
            position: 'top',
            status: 'error',
            duration: 3000, // The error toast will auto-close after 3 seconds
          });
        }
      } catch (error) {
        console.error('passwordVerification error:', error);
        toast({
          title: 'failed',
          description:error,
          position: 'top',
          status: 'error',
          duration: 3000, // The error toast will auto-close after 3 seconds
        });
      } finally {
        // Close the loading toast
        toast.close(loadingToastId);
      }
    };
  }



  
return (
    <Zoom>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="container bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center gap-y-5">
        
          <h4 className="text-lg font-medium text-gray-700">Enter the Password Sent to Your Phone</h4>
             
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
       label="UserName"
        type="UserName"
      id="UserName"
       autoComplete="off"
       />
      </Grid>
     
      <Grid className=' ' item xs={12}>

      <TextField onChange={(e)=>{setPassword(e.target.value)}}
  required
  fullWidth
  name="password"
  label="Password"
  type="password"
  id="password"
  autoComplete="off"
/>
</Grid>
             
            </Grid>
           
            <Grid className=' mt-3' container justifyContent=" center">
           
            <div className=' flex space-x-2'>
                <button onClick={handleVerifyPassword}   class="bn47 w-full" >Submit</button>
                <button onClick={()=>{setOpenVerifyPasswordForm(false)}}   class="bn47  bg-red-300  w-full" > <span className=' text-white'>Cancel</span></button>
                </div>
            </Grid>
          </Box>
        </Box>



        </div>
      </div>
    </Zoom>
  );
};

export default VerifyPassword;
