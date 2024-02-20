import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
 import { useState } from 'react';
import { useEffect } from 'react';
import familyPhoto from './pagesComponentsFolder/Images/family.png'
import employeePhoto from './pagesComponentsFolder/Images/employee.png'
import educationPhoto from './pagesComponentsFolder/Images/education.png'
import loanPhoto from './pagesComponentsFolder/Images/loan.png'
import EmployerProtection from './pagesComponentsFolder/employeeProtection';
const spanStyle = {
  // padding: '20px',
  // background: '#efefef',
  color: 'white',
  fontFamily: 'Arial, sans-serif',
  fontSize: '30px',
  fontWeight: '300',
  paddingLeft: '40%',
  whiteSpace: 'pre-line', // Add this property to preserve line breaks

};

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '80vh', // Set the height to 100% of the viewport height
  margin: '0',
  overflow: 'hidden',
};

const imgStyle = {
  width: '20%',
  
  objectFit: 'cover', // Maintain aspect ratio while covering the entire container
};



const slideImages = [
  {
    url: 'https://prime.rw/public/themes/assets/img/slides/slider-1_.jpg',
    caption: 'Protect your family\n, your business\n and possessions with confidence',
  },
  {
    url: 'https://prime.rw/public/themes/assets/img/slides/slider-2_.jpg',
    caption: 'Plan your tomorrow today\n with the most reliable\n insurance\n company in Rwanda',
  },
  {
    url: 'https://prime.rw/public/themes/assets/img/slides/prime_customer_chart-01.jpg',
    caption: '',
  },
];

const Slideshow = () => {


  const[isSmallsCreen,setisSmallsCreen]=useState(false);
  const [isIsNotSmallScreen, setIsNotSmallScreen] = useState(false);
  const [isMiddleScreen, setIsMiddleScreen]=useState(false)
  


  const handleResize = () => {
    setisSmallsCreen(window.innerWidth <= 600);
    setIsNotSmallScreen(window.innerWidth > 1150);
    setIsMiddleScreen(window.innerWidth > 600 && window.innerWidth <= 1150);
  };
  

  useEffect(() => {
    // Update the state based on the screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
    <div className='flex w-full justify-between space-x-5 px-6 mt-12'>
    <div className=' pr-20 animate__animated animate__backInLeft'>
      <img style={{width:180}} src="https://apps.prime.rw/customerportal/images/family.png" alt="" />
    </div>
     <div className=' pr-20 animate__animated animate__zoomIn '>
     <img style={{width:180}} src="https://apps.prime.rw/customerportal/images/employee.png" alt="" />
     </div>
      <div className=' pr-20 animate__animated animate__backInLeft'>
      <img style={{width:180}} src="https://apps.prime.rw/customerportal/images/education.png" alt="" />
      </div>
      <div className=' pr-20  animate__animated animate__zoomIn'>
      <img style={{width:180}} src="https://apps.prime.rw/customerportal/images/loan.png" alt="" />
      </div>
      </div>
    
    </div>
   
  );
};

export default Slideshow;
