import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import Iconify from '../../../components/iconify';
import { useToast } from '@chakra-ui/react';
import VerifyPassword from 'src/pages/pagesComponentsFolder/verifyPassword';
import CreatePassword from 'src/pages/pagesComponentsFolder/createPassword';
import RequestPassword from 'src/pages/pagesComponentsFolder/requestPasswordForm';
import { useContext } from 'react';
import { OpenModalContext } from 'src/pages/context';



export default function LoginForm() {
  const{setToken}=useContext(OpenModalContext)
  const{setNames}=useContext(OpenModalContext)
  const{setNationalId}=useContext(OpenModalContext)
  const{setUsername}=useContext(OpenModalContext)
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const[email,setEmail]=React.useState("")
  const[password,setPassword]=React.useState("")
  const[openVerifyPasswordForm,setOpenVerifyPasswordForm]=React.useState("")
  const[isPasswordVerified,setIsPasswordVerified]=React.useState(false)
  const[openRequestPasswordForm,setopenRequestPasswordForm]=useState(false)
  const{loginFromHeader}=useContext(OpenModalContext) 
  const{setLoginCalled}=useContext(OpenModalContext)
  const{setIsTokenActive}=useContext(OpenModalContext)

 const True=sessionStorage.getItem('loginFromHeaderTrue')

  const toast = useToast()
  console.log("login from header in login is",loginFromHeader)
  const handleLogin = async (event) => {
    event.preventDefault();

 
  const userData = {
    userName:email,
    password:password
  };
//  console.log(userData)
 
  const loadingToastId = toast({
    title: 'login....',
    description: 'Please wait...',
    status: 'loading',
    position: 'top',
    duration: null, 
  });
  
  if (email==="") {
      toast({
        title: 'failed',
        description:"PhoneNumber is required",
        position: 'top',
        status: 'error',
        duration: 3000,
      });
      toast.close(loadingToastId);
      return;
    }
    if (password==="") {
      toast({
        title: 'failed',
        description:"password required",
        position: 'top',
        status: 'error',
        duration: 3000, 
      });
      toast.close(loadingToastId);
      return;
      
    }
     
else{
  try {
  
    const response = await fetch('https://apps.prime.rw/customerbackend/User/api/Authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const result2=await response.json()
      // console.log("data",[result2.token,result2.email,result2.names,result2.NationalId])
      setToken(result2.token)
      
      sessionStorage.setItem('token',result2.token);
      localStorage.setItem('email',result2.email);
     
      sessionStorage.setItem('names',result2.names)
      sessionStorage.setItem('nationalId',result2.nationalId)

  //  console.log("national id is ",result2.nationalId)

      // localStorage.setItem('nationalId',result2.nationalId);
      localStorage.setItem('userId',result2.id);
      localStorage.setItem('usernamee',result2.userName);
      toast({
        title:result2.successMessage,
        position: 'top',
        status: 'success',
        duration: 3000,
      });
      // navigate("/login")
       // Assuming this is within a React component

if (loginFromHeader === true) {
  navigate(`/Home/products`);
  setIsTokenActive(true)
  setLoginCalled(false); // This line executes regardless of the condition, use it only when loginFromHeader is true
}

if (loginFromHeader === false) {
  navigate(`/payment`);
}

     
  
    } else {
      
      const result2=await response.json()
      toast({
        title: 'login failed',
        description:result2.errorMessage,
        position: 'top',
        status: 'error',
        duration: 3000,
      });
    }
  } catch (error) {
    console.error('login error:', error);
    toast({
      title: 'login failed',
      description: 'There was an error during login. Please try again.',
      position: 'top',
      status: 'error',
      duration: 3000, 
    });
  } finally {
   
    toast.close(loadingToastId);
  }
};

// console.log("log in from headerrrr",loginFromHeader)
}

  return (
    <>
     {
         openRequestPasswordForm&&(
          <div className='overlay'>
      <RequestPassword setopenRequestPasswordForm={setopenRequestPasswordForm}  setOpenVerifyPasswordForm={setOpenVerifyPasswordForm}></RequestPassword>
      </div>
        )
      }
      {
         openVerifyPasswordForm&&(
          <div className='overlay'>
      <VerifyPassword setIsPasswordVerified={setIsPasswordVerified} setOpenVerifyPasswordForm={setOpenVerifyPasswordForm} ></VerifyPassword>
      </div>
        )
      }
       {
        isPasswordVerified&&(
          <div className='overlay'>
     <CreatePassword setIsPasswordVerified={setIsPasswordVerified}></CreatePassword>
      </div>
        )
      }
      <Stack spacing={3}>
        <TextField name="Phone number" placeholder='phone number 07....' label="PhoneNumber" onChange={(e)=>{setEmail(e.target.value)}} />

        <TextField onChange={(e)=>{setPassword(e.target.value)}}
          name="password"
          label="Password"
          
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
              
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      
       
       <Button onClick={()=>{setopenRequestPasswordForm(true)}}><Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link></Button>
      </Stack>


<button onClick={handleLogin} class="bn47" href="/">Login</button>
    </>
  );
}
