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


const CreatePassword = (props) => {
    const[passwordFeedback,setPasswordFeedBack]=React.useState("")
    const[pswrdStatus,setPasswrdStatus]=React.useState(false)
    const[password,setPassword]=React.useState("")
    const{setIsPasswordVerified}=props
    const[ConfirmPassword,setConfirmPassword]=React.useState("")
    const navigate= useNavigate(Navigate);
    const storedUserName = localStorage.getItem('usernamee');
    const toast = useToast()
    const handlePassword=(e)=>{
        const password=e.target.value
        setPassword(password)
        const result = zxcvbn(password);
        // console.log('Password strength score:', result.score);
        // console.log('Feedback:', result.feedback.suggestions);
     
        setPasswordFeedBack(result.score)
        setPasswrdStatus(true)
        
       }

       useEffect(() => {
        if (passwordFeedback === 4) {
          setPasswrdStatus(true)
    
          // Set a timeout to hide the success message after 5 seconds
          const timeoutId = setTimeout(() => {
            setPasswrdStatus(false);
          }, 2000);
    
          // Cleanup the timeout when the component unmounts
          return () => {
            clearTimeout(timeoutId);
          };
        }
        if (passwordFeedback === 3) {
          setPasswrdStatus(true)
    
          // Set a timeout to hide the success message after 5 seconds
          const timeoutId = setTimeout(() => {
            setPasswrdStatus(false);
          }, 2000);
    
          // Cleanup the timeout when the component unmounts
          return () => {
            clearTimeout(timeoutId);
          };
        }
        if (passwordFeedback === 2) {
          setPasswrdStatus(true)
    
          // Set a timeout to hide the success message after 5 seconds
          const timeoutId = setTimeout(() => {
            setPasswrdStatus(false);
          }, 2000);
    
          // Cleanup the timeout when the component unmounts
          return () => {
            clearTimeout(timeoutId);
          };
        }
        if (passwordFeedback === 1) {
          setPasswrdStatus(true)
    
          // Set a timeout to hide the success message after 5 seconds
          const timeoutId = setTimeout(() => {
            setPasswrdStatus(false);
          }, 2000);
    
          // Cleanup the timeout when the component unmounts
          return () => {
            clearTimeout(timeoutId);
          };
        }
        if (passwordFeedback === 0) {
          setPasswrdStatus(true)
    
          // Set a timeout to hide the success message after 5 seconds
          const timeoutId = setTimeout(() => {
            setPasswrdStatus(false);
          }, 2000);
    
          // Cleanup the timeout when the component unmounts
          return () => {
            clearTimeout(timeoutId);
          };
        }
      }, [password]);



    


      const handleSubmitPassword = async (event) => {
        event.preventDefault();
    
      // Prepare the data for create password
      const userData = {
        "userName":storedUserName,
        "password":password,
      };
    
      // You can show a loading toast here
      const loadingToastId = toast({
        title: 'creating password',
        description: 'Please wait...',
        status: 'loading',
        position: 'top',
        duration: null, // The loading toast will not auto-close
      });
      
  
  
      if (password.length < 8) {
        toast({
          title: 'password Creation failed',
          description:"Password must be at least 8 characters",
          position: 'top',
          status: 'error',
          duration: 3000, // The error toast will auto-close after 3 seconds
        });
        toast.close(loadingToastId);
        return;
      } 
      else if(password !==ConfirmPassword)
      {
        toast({
          title: 'Password Creation failed',
          description:"password mismatch",
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
        const response = await fetch('https://apps.prime.rw/customerbackend/User/api/create-password', {
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
          setIsPasswordVerified&&setIsPasswordVerified(false)
          navigate("/login")
  
        } else {
          // Registration failed
          const result2=await response.json()
          toast({
            title: 'Sign up failed',
            description:result2.errorMessage,
            position: 'top',
            status: 'error',
            duration: 3000, // The error toast will auto-close after 3 seconds
          });
        }
      } catch (error) {
        console.error('Registration error:', error);
        toast({
          title: 'Sign up failed',
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
        
          <h4 className="text-lg font-medium text-gray-700">Create new password</h4>
             
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

         <TextField onChange={handlePassword}
            required
        fullWidth
            name="password"
       label="Password"
        type="password"
      id="password"
       autoComplete="off"
       maxLength={10}
       />
      </Grid>
      <div className=' ml-8'>
      {
               pswrdStatus&&passwordFeedback===0&&(<div class=" absolute  top-40  flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium"></span>Use a few words, avoid common phrases', 'No need for symbols, digits, or uppercase letters.
                </div>
              </div>)
              }
              {
               pswrdStatus&&passwordFeedback===1&&(<div class=" absolute top-40 flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium"></span>Add another word or two. Uncommon words are better.', 'Avoid repeated words and characters.
                </div>
              </div>)
              }
              {
               pswrdStatus&& passwordFeedback===2&&(<div class=" absolute  top-40 flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium"></span>Add another word or two. Uncommon words are better.', 'Avoid repeated words and characters.
                </div>
              </div>)
              }
              {
               pswrdStatus&& passwordFeedback===3&&(<div class=" absolute  top-40 flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium"></span> Difficult to guess, but aim for more complexity.
                </div>
              </div>)
              }
              {
               pswrdStatus&& passwordFeedback===4&&(<div  class=" absolute  top-40 flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>

                <span class="sr-only">Success</span>
                <div>
                  <span class="font-medium"></span>Congratulations, this is a very strong password.
                </div>
              </div>)
              }
      </div>
      <Grid className=' ' item xs={12}>

      <TextField onChange={(e)=>{setConfirmPassword(e.target.value)}}
  required
  fullWidth
  name="password"
  label="Confirm Password"
  type="password"
  id="password"
  autoComplete="off"
  maxLength={10}
/>
</Grid>
             
            </Grid>
           
            <Grid className=' mt-3' container justifyContent="flex-end">
            <button onClick={handleSubmitPassword}  class="bn47 w-full" href="/">Create password</button>
            </Grid>
          </Box>
        </Box>



        </div>
      </div>
    </Zoom>
  );
};

export default CreatePassword;
