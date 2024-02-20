import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useContext } from 'react';
import { OpenModalContext } from '../context';
 import { Typography } from '@mui/material';

 import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';



import { Link } from 'react-router-dom';
export default function TemporaryDrawer({ openTopDrawer, setOpenTopDrawer }) {
    const[mouseIsOver,setMouseIsOver]=useState(false)
  const[mouseIsOver2,setMouseIsOver2]=useState(false)
  const[mouseIsOver1,setMouseIsOver1]=useState(false)
  const{setLoginCalled}=useContext(OpenModalContext)
  const{setLoginFromHeader}=useContext(OpenModalContext) 
  const{istokenIsActive}=useContext(OpenModalContext)
  const{setMyPoliciesButtonClicked}=useContext(OpenModalContext)
   const names=sessionStorage.getItem('names')
   const name=names
   const nameToUse=name
   const{setIsTokenActive}=useContext(OpenModalContext)
   const [open, setOpen] = React.useState(false);
   const anchorRef = React.useRef(null);
   const handleToggle = () => {
     setOpen((prevOpen) => !prevOpen);
     logout()
   };
 
   const handleClose = (event) => {
     if (anchorRef.current && anchorRef.current.contains(event.target)) {
       return;
     }
 
     setOpen(false);
     setMyPoliciesButtonClicked(true)
   };
 
   function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);


   function logout() {
  
    localStorage.removeItem('token');
    setIsTokenActive(false)
    setMyPoliciesButtonClicked(false)
  }
  // console.log(istokenIsActive)

  const handleMouseOver=()=>{
    // console.log("mouse is over")
    setMouseIsOver(true)
  }
  const handleMouseOver1=()=>{
    // console.log("mouse is over")
    setMouseIsOver1(true)
  }
  const handleMouseOver2=()=>{
    // console.log("mouse is over")
    setMouseIsOver2(true)
  }

  const handleMouseOut=()=>{
    setMouseIsOver(false)
  }
  const handleMouseOut1=()=>{
    setMouseIsOver1(false)
  }
  const handleMouseOut2=()=>{
    setMouseIsOver2(false)
  }
  const [state, setState] = useState({
    top: false,
  });

  useEffect(() => {
    setState({ ...state, top: openTopDrawer });
  }, [openTopDrawer]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
    if(istokenIsActive===true){
      setOpenTopDrawer(open);
    }
    setOpenTopDrawer(false); // Update the openTopDrawer state
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, openTopDrawer)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Your list items go here */}
      
      <div style={{backgroundColor:"#EBEBEB"}} className=" pt-3    space-y-4">
        <div className="flex max-sm:ml-4  border-b-2 border-gray-700  border-dashed     items-center" style={{ whiteSpace: "nowrap" }}> {/* Use 'items-center' to vertically center children */}
       <Link to="https://prime.rw/life-insurance/about-life-insurance/about-us"> <div> <button    style={{fontStyle:"normal", fontFamily: 'Open Sans, sans-serif',fontWeight:200,fontSize:20}} className=" text-dropdownTextColor family">
            <Typography className=' pb-4' variant="h5" >
         Life
         Insurance
        </Typography>
          </button> </div></Link>
         
        </div>
        <div className="flex ml-3 border-b-2 border-gray-700  border-dashed  items-center" style={{ whiteSpace: "nowrap" }}> {/* Use 'items-center' to vertically center children */}
        <Link to="https://prime.rw/general-insurance/about-general-insurance/about-us"> <button   style={{fontStyle:"normal", fontFamily: 'Open Sans, sans-serif',fontWeight:200,fontSize:20}} className=" text-dropdownTextColor family">
           
         <Typography className=' pb-4' variant="h5" >
         General
         Insurance
        </Typography>
          </button></Link> 
        
        </div>
       
        <div className=" border-b-2 border-gray-700  border-dashed  ml-3 flex items-center"> {/* Use 'items-center' to vertically center children */}
        <Link to="https://prime.rw/news">  <button style={{fontStyle:"normal", fontFamily: 'Open Sans, sans-serif',fontWeight:200,fontSize:20}} className=" text-dropdownTextColor family">
          
          <Typography className=' pb-4' variant="h5" >
          News
        </Typography>
          
          </button></Link>
        </div>
        <div className="flex border-b-2 border-gray-700  border-dashed  ml-2  pb-5  items-center" style={{ whiteSpace: "nowrap" }}> {/* Use 'items-center' to vertically center children */}
        <Link to="https://prime.rw/careers"> <button  style={{fontStyle:"normal", fontFamily: 'Open Sans, sans-serif',fontWeight:200,fontSize:20}} className=" text-dropdownTextColor family">
           
            <Typography variant="h5" >
            Careers
        </Typography>
          
          </button></Link> 
         
        </div>
       {
        istokenIsActive?(<Stack direction="row" spacing={2}>
         
        <div>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}  
           
          >
            Logout
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            color="black"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
              
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>):( <div     className="flex border-b-2 border-gray-700  border-dashed  ml-2  pb-5  items-center" style={{ whiteSpace: "nowrap" }}> {/* Use 'items-center' to vertically center children */}
        <button  onClick={()=>{setLoginCalled(true);setLoginFromHeader(true);setOpenTopDrawer(false)} } style={{fontStyle:"normal", fontFamily: 'Open Sans, sans-serif',fontWeight:200,fontSize:20}} className=" text-dropdownTextColor family">
           
            <Typography  variant="h5" >
            Login
        </Typography>
          
          </button>
         
        </div>)
       }
        

        <div  className=" flex  ">
      <Link to="https://prime.rw/contact-us"><div className="flex items-center hover:bg-xxColor  bg-xColor border"> {/* Use 'items-center' to vertically center children */}
        <div className=" p-7 px-10 ">
      <div onMouseOver={handleMouseOver1} onMouseOut={handleMouseOut1} > {mouseIsOver1?(<svg  id="email-svg" className="" xmlns="http://www.w3.org/2000/svg" width="26.6" height="26.9" viewBox="0 0 33.6 32.9">
    <path fill="#159FDB" stroke="#159fdb" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="22.926" d="M1 32h31.7V12.6L16.8 1 1 12.6V32z"></path>
    <path fill="#159FDB" stroke="#159fdb" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="22.926" d="M32.7 32L16.8 19 1 32m.3-18.9l11.5 8.7m19.5-8.7l-11.5 8.7"></path>
       </svg>):(<svg  id="email-svg" className="" xmlns="http://www.w3.org/2000/svg" width="26.6" height="26.9" viewBox="0 0 33.6 32.9">
    <path fill="#fff" stroke="#159fdb" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="22.926" d="M1 32h31.7V12.6L16.8 1 1 12.6V32z"></path>
    <path fill="#fff" stroke="#159fdb" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="22.926" d="M32.7 32L16.8 19 1 32m.3-18.9l11.5 8.7m19.5-8.7l-11.5 8.7"></path>
       </svg>)}</div>
       </div>
        </div></Link>
        <div className="flex hover:bg-xxColor bg-xColor  border"> {/* Use 'items-center' to vertically center children */}
        <div className=" p-7 px-10">
       <div  onMouseOver={handleMouseOver2}  onMouseOut={handleMouseOut2} > {  mouseIsOver2?(
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="26.6" height="26.9" viewBox="0 0 209.000000 242.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,242.000000) scale(0.100000,-0.100000)"
fill="green" stroke="none" id="language">
<path d="M1770 2390 c-47 -16 -242 -82 -435 -148 l-350 -119 -375 133 c-206
74 -375 134 -375 134 0 0 1 -116 3 -257 l3 -258 -118 -40 c-90 -30 -119 -45
-122 -59 -2 -13 1 -17 10 -14 12 5 14 -109 11 -690 -1 -460 1 -699 8 -706 17
-17 11 -29 -10 -23 -22 6 -27 -12 -9 -30 8 -8 154 37 522 160 l512 170 460
-147 c253 -81 486 -156 518 -166 l57 -19 0 728 0 728 -96 29 -95 29 1 284 c1
271 -3 313 -29 310 -3 0 -44 -13 -91 -29z m70 -291 c0 -245 -1 -261 -17 -254
-10 4 -182 59 -383 123 -201 63 -368 118 -372 121 -5 5 729 264 765 270 4 0 7
-116 7 -260z m-1215 118 c176 -62 319 -117 318 -122 -1 -8 -678 -238 -678
-232 0 1 1 109 3 240 2 220 4 238 20 233 9 -3 161 -57 337 -119z m414 -114
c-6 -39 -4 -40 264 -124 122 -38 289 -92 372 -118 106 -35 155 -47 167 -40 12
7 20 5 26 -8 5 -9 47 -28 93 -43 l84 -28 3 -694 2 -695 -497 158 c-274 88
-505 159 -513 159 -13 0 -15 83 -13 696 2 525 0 701 -9 711 -9 11 -9 17 3 24
17 11 19 11 18 2z m-39 -727 l0 -694 -468 -156 c-257 -86 -470 -156 -475 -156
-4 0 -7 312 -7 694 l0 694 463 155 c254 86 468 156 475 156 9 1 12 -144 12
-693z"/>
<path d="M1477 1693 c-20 -23 -297 -703 -297 -730 0 -28 14 -38 93 -61 l67
-20 18 23 c10 13 27 44 36 69 19 48 25 52 72 36 16 -5 67 -20 114 -34 l86 -26
19 -76 c10 -42 26 -85 35 -95 8 -10 46 -27 84 -38 74 -23 96 -18 96 21 0 19
-220 821 -239 871 -12 31 -22 37 -91 59 -69 22 -73 22 -93 1z m112 -38 c19 -6
39 -18 43 -26 8 -14 248 -872 245 -876 -1 -1 -34 9 -72 21 l-69 22 -24 91 -24
90 -140 42 c-77 23 -143 40 -146 36 -4 -4 -19 -37 -34 -73 -17 -43 -31 -66
-40 -63 -7 2 -38 11 -68 19 -30 9 -56 17 -58 18 -2 1 63 164 144 363 l148 362
30 -7 c17 -4 46 -12 65 -19z"/>
<path d="M1510 1328 c-25 -61 -45 -116 -45 -121 0 -6 39 -22 88 -37 48 -15 87
-26 87 -24 0 6 -80 287 -83 290 -1 1 -22 -47 -47 -108z m63 -48 c23 -82 22
-93 -5 -84 -48 14 -68 24 -68 31 0 15 44 113 50 113 4 0 14 -27 23 -60z"/>
<path d="M485 1618 c-34 -11 -74 -17 -92 -14 l-33 5 15 -29 c32 -62 94 -76
172 -40 68 30 86 101 26 99 -15 -1 -55 -10 -88 -21z m93 -20 c-7 -19 -71 -48
-109 -48 -61 0 -53 13 23 36 87 27 91 27 86 12z"/>
<path d="M682 1500 c-91 -43 -333 -125 -400 -136 -46 -7 -52 -21 -23 -48 33
-30 131 -21 131 12 0 15 97 50 246 88 19 5 12 -14 -50 -133 -87 -170 -230
-375 -350 -502 l-41 -44 30 7 c48 10 233 218 336 375 l15 24 68 -51 c56 -43
218 -132 241 -132 10 0 -6 64 -19 76 -6 6 -69 35 -141 64 -71 30 -132 55 -133
56 -2 1 19 41 47 89 81 136 132 245 129 270 l-3 24 -83 -39z m-2 -128 c-84
-157 -113 -187 -39 -41 38 76 39 82 24 99 -16 18 -15 20 22 38 21 11 40 16 41
11 2 -5 -20 -53 -48 -107z m-320 -32 c0 -5 -12 -10 -27 -9 -25 0 -26 1 -8 9
27 12 35 12 35 0z"/>
<path d="M1480 304 c0 -3 13 -25 30 -49 l30 -44 -53 -29 c-291 -165 -620 -171
-935 -15 -85 42 -116 53 -125 44 -20 -20 5 -43 89 -86 161 -82 303 -115 494
-115 190 0 328 34 485 118 l71 39 26 -44 25 -45 36 102 c21 56 37 103 37 105
0 4 -56 12 -147 19 -35 3 -63 3 -63 0z m165 -61 c-3 -15 -13 -43 -21 -62 -14
-35 -15 -35 -30 -13 -8 12 -21 22 -29 22 -9 0 -12 6 -9 15 4 8 -1 26 -10 40
l-16 25 61 0 61 0 -7 -27z"/>
</g>
</svg>
):(
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="26.6" height="26.9" viewBox="0 0 209.000000 242.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,242.000000) scale(0.100000,-0.100000)"
fill="white" stroke="none" id="language">
<path d="M1770 2390 c-47 -16 -242 -82 -435 -148 l-350 -119 -375 133 c-206
74 -375 134 -375 134 0 0 1 -116 3 -257 l3 -258 -118 -40 c-90 -30 -119 -45
-122 -59 -2 -13 1 -17 10 -14 12 5 14 -109 11 -690 -1 -460 1 -699 8 -706 17
-17 11 -29 -10 -23 -22 6 -27 -12 -9 -30 8 -8 154 37 522 160 l512 170 460
-147 c253 -81 486 -156 518 -166 l57 -19 0 728 0 728 -96 29 -95 29 1 284 c1
271 -3 313 -29 310 -3 0 -44 -13 -91 -29z m70 -291 c0 -245 -1 -261 -17 -254
-10 4 -182 59 -383 123 -201 63 -368 118 -372 121 -5 5 729 264 765 270 4 0 7
-116 7 -260z m-1215 118 c176 -62 319 -117 318 -122 -1 -8 -678 -238 -678
-232 0 1 1 109 3 240 2 220 4 238 20 233 9 -3 161 -57 337 -119z m414 -114
c-6 -39 -4 -40 264 -124 122 -38 289 -92 372 -118 106 -35 155 -47 167 -40 12
7 20 5 26 -8 5 -9 47 -28 93 -43 l84 -28 3 -694 2 -695 -497 158 c-274 88
-505 159 -513 159 -13 0 -15 83 -13 696 2 525 0 701 -9 711 -9 11 -9 17 3 24
17 11 19 11 18 2z m-39 -727 l0 -694 -468 -156 c-257 -86 -470 -156 -475 -156
-4 0 -7 312 -7 694 l0 694 463 155 c254 86 468 156 475 156 9 1 12 -144 12
-693z"/>
<path d="M1477 1693 c-20 -23 -297 -703 -297 -730 0 -28 14 -38 93 -61 l67
-20 18 23 c10 13 27 44 36 69 19 48 25 52 72 36 16 -5 67 -20 114 -34 l86 -26
19 -76 c10 -42 26 -85 35 -95 8 -10 46 -27 84 -38 74 -23 96 -18 96 21 0 19
-220 821 -239 871 -12 31 -22 37 -91 59 -69 22 -73 22 -93 1z m112 -38 c19 -6
39 -18 43 -26 8 -14 248 -872 245 -876 -1 -1 -34 9 -72 21 l-69 22 -24 91 -24
90 -140 42 c-77 23 -143 40 -146 36 -4 -4 -19 -37 -34 -73 -17 -43 -31 -66
-40 -63 -7 2 -38 11 -68 19 -30 9 -56 17 -58 18 -2 1 63 164 144 363 l148 362
30 -7 c17 -4 46 -12 65 -19z"/>
<path d="M1510 1328 c-25 -61 -45 -116 -45 -121 0 -6 39 -22 88 -37 48 -15 87
-26 87 -24 0 6 -80 287 -83 290 -1 1 -22 -47 -47 -108z m63 -48 c23 -82 22
-93 -5 -84 -48 14 -68 24 -68 31 0 15 44 113 50 113 4 0 14 -27 23 -60z"/>
<path d="M485 1618 c-34 -11 -74 -17 -92 -14 l-33 5 15 -29 c32 -62 94 -76
172 -40 68 30 86 101 26 99 -15 -1 -55 -10 -88 -21z m93 -20 c-7 -19 -71 -48
-109 -48 -61 0 -53 13 23 36 87 27 91 27 86 12z"/>
<path d="M682 1500 c-91 -43 -333 -125 -400 -136 -46 -7 -52 -21 -23 -48 33
-30 131 -21 131 12 0 15 97 50 246 88 19 5 12 -14 -50 -133 -87 -170 -230
-375 -350 -502 l-41 -44 30 7 c48 10 233 218 336 375 l15 24 68 -51 c56 -43
218 -132 241 -132 10 0 -6 64 -19 76 -6 6 -69 35 -141 64 -71 30 -132 55 -133
56 -2 1 19 41 47 89 81 136 132 245 129 270 l-3 24 -83 -39z m-2 -128 c-84
-157 -113 -187 -39 -41 38 76 39 82 24 99 -16 18 -15 20 22 38 21 11 40 16 41
11 2 -5 -20 -53 -48 -107z m-320 -32 c0 -5 -12 -10 -27 -9 -25 0 -26 1 -8 9
27 12 35 12 35 0z"/>
<path d="M1480 304 c0 -3 13 -25 30 -49 l30 -44 -53 -29 c-291 -165 -620 -171
-935 -15 -85 42 -116 53 -125 44 -20 -20 5 -43 89 -86 161 -82 303 -115 494
-115 190 0 328 34 485 118 l71 39 26 -44 25 -45 36 102 c21 56 37 103 37 105
0 4 -56 12 -147 19 -35 3 -63 3 -63 0z m165 -61 c-3 -15 -13 -43 -21 -62 -14
-35 -15 -35 -30 -13 -8 12 -21 22 -29 22 -9 0 -12 6 -9 15 4 8 -1 26 -10 40
l-16 25 61 0 61 0 -7 -27z"/>
</g>
</svg>
)}</div>
       </div>
        </div>
       
      </div>
        </div>


    </Box>
  );

  return (
    <div className=' sm:hidden'>
      {/* Drawer component */}
      <Drawer  style={{ marginTop: '50px !important' }} anchor="top" open={state.top}  onClose={toggleDrawer('top', false)}>
        {list('top')}
      </Drawer>
    </div>
  );
}
