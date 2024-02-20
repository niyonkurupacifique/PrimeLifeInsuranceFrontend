import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';
import { useContext } from 'react';
import { OpenModalContext } from 'src/pages/context';
import LoginPage from 'src/pages/LoginPage';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const{loginCalled}=useContext(OpenModalContext) 
  return (
    
   <>

{
  loginCalled && (
    <>
      <div className="fixed inset-0  w-full bg-black bg-opacity-50  z-30"></div>
      <div className="fixed inset-0 flex items-center justify-center  z-40"> 
        <div className="bg-white w-full max-sm:pl-3 max-sm:mt-5  pl-40 rounded-lg">
          <LoginPage />  
        </div>
      </div>
    </>
  )
}
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
    </>
  );
}
