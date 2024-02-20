import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import loginImage from '../../src/pages/pagesComponentsFolder/Images/loginIamge.jpg'
import { Links, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { OpenModalContext } from './context';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate=useNavigate(Navigate)
  const{loginCalled}=useContext(OpenModalContext) 
  return (
    <>
      <Helmet>
        <title> Login | Prime life insurance </title>
      </Helmet>

      <StyledRoot>
        
        {/* <Logo className="max-sm:hidden"
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        /> */}
        <svg onClick={()=>{navigate("/")}}  className="max-sm:w-44 fixed left-8" xmlns="http://www.w3.org/2000/svg" width="200.2" height="90.2" viewBox="0 0 711.2 139.2">
          <path fill="#1C9ED9" d="M522.8 75.1V5h41.1v11.4h-26.6v17.4h25.4v11h-25.4v18.7h26.6v11.6zM215.9 52.2h-6.2v23h-14.5V5.1l22.9-.3c8.9 0 15.7 2 20.6 5.9 4.8 3.9 7.3 9.4 7.3 16.6 0 7.6-2.8 13.6-8.3 18.1-5.6 4.5-12.8 6.8-21.8 6.8zm.9-35.8h-7.1v23.9c.6.2 1.6.3 2.8.4 1.2.1 2.4.1 3.4.1 4.7 0 8.2-1.1 10.8-3.2 2.5-2.1 3.8-5.2 3.8-9.4 0-3.6-1.2-6.5-3.5-8.6-2.4-2.1-5.8-3.2-10.2-3.2zm89.3 58.8l-20-28.8h-.7v28.8h-14.5v-70c4.6 0 8.7 0 12.4-.1 3.7-.1 7.2-.2 10.4-.3 8.4 0 14.9 1.6 19.5 4.9 4.6 3.3 6.9 8.1 6.9 14.5 0 5.5-1.7 10-5.2 13.4-3.5 3.5-8.1 5.7-13.8 6.6l5.6 7.5L324 75.1l-17.9.1zM291.5 16h-6.2v20.4l6.7.3c3.9 0 6.9-1 9.2-3 2.3-2 3.4-4.7 3.4-8 0-3.1-1.1-5.5-3.4-7.2-2.2-1.7-5.5-2.5-9.7-2.5zM481 75.2l-5.3-36.6-2-16.1c-.4 1.8-1 4-1.7 6.6-.7 2.6-1.3 4.8-1.8 6.6L457 75.2h-15.3l-11.9-36.7c-1-3-1.9-5.8-2.5-8.3-.7-2.5-1.3-5.1-1.9-7.6-.1 2.4-.3 5.1-.7 8.1-.4 3-.8 6-1.1 8.9l-4.7 35.8h-14.4l10.8-70.1h18.2l13 39.4c.4 1.4 1.1 3.6 1.9 6.6.8 3 1.3 5.2 1.6 6.6.6-2.4 1.2-4.5 1.7-6.2.5-1.8 1.2-3.9 2.1-6.5L467 5.1h18.7l10.5 70.1H481zM358.5 5.1v.1h-.1V17h.1v58.2H373V5.1z">
          </path>
          <path fill="#FFF" d="M60.4 16.9L33 122.7h74.7l29.6-36.2 17.6-62-28.6-14.2z"></path>
          <path fill="#F8D209" d="M182.6 5H47.4L0 138.4h135.1L182.6 5zM43.3 116.6l32-86.4H99l-32 86.4H43.3zM97 91.4l22.6-61.2h23.7l-22.6 61.2H97z">
          </path>
          <path d="M201.6 89.4v49h-6.3v-49h6.3zm11.5 23.3c0-3.6-.1-6.6-.3-9.5h5.7l.4 5.8h.1c1.7-3.3 5.8-6.6 11.6-6.6 4.9 0 12.4 2.9 12.4 15v21h-6.4v-20.3c0-5.7-2.1-10.4-8.1-10.4-4.2 0-7.5 3-8.6 6.5-.3.8-.4 1.9-.4 3v21.1h-6.4v-25.6zm39.5 19.1c1.9 1.2 5.2 2.5 8.4 2.5 4.6 0 6.8-2.3 6.8-5.2 0-3.1-1.8-4.7-6.5-6.5-6.3-2.3-9.3-5.7-9.3-10 0-5.7 4.6-10.3 12.1-10.3 3.6 0 6.7 1 8.6 2.2l-1.6 4.7c-1.4-.9-3.9-2-7.2-2-3.8 0-5.9 2.2-5.9 4.8 0 2.9 2.1 4.2 6.7 6 6.1 2.3 9.2 5.4 9.2 10.6 0 6.2-4.8 10.5-13.2 10.5-3.9 0-7.4-.9-9.9-2.4l1.8-4.9zm59-3c0 3.6.1 6.8.3 9.6h-5.7l-.4-5.7h-.1c-1.7 2.8-5.4 6.5-11.6 6.5-5.5 0-12.1-3.1-12.1-15.4v-20.6h6.4v19.5c0 6.7 2 11.2 7.8 11.2 4.3 0 7.3-3 8.4-5.8.4-.9.6-2.1.6-3.3v-21.6h6.4v25.6zm10.6-14.6c0-4.1-.1-7.7-.3-11h5.6l.2 6.9h.3c1.6-4.7 5.4-7.7 9.7-7.7.7 0 1.2.1 1.8.2v6c-.7-.1-1.3-.2-2.2-.2-4.5 0-7.7 3.4-8.6 8.2-.1.9-.3 1.9-.3 3v18.7h-6.3v-24.1zm42.9 24.2l-.5-4.4h-.2c-2 2.8-5.7 5.2-10.8 5.2-7.1 0-10.8-5-10.8-10.1 0-8.5 7.6-13.2 21.1-13.1v-.7c0-2.9-.8-8.1-8-8.1-3.3 0-6.7 1-9.2 2.6l-1.5-4.2c2.9-1.9 7.1-3.1 11.6-3.1 10.8 0 13.4 7.3 13.4 14.4V130c0 3.1.1 6 .6 8.4h-5.7zm-.9-18c-7-.1-14.9 1.1-14.9 7.9 0 4.1 2.8 6.1 6 6.1 4.6 0 7.5-2.9 8.5-5.9.2-.7.4-1.4.4-2v-6.1zm16.4-7.7c0-3.6-.1-6.6-.3-9.5h5.7l.4 5.8h.1c1.7-3.3 5.8-6.6 11.6-6.6 4.9 0 12.4 2.9 12.4 15v21h-6.4v-20.3c0-5.7-2.1-10.4-8.1-10.4-4.2 0-7.5 3-8.6 6.5-.3.8-.4 1.9-.4 3v21.1h-6.4v-25.6zM446 137c-1.7.9-5.4 2-10.1 2-10.6 0-17.5-7.2-17.5-17.9 0-10.8 7.4-18.7 18.9-18.7 3.8 0 7.1.9 8.9 1.8l-1.4 4.9c-1.5-.9-3.9-1.7-7.4-1.7-8.1 0-12.4 6-12.4 13.3 0 8.1 5.2 13.1 12.2 13.1 3.6 0 6-.9 7.9-1.7l.9 4.9zm10.6-15.1c.1 8.6 5.7 12.2 12.1 12.2 4.6 0 7.3-.8 9.7-1.8l1.1 4.6c-2.2 1-6.1 2.2-11.7 2.2-10.8 0-17.3-7.1-17.3-17.7s6.2-19 16.5-19c11.5 0 14.5 10.1 14.5 16.6 0 1.3-.1 2.3-.2 3h-24.7zm18.8-4.5c.1-4.1-1.7-10.4-8.9-10.4-6.5 0-9.3 6-9.8 10.4h18.7zm107.1-42.3l14.8-70h8.1l-13.2 62.7h27.1l-1.6 7.4h-35.2zm48.3 0h-8L634 22.6h8l-11.2 52.5zm5.4-66c0-1.8.5-3.2 1.5-4.4 1-1.1 2.3-1.7 4-1.7 2.8 0 4.2 1.4 4.2 4.3 0 1.8-.5 3.2-1.6 4.5-1.1 1.2-2.3 1.8-3.7 1.8-1.3 0-2.3-.4-3.2-1.2-.8-.7-1.2-1.8-1.2-3.3zM635 98.6c-2.2 0-4.2-.3-6-1v-6.8c2 .7 3.8 1.1 5.4 1.1 2.4 0 4.3-1 5.6-3 1.3-2 2.4-4.8 3.2-8.5L654 28.6h-9.2l.6-3.2 9.9-3.2 1.1-4.8c1.5-6.4 3.5-10.9 6.1-13.5 2.6-2.6 6.5-4 11.6-4 1.3 0 2.8.2 4.7.6 1.9.4 3.3.8 4.3 1.2L680.9 8c-2.4-.9-4.6-1.4-6.6-1.4-2.8 0-4.9.8-6.4 2.3-1.5 1.5-2.7 4.4-3.6 8.5l-1.2 5.2h11.4l-1.2 6.1H662l-11.1 52.6c-1.2 6-3.2 10.4-5.7 13.2-2.6 2.7-6 4.1-10.2 4.1zM689.3 76c-5.9 0-10.5-1.7-13.8-5.2-3.4-3.5-5-8.3-5-14.5 0-6 1.2-11.8 3.6-17.3 2.4-5.5 5.5-9.8 9.5-12.9 3.9-3.1 8.3-4.6 13-4.6 4.9 0 8.6 1.1 11 3.2 2.5 2.1 3.7 5.1 3.7 8.9 0 5.7-2.7 10.3-8 13.5-5.3 3.3-12.9 4.9-22.8 4.9h-1.6l-.2 3.8c0 4.2 1 7.4 2.9 9.8 2 2.3 5 3.5 9.1 3.5 2 0 4.1-.3 6.2-.9 2.1-.6 4.8-1.6 7.9-3.2v7c-3 1.4-5.7 2.4-8 2.9-2.2.8-4.7 1.1-7.5 1.1zm6.7-47.5c-3.3 0-6.4 1.5-9.3 4.5-2.9 3-5.1 7.2-6.6 12.5h.6c7.3 0 12.9-1 16.7-2.9 3.9-1.9 5.8-4.7 5.8-8.3 0-1.7-.6-3.1-1.7-4.2-1.2-1.1-3-1.6-5.5-1.6z" fill="#1C9ED9"></path>
        </svg>

        {mdUp && (
          <StyledSection>
           {
            loginCalled?(<></>):( <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>)
           }
            <img src={loginImage} alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Prime Life Insurance
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
               <Link   variant="subtitle2"> <Link to='/signup'> <span style={{  color: "blue", textDecoration: "underline",textDecorationColor: "",cursor: "pointer",}}>Get started</span></Link></Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
              <svg style={{width:22,height:22}}  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
              <svg style={{width:22,height:22}} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
<path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
</svg>
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
