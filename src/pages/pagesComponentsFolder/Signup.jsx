import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
 import { OpenModalContext } from '../context';
import { useContext } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useToast } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';
import OtpVerification from './otpForm/otpForm';
import CreatePassword from './createPassword';
import { Bounce } from 'react-swift-reveal';
import {
  Alert,
  Stack,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { result } from 'lodash';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://prime.rw/life-insurance/about-life-insurance/about-us/">
        PrimeLifeInsurance
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const{setmessageStatus}=useContext(OpenModalContext)
  const{messageStatus}=useContext(OpenModalContext)
  const{setMessageType}=useContext(OpenModalContext)
  const[signupClicked,setSignupClicked]=React.useState(false)
  const[password,setPassword]=React.useState("")
  const[Confirmpassword,setConfirmPassword]=React.useState("")
  const[names,setNames]=React.useState("")
  const[username,setUserName]=React.useState("")
  const[email,setEmail]=React.useState("")
  const[telephoneNumber,setTelephoneNumber]=React.useState("")
  const[nationalId,setNationalId]=React.useState("")
  const[passwordFeedback,setPasswordFeedBack]=React.useState("")
  const[pswrdStatus,setPasswrdStatus]=React.useState(false)
  const[openOtpForm,setOpenOtpForm]=React.useState(false)
  const[isOtpVerified,setIsOtpVerified]=React.useState(false)

  const{loginFromHeader}=useContext(OpenModalContext)
  console.log("login from header is",loginFromHeader)
  const[userData,setUserData]=React.useState([])
  const navigate=useNavigate(Navigate)
  const handlePassword=(e)=>{
   const password=e.target.value
   setPassword(password)
   const result = zxcvbn(password);
  //  console.log('Password strength score:', result.score);
  //  console.log('Feedback:', result.feedback.suggestions);

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
 
  const toast = useToast()
  // console.log("message status is:",messageStatus)
 
  const handleSubmit = async (event) => {
      event.preventDefault();
  
    // Prepare the data for registration
    const userData = {
      "recordedDate":new Date().now,
      // name:names,
      username:username,
      nationalId:nationalId,
      email:email,
     
    };
  
    // You can show a loading toast here
    const loadingToastId = toast({
      title: 'Signing up',
      description: 'Please wait...',
      status: 'loading',
      position: 'top',
      duration: null, // The loading toast will not auto-close
    });
   

    const usernameRegex = /^07\d{8}$/;

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    
      if (!usernameRegex.test(username)) {
        toast({
          title: 'Sign up failed',
          description:"Invalid phone number",
          position: 'top',
          status: 'error',
          duration: 3000, // The error toast will auto-close after 3 seconds
        });
        toast.close(loadingToastId);
        return;
        
      }
      if (!emailRegex.test(email)) {
        toast({
          title: 'Sign up failed',
          description:"Invalid email",
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
      const response = await fetch('https://apps.prime.rw/customerbackend/User/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const result2=await response.json()
        setUserData(result2)
        // console.log("result data",result2)
        // console.log("user id is ",result2.id)
        localStorage.setItem('usernamee',username);
       
        localStorage.setItem('userId',result2.id);
        localStorage.setItem("customerInfo",result2)

        // Registration was successful
        toast({
          title: 'Thank you for registering! ',
          description: "We've sent an OTP code to your phone. Please check your messages and enter the code to complete your registration",
          position: 'top',
          status: 'success',
          duration: 10000, // The success toast will auto-close after 3 seconds
        });
        setOpenOtpForm(true)
        

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
        description: 'There was an error during registration. Please try again.',
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
    <div style={{backgroundColor:"#EBEBEB"}}>
      {
        openOtpForm&&(
          <div className='overlay'>
      <OtpVerification  setOpenOtpForm={setOpenOtpForm} setIsOtpVerified={setIsOtpVerified}></OtpVerification>
      </div>
        )
      }
       {
        isOtpVerified&&(
          <div className='overlay'>
     <CreatePassword></CreatePassword>
      </div>
        )
      }
      
    <ThemeProvider theme={defaultTheme} >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
     
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
             
              <Grid item xs={12} sm={12}>
                <TextField placeholder='phone number 07....' onChange={(e)=>setUserName(e.target.value)}
                  required
                  fullWidth
                  id="UserName"
                  label="PhoneNumber"
                  name="UserName"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField onChange={(e)=>{setEmail(e.target.value)}}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField onChange={(e)=>{setNationalId(e.target.value)}}
                  required
                  fullWidth
                  id="National ID"
                  label="National ID"
                  name="National ID"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive prime life  updates via email."
                />
              </Grid>
            </Grid>
            <Button  onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={()=>{navigate("/login")}} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
     
        <Copyright sx={{ mt: 1 }} />
      </Container>
    </ThemeProvider>
    </div>
  );
}