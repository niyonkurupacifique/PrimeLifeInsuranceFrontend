import React, { useEffect, useState } from "react";
import back from './Images/back.png'
import { useToast } from '@chakra-ui/react'
import { Toast } from "@chakra-ui/react";
import checked1 from './Images/checked1.png'
import checked2  from './Images/checked2.png'
import creditcardIamge from './Images/mastercard.png'
import mtnLogo from './Images/MTN.png'
import airtelLogo from './Images/airtel.png'
import payPalLogo from './Images/PAYPAL.png'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Zoom } from 'react-swift-reveal';
import banner from './Images/PRIME-Banner.gif'
import { IoClose } from "react-icons/io5";

import { OpenModalContext } from "../context";
import { useContext } from "react";
 import { Links, Container, Typography, Divider, Stack, Button } from '@mui/material';
const PaymentPage=()=>{
  const navigate=useNavigate(Navigate)
  const[checked,setChecked]=useState(false)
  const[airtelChecked,setAirtelChecked]=useState(false)
  const[paypalChecked,setPaypalChecked]=useState(false)
  const[mobileMoneyChecked,setMobileMoneyChecked]=useState(false)
  const[myProperty,setMyProperty]=useState([])
  const[phonenumberr,setPhoneNumber]=useState(null)
  const[showMessage,setShowMessage]=useState(true)
  const[paymentType,setPaymentType]=useState("") 
  const[proposalNumber,setProposalNumber]=useState("")

  const{token}=useContext(OpenModalContext)
  // console.log("token from context is ",token)

    ////////////detect small screen using window




    const [isIsNotSmallScreen, setIsNotSmallScreen] = useState(false);
    const[isSmallsCreen,setisSmallsCreen]=useState(false);
    const handleResize = () => {
      setIsNotSmallScreen(window.innerWidth>600);
      setisSmallsCreen(window.innerWidth<=600)
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







    //////////////////////////////////////////


  const now = new Date();
const offset = now.getTimezoneOffset();
now.setMinutes(now.getMinutes() - offset);

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthName = months[now.getMonth()];
const formattedDate = now.toISOString().slice(0, 19).replace('T', ' '); // Format as YYYY-MM-DD HH:MM:SS
//  console.log("now is",formattedDate)

      //get items
      const insuranceName=localStorage.getItem("insuranceName")
      const maritalStatus = localStorage.getItem('maritalStatus');
const SelectedCategoryType = localStorage.getItem('SelectedCategoryType');
const numberOfdirectParent = parseInt(localStorage.getItem('numberOfdirectParent'), 10);
const numberOfdirectParentInLaw=parseInt(localStorage.getItem('numberOfdirectParentInLaw'),10)
const premiumFrequency = localStorage.getItem('premiumFrequency');
const numberOfchildren = parseInt(localStorage.getItem('numberOfchildren'), 10);
const riskPremium = parseFloat(localStorage.getItem('riskPremium'));
const AnnualRiskPremium = parseFloat(localStorage.getItem('AnnualRiskPremium'));
const MonthlyMinSavings = parseFloat(localStorage.getItem('MonthlyMinSavings'));
const AnnualyMinSavings = parseFloat(localStorage.getItem('AnnualyMinSavings'));
const riskPremiumMonthlyMinSavings =localStorage.getItem('riskPremiumMonthlyMinSavings');
const AnnualRiskPremiumAnnualyMinSavings = localStorage.getItem('AnnualRiskPremiumAnnualyMinSavings');
const premium=localStorage.getItem('premium');
  const userName=localStorage.getItem("usernamee")
  const numericPart = userName.replace(/\D/g, ''); // Extract numeric part
const fromValue = '25' + numericPart;
   const {names}=useContext(OpenModalContext)
  //  const {nationalId}=useContext(OpenModalContext)
   const nationalId=sessionStorage.getItem("nationalId")
  // console.log("premium from localstorage is",riskPremiumMonthlyMinSavings)
  // console.log(" Annual premium from localstorage is",AnnualRiskPremiumAnnualyMinSavings)
  // console.log("buyer are :",names)
  
  // console.log("buyer national id are :",nationalId)

  const isSingle = maritalStatus === 'Single';


   //making customer code 

   function translateNationalIdToCustomerCode(nationalId) {
    
    if (nationalId && typeof nationalId === 'string' && nationalId.length === 16) {
      
      const extractedPart = nationalId.slice(0, 13);
  
      const customerCode = `C${extractedPart}`;
  
      return customerCode;
    } else {
    
      console.error('Invalid national ID format',nationalId);
      return null;
    }
  }

 
  const customerCode = translateNationalIdToCustomerCode(nationalId);
  
  if (customerCode) {
    // console.log('Customer Code:', customerCode);
  } else {
    console.log('Failed to generate Customer Code');
  }
  

   ////////////////////////////////////////////////



  const toast = useToast()
  const [loading, setLoading] = useState(false);
 
   const handleChecked=()=>{
    setChecked(true)
    setPaymentType("Credit card")
    setShowMessage(false)
    setPaypalChecked(false);setAirtelChecked(false);setMobileMoneyChecked(false)
    // console.log(!checked)
   }

  
   
const generateRandomTransactionId = (length) => {
  const characters = '0123456789abcdef';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};
const randomTransactionId = generateRandomTransactionId(32); 

//  console.log('Random Transaction ID:', randomTransactionId);


const generateExternalId = () => {
  const timestamp = new Date().getTime();
  const randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `W${timestamp}${randomDigits}`;
};

const externalId = generateExternalId();


 ///// momo api /////////////////////



    const PaymentUsingMomo=async(e)=>{

     

      const loadingToastId = toast({
        title: 'Making Payment',
        description: 'Please wait...',
        status: 'loading',
        position: 'top',
        duration: null, 
      });
     
      try {
       
        const response = await fetch('https://apps.prime.rw/onlineservicesapi/digitalservices/momorequestlife', {
        
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              "from":fromValue,
              "amount":premium, 
              "externalId":externalId,
              "fromMsg":userName,
              "ToMsg":"Prime life Insurance",
              "referenceId":externalId,
              "product":"Akabando",
              "PolicyNumber":externalId,
          }
          ),
        });
    
        if (response.ok) {
         const response2=await response.json()
          toast({
            title:response2.status,
            description:'please Check your phone and process payment',
            position: 'top',
            status: 'success',
            duration: 10000, 
          });
          navigate("/Home/products")
    
        } else {
         
          const result2=await response.json()
          toast({
            title:result2.status,
            description:"failled to process payment please contact prime life for support",
            position: 'top',
            status: 'error',
            duration: 3000, 
          });
        }
      } catch (error) {
        console.error('payment error:', error);
        toast({
          title: ' failed to process payment',
          description: 'There was an error during payment processing. Please try again.',
          position: 'top',
          status: 'error',
          duration: 3000, 
        });
      } finally {
        // Close the loading toast
        toast.close(loadingToastId);
      }
    



    }



 //////////////////////////////////////
  




 const  HandleRequestPayment= async (event) => {

  console.log("from value is",fromValue)
    event.preventDefault();

  const loadingToastId = toast({
    title: 'Making Payment',
    description: 'Please wait...',
    status: 'loading',
    position: 'top',
    duration: null, 
  });
 
  try {
   
    const response = await fetch('https://apps.prime.rw/customerbackend/api/proposal/family', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        { "proposalNumber":externalId,
          "productCategory":SelectedCategoryType,
          "customerCode":customerCode, 
          "frequency":premiumFrequency,
          "paymentMode": "MoMo",
          "isSingle":isSingle,
          "numberOfParents":numberOfdirectParent,
          "numberOfInLaws":numberOfdirectParentInLaw,
          "numberOfKids":numberOfchildren,
          "payerPhone":userName
      }
      ),
    });

    if (response.ok) {
     PaymentUsingMomo()
     const textResponse = await response.text();
     setProposalNumber(textResponse)
    //  console.log("textResponse",textResponse)
      toast({
        title: 'proposal registered successful',
        // description: `You payed ${monthName}  ${insuranceName}!`,
        position: 'top',
        status: 'success',
        duration: 10000, 
      });
      // navigate("/userdashboard")

    } else {
     
      const result2 = await response.text();

      toast({
        title: ' failed to register proposal please contact prime life insurance for support',
        description:result2.errorMessage,
        position: 'top',
        status: 'error',
        duration: 3000, 
      });
    }
  } catch (error) {
    console.error('payment error:', error);
    toast({
      title: ' failed to register proposal',
      description: 'There was an error during registering proposal. Please try again.',
      position: 'top',
      status: 'error',
      duration: 3000, 
    });
  } finally {
    // Close the loading toast
    toast.close(loadingToastId);
  }

}

  



    return(
        <div className=" h-full  pl-32">
            <div className=" ml-10 max-sm:ml-0 max-sm:mr-14 mt-5">
            <svg onClick={()=>{navigate("/")}}  className="max-sm:w-40 max-sm:left-36 fixed left-40" xmlns="http://www.w3.org/2000/svg" width="200.2" height="90.2" viewBox="0 0 711.2 139.2">
          <path fill="#1C9ED9" d="M522.8 75.1V5h41.1v11.4h-26.6v17.4h25.4v11h-25.4v18.7h26.6v11.6zM215.9 52.2h-6.2v23h-14.5V5.1l22.9-.3c8.9 0 15.7 2 20.6 5.9 4.8 3.9 7.3 9.4 7.3 16.6 0 7.6-2.8 13.6-8.3 18.1-5.6 4.5-12.8 6.8-21.8 6.8zm.9-35.8h-7.1v23.9c.6.2 1.6.3 2.8.4 1.2.1 2.4.1 3.4.1 4.7 0 8.2-1.1 10.8-3.2 2.5-2.1 3.8-5.2 3.8-9.4 0-3.6-1.2-6.5-3.5-8.6-2.4-2.1-5.8-3.2-10.2-3.2zm89.3 58.8l-20-28.8h-.7v28.8h-14.5v-70c4.6 0 8.7 0 12.4-.1 3.7-.1 7.2-.2 10.4-.3 8.4 0 14.9 1.6 19.5 4.9 4.6 3.3 6.9 8.1 6.9 14.5 0 5.5-1.7 10-5.2 13.4-3.5 3.5-8.1 5.7-13.8 6.6l5.6 7.5L324 75.1l-17.9.1zM291.5 16h-6.2v20.4l6.7.3c3.9 0 6.9-1 9.2-3 2.3-2 3.4-4.7 3.4-8 0-3.1-1.1-5.5-3.4-7.2-2.2-1.7-5.5-2.5-9.7-2.5zM481 75.2l-5.3-36.6-2-16.1c-.4 1.8-1 4-1.7 6.6-.7 2.6-1.3 4.8-1.8 6.6L457 75.2h-15.3l-11.9-36.7c-1-3-1.9-5.8-2.5-8.3-.7-2.5-1.3-5.1-1.9-7.6-.1 2.4-.3 5.1-.7 8.1-.4 3-.8 6-1.1 8.9l-4.7 35.8h-14.4l10.8-70.1h18.2l13 39.4c.4 1.4 1.1 3.6 1.9 6.6.8 3 1.3 5.2 1.6 6.6.6-2.4 1.2-4.5 1.7-6.2.5-1.8 1.2-3.9 2.1-6.5L467 5.1h18.7l10.5 70.1H481zM358.5 5.1v.1h-.1V17h.1v58.2H373V5.1z">
          </path>
          <path fill="#FFF" d="M60.4 16.9L33 122.7h74.7l29.6-36.2 17.6-62-28.6-14.2z"></path>
          <path fill="#F8D209" d="M182.6 5H47.4L0 138.4h135.1L182.6 5zM43.3 116.6l32-86.4H99l-32 86.4H43.3zM97 91.4l22.6-61.2h23.7l-22.6 61.2H97z">
          </path>
          <path d="M201.6 89.4v49h-6.3v-49h6.3zm11.5 23.3c0-3.6-.1-6.6-.3-9.5h5.7l.4 5.8h.1c1.7-3.3 5.8-6.6 11.6-6.6 4.9 0 12.4 2.9 12.4 15v21h-6.4v-20.3c0-5.7-2.1-10.4-8.1-10.4-4.2 0-7.5 3-8.6 6.5-.3.8-.4 1.9-.4 3v21.1h-6.4v-25.6zm39.5 19.1c1.9 1.2 5.2 2.5 8.4 2.5 4.6 0 6.8-2.3 6.8-5.2 0-3.1-1.8-4.7-6.5-6.5-6.3-2.3-9.3-5.7-9.3-10 0-5.7 4.6-10.3 12.1-10.3 3.6 0 6.7 1 8.6 2.2l-1.6 4.7c-1.4-.9-3.9-2-7.2-2-3.8 0-5.9 2.2-5.9 4.8 0 2.9 2.1 4.2 6.7 6 6.1 2.3 9.2 5.4 9.2 10.6 0 6.2-4.8 10.5-13.2 10.5-3.9 0-7.4-.9-9.9-2.4l1.8-4.9zm59-3c0 3.6.1 6.8.3 9.6h-5.7l-.4-5.7h-.1c-1.7 2.8-5.4 6.5-11.6 6.5-5.5 0-12.1-3.1-12.1-15.4v-20.6h6.4v19.5c0 6.7 2 11.2 7.8 11.2 4.3 0 7.3-3 8.4-5.8.4-.9.6-2.1.6-3.3v-21.6h6.4v25.6zm10.6-14.6c0-4.1-.1-7.7-.3-11h5.6l.2 6.9h.3c1.6-4.7 5.4-7.7 9.7-7.7.7 0 1.2.1 1.8.2v6c-.7-.1-1.3-.2-2.2-.2-4.5 0-7.7 3.4-8.6 8.2-.1.9-.3 1.9-.3 3v18.7h-6.3v-24.1zm42.9 24.2l-.5-4.4h-.2c-2 2.8-5.7 5.2-10.8 5.2-7.1 0-10.8-5-10.8-10.1 0-8.5 7.6-13.2 21.1-13.1v-.7c0-2.9-.8-8.1-8-8.1-3.3 0-6.7 1-9.2 2.6l-1.5-4.2c2.9-1.9 7.1-3.1 11.6-3.1 10.8 0 13.4 7.3 13.4 14.4V130c0 3.1.1 6 .6 8.4h-5.7zm-.9-18c-7-.1-14.9 1.1-14.9 7.9 0 4.1 2.8 6.1 6 6.1 4.6 0 7.5-2.9 8.5-5.9.2-.7.4-1.4.4-2v-6.1zm16.4-7.7c0-3.6-.1-6.6-.3-9.5h5.7l.4 5.8h.1c1.7-3.3 5.8-6.6 11.6-6.6 4.9 0 12.4 2.9 12.4 15v21h-6.4v-20.3c0-5.7-2.1-10.4-8.1-10.4-4.2 0-7.5 3-8.6 6.5-.3.8-.4 1.9-.4 3v21.1h-6.4v-25.6zM446 137c-1.7.9-5.4 2-10.1 2-10.6 0-17.5-7.2-17.5-17.9 0-10.8 7.4-18.7 18.9-18.7 3.8 0 7.1.9 8.9 1.8l-1.4 4.9c-1.5-.9-3.9-1.7-7.4-1.7-8.1 0-12.4 6-12.4 13.3 0 8.1 5.2 13.1 12.2 13.1 3.6 0 6-.9 7.9-1.7l.9 4.9zm10.6-15.1c.1 8.6 5.7 12.2 12.1 12.2 4.6 0 7.3-.8 9.7-1.8l1.1 4.6c-2.2 1-6.1 2.2-11.7 2.2-10.8 0-17.3-7.1-17.3-17.7s6.2-19 16.5-19c11.5 0 14.5 10.1 14.5 16.6 0 1.3-.1 2.3-.2 3h-24.7zm18.8-4.5c.1-4.1-1.7-10.4-8.9-10.4-6.5 0-9.3 6-9.8 10.4h18.7zm107.1-42.3l14.8-70h8.1l-13.2 62.7h27.1l-1.6 7.4h-35.2zm48.3 0h-8L634 22.6h8l-11.2 52.5zm5.4-66c0-1.8.5-3.2 1.5-4.4 1-1.1 2.3-1.7 4-1.7 2.8 0 4.2 1.4 4.2 4.3 0 1.8-.5 3.2-1.6 4.5-1.1 1.2-2.3 1.8-3.7 1.8-1.3 0-2.3-.4-3.2-1.2-.8-.7-1.2-1.8-1.2-3.3zM635 98.6c-2.2 0-4.2-.3-6-1v-6.8c2 .7 3.8 1.1 5.4 1.1 2.4 0 4.3-1 5.6-3 1.3-2 2.4-4.8 3.2-8.5L654 28.6h-9.2l.6-3.2 9.9-3.2 1.1-4.8c1.5-6.4 3.5-10.9 6.1-13.5 2.6-2.6 6.5-4 11.6-4 1.3 0 2.8.2 4.7.6 1.9.4 3.3.8 4.3 1.2L680.9 8c-2.4-.9-4.6-1.4-6.6-1.4-2.8 0-4.9.8-6.4 2.3-1.5 1.5-2.7 4.4-3.6 8.5l-1.2 5.2h11.4l-1.2 6.1H662l-11.1 52.6c-1.2 6-3.2 10.4-5.7 13.2-2.6 2.7-6 4.1-10.2 4.1zM689.3 76c-5.9 0-10.5-1.7-13.8-5.2-3.4-3.5-5-8.3-5-14.5 0-6 1.2-11.8 3.6-17.3 2.4-5.5 5.5-9.8 9.5-12.9 3.9-3.1 8.3-4.6 13-4.6 4.9 0 8.6 1.1 11 3.2 2.5 2.1 3.7 5.1 3.7 8.9 0 5.7-2.7 10.3-8 13.5-5.3 3.3-12.9 4.9-22.8 4.9h-1.6l-.2 3.8c0 4.2 1 7.4 2.9 9.8 2 2.3 5 3.5 9.1 3.5 2 0 4.1-.3 6.2-.9 2.1-.6 4.8-1.6 7.9-3.2v7c-3 1.4-5.7 2.4-8 2.9-2.2.8-4.7 1.1-7.5 1.1zm6.7-47.5c-3.3 0-6.4 1.5-9.3 4.5-2.9 3-5.1 7.2-6.6 12.5h.6c7.3 0 12.9-1 16.7-2.9 3.9-1.9 5.8-4.7 5.8-8.3 0-1.7-.6-3.1-1.7-4.2-1.2-1.1-3-1.6-5.5-1.6z" fill="#1C9ED9"></path>
        </svg>
        <div onClick={() => navigate(-1)} className="  top-24 absolute">
              <img src={back} alt="" />
            </div>
            </div>
           
            <div style={{left:"50%"}} className=" absolute ">
            <span className=" max-sm:hidden"  style={{color:'#16A0DB',fontFamily:"Poppins",fontSize:"30px",lineHeight:"45px"}}>Welcome {names}</span>
            </div>
            <div onClick={()=>{navigate("/login")}} className="ml-10 mt-5 max-sm:flex max-sm:justify-center">
            <img style={{width:"7%"}} className=" "  alt="" />
            </div>
             <div className=" flex max-sm:flex max-sm:flex-col max-sm:ml-0 max-sm:mr-14 max-sm:overflow-x-hidden ml-10 mt-14">
                <div className=" h-full mt-20">
                    <div className=" flex items-center">Choose  your Payment method!</div>
                    <div className=" space-y-4 mt-8">
                    <div>
                    <div class="flex items-center  w-full pl-4 border border-blue-500 rounded-lg dark:border-gray-700">
                    <img src={creditcardIamge}  name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     <label for="bordered-checkbox-2" class="w-full whitespace-nowrap  py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Credit Card</label>
   <div onClick={handleChecked}>
     {
        checked===true ? <img src={checked2} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>: <img src={checked1} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     }
    </div> 
   
              </div>
                    </div>
                    <div>
                    <div class="flex items-center  w-full pl-4 border border-blue-500 rounded-lg dark:border-gray-700">
                    <img src={airtelLogo}  name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     <label for="bordered-checkbox-2" class="w-full whitespace-nowrap py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Airtel Money</label>
   <div onClick={()=>{setAirtelChecked(true);setPaymentType("Airtel Money");setChecked(false);setShowMessage(false);setMobileMoneyChecked(false);setPaypalChecked(false)}}>
     {
        airtelChecked===true ? <img src={checked2} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>: <img src={checked1} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     }
    </div> 
   
              </div>
                    </div>
                    <div>
                    <div class="flex items-center  w-full pl-4 border border-blue-500 rounded-lg dark:border-gray-700">
                    <img src={payPalLogo}  name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     <label for="bordered-checkbox-2" class="w-full whitespace-nowrap py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> PayPal</label>
   <div onClick={()=>{setPaypalChecked(true);setPaymentType("Paypal");setShowMessage(false);setAirtelChecked(false);setChecked(false);setMobileMoneyChecked(false)}}>
     {
        paypalChecked===true ? <img src={checked2} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>: <img src={checked1} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     }
    </div> 
   
              </div>
                    </div>
                    <div  onClick={()=>{setPaypalChecked(false);setShowMessage(false);setAirtelChecked(false);setChecked(false);setPaymentType(" MTN Mobile Money");setMobileMoneyChecked(true)}}>
                    <div class="flex items-center  w-full pl-4 border border-blue-500 rounded-lg dark:border-gray-700">
                    <img src={mtnLogo}  name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     <label for="bordered-checkbox-2" class="w-full whitespace-nowrap py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mobile Money</label>
   <div>
     {
        mobileMoneyChecked===true ? <img src={checked2} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>: <img src={checked1} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     }
    </div> 
   
              </div>
                    </div>
                    </div>
                </div>

                
               {

              isIsNotSmallScreen&&(
                <div className=" absolute w-64  right-64">
                {
                  mobileMoneyChecked&&(  <div style={{width:'130%',height:"full",borderWidth:'10px'}} className="  border rounded-3xl   border-primeFirstColor">
                               <div className="whitespace-nowrap mt-3 ml-2">
                        Enter Your Mtn  Mobile Money Number
                        </div>
                              <div className=" py-6 px-14 w-full">
                            
                       
                             
                              <div class="relative z-0 w-full mb-6 group">
                              <div    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="floating_email" class="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> <span>Phone:</span>{userName}</label>
                              </div>
                              <div class="relative z-0 w-full mb-6 group">
                              <div    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="floating_email" class="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> <span>Amount:</span> {premium}Rwf</label>
                              </div>
                              <div class="relative z-0 w-full mb-6 group ">
                              <div    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="floating_email" class="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 whitespace-no-wrap peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> <span>Insurance:</span>{insuranceName}</label>
                              </div>
                              
                             
                           <div style={{width:"110%"}} className=" mt-2 border">
                        <button onClick={HandleRequestPayment} className=" bg-primeFirstColor w-full flex justify-center text-white py-3"> Make Payment</button>
                        </div>
                        <div   style={{width:"110%"}} className=" mt-2" >
                            <span style={{fontSize:"13px",fontWeight:400}}>
                            Tips: Please make sure the account balance have required balance , otherwise the payment will not be completed
                            </span>
                        </div>
                        
                        
                      
                           </div>
                        </div>)
                  } 
                   {
                  airtelChecked&&(  <div style={{width:'130%',height:"full",borderWidth:'10px'}} className="  border rounded-3xl   border-primeFirstColor">
                               <div className="whitespace-nowrap mt-3 ml-2">
                        Enter Your airtel Money Number
                        </div>
                              <div className=" py-6 px-14 w-full">
                            
                       
                              <div class="relative z-0 w-full mb-6 group">
                              <input  onChange={(e)=>{setPhoneNumber(e.target.value)}}  type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                              </div>
                             
                           <div style={{width:"110%"}} className=" mt-2 border">
                        <button  className=" bg-primeFirstColor w-full flex justify-center text-white py-3"> Make Payment</button>
                        </div>
                        <div   style={{width:"110%"}} className=" mt-2" >
                            <span style={{fontFamily:"Poppins",fontSize:"16px",fontWeight:400}}>
                            Tips: Please make sure the account balance have required balance , otherwise the payment will not be completed
                            </span>
                        </div>
                        
                        
                      
                           </div>
                        </div>)
                  } 
                  
                  {
                    showMessage&&(  <span className=" absolute top-32 max-sm:hidden" style={{fontFamily:"Poppins",fontSize:"30px",lineHeight:"45px",color:"#01499B"}}>Choose your  payment Method
                    and make your Payment now!</span>)
                  }
                  {
                  checked&&(  <div style={{width:'130%',height:"full",borderWidth:'10px'}} className="  border rounded-3xl   border-primeFirstColor">
                                <div className="whitespace-nowrap flex justify-center mt-4">
                                     Payment Details
                                  </div>
                              <div className=" py-6 px-14 w-full">
                       
                              <div class="relative z-0 w-full mb-6 group">
                              <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                              </div>
                              <div class="relative z-0 w-full mb-6 group">
                              <input type="text" name="text" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="text" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Card Holder name</label>
                              </div>
                              <div class="relative z-0 w-full mb-6 group">
                              <input type="text" name="text" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="text" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Card number</label>
                              </div>

                              <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-6 group">
        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Expiry Date</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
        <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CVC</label>
    </div>
                           </div>

                           <div style={{width:"110%"}} className=" mt-2 border">
                        <button  className=" bg-primeFirstColor w-full flex justify-center text-white py-3"> Make Payment</button>
                        </div>
                        
                        
                      
                           </div>
                        </div>)
                  } 
                 


                 {
                  paypalChecked&&(  <div style={{width:'130%',height:"full",borderWidth:'10px'}} className="   border rounded-3xl   border-primeFirstColor">
                               
                              <div className=" py-6 px-14 w-full">
                       
                              <div class="relative z-0 w-full mb-6 group">
                              <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your email</label>
                              </div>
                              <div class="relative z-0 w-full mb-6 group">
                              <input type="text" name="text" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="text" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Psaword</label>
                              </div>
                              <div style={{width:"110%"}} className=" mt-2 border">
                        <button  className=" bg-primeFirstColor w-full flex justify-center text-white py-3">Login</button>
                        </div>
                              <div>
                              Having trouble with Login?
                              </div>
                            
                              <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>
                             

                           <div style={{width:"110%"}} className=" mt-2 border">
                        <button onClick={()=>{setChecked(true);setPaypalChecked(false)}} className=" bg-primeFirstColor whitespace-nowrap w-full flex justify-center text-white py-3">Pay with Credit Card</button>
                        </div>
                        
                        
                      
                           </div>
                        </div>)
                  } 
                  
                </div>
              )


               }

 {
  isSmallsCreen&&mobileMoneyChecked && (
    <Zoom>
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
    
      <div className="w-full max-w-md p-8 bg-white rounded-3xl">
        <div onClick={()=>{setMobileMoneyChecked(false)}} className="  text-red-500 absolute top-20  right-10">  <Button size="small">click here to close</Button></div>
      {
                  (  <div style={{width:'100',height:"full",borderWidth:'10px'}} className="  border rounded-3xl   border-primeFirstColor">
                               <div className="whitespace-nowrap text-sm mt-3 ml-2">
                        Enter Your Mtn  Mobile Money Number
                        </div>
                              <div className=" py-6 px-14 w-full">
                            
                       
                              <div class="relative z-0 w-full mb-6 group">
                              <input value={userName}  onChange={(e)=>{setPhoneNumber(e.target.value)}}  type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                              </div>
                              <div class="relative z-0 w-full mb-6 group">
                              <div    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="floating_email" class="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount: {premium}Rwf</label>
                              </div>
                              <div class="relative z-0 w-full mb-6 group">
                              <div    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="floating_email" class="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 whitespace-no-wrap peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Insurance:{insuranceName}</label>
                              </div>
                              
                             
                           <div style={{width:"110%"}} className=" mt-2 border">
                        <button onClick={HandleRequestPayment} className=" bg-primeFirstColor w-full flex justify-center text-white py-3"> Make Payment</button>
                        </div>
                        <div   style={{width:"110%"}} className=" mt-2" >
                            <span style={{fontSize:"13px",fontWeight:400}}>
                            Tips: Please make sure the account balance have required balance , otherwise the payment will not be completed
                            </span>
                        </div>
                        
                        
                      
                           </div>
                        </div>)
                  } 
                   {
                  airtelChecked&&(  <div style={{width:'130%',height:"full",borderWidth:'10px'}} className="  border rounded-3xl   border-primeFirstColor">
                               <div className="whitespace-nowrap mt-3 ml-2">
                        Enter Your airtel Money Number
                        </div>
                              <div className=" py-6 px-14 w-full">
                            
                       
                              <div class="relative z-0 w-full mb-6 group">
                              <input  onChange={(e)=>{setPhoneNumber(e.target.value)}}  type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                              </div>
                             
                           <div style={{width:"110%"}} className=" mt-2 border">
                        <button  className=" bg-primeFirstColor w-full flex justify-center text-white py-3"> Make Payment</button>
                        </div>
                        <div   style={{width:"110%"}} className=" mt-2" >
                            <span style={{fontFamily:"Poppins",fontSize:"16px",fontWeight:400}}>
                            Tips: Please make sure the account balance have required balance , otherwise the payment will not be completed
                            </span>
                        </div>
                        
                        
                      
                           </div>
                        </div>)
                  } 
                  
                  {
                    showMessage&&(  <span className=" max-sm:hidden" style={{fontFamily:"Poppins",fontSize:"30px",lineHeight:"45px",color:"#01499B"}}>Choose your  payment Method
                    and make your Payment now!</span>)
                  }
                  {
                  checked&&(  <div style={{width:'130%',height:"full",borderWidth:'10px'}} className="  border rounded-3xl   border-primeFirstColor">
                                <div className="whitespace-nowrap flex justify-center mt-4">
                                     Payment Details
                                  </div>
                              <div className=" py-6 px-14 w-full">
                       
                              <div class="relative z-0 w-full mb-6 group">
                              <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                              </div>
                              <div class="relative z-0 w-full mb-6 group">
                              <input type="text" name="text" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="text" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Card Holder name</label>
                              </div>
                              <div class="relative z-0 w-full mb-6 group">
                              <input type="text" name="text" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="text" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Card number</label>
                              </div>

                              <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-6 group">
        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Expiry Date</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
        <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CVC</label>
    </div>
                           </div>

                           <div style={{width:"110%"}} className=" mt-2 border">
                        <button  className=" bg-primeFirstColor w-full flex justify-center text-white py-3"> Make Payment</button>
                        </div>
                        
                        
                      
                           </div>
                        </div>)
                  } 
                 


                 {
                  paypalChecked&&(  <div style={{width:'130%',height:"full",borderWidth:'10px'}} className="   border rounded-3xl   border-primeFirstColor">
                               
                              <div className=" py-6 px-14 w-full">
                       
                              <div class="relative z-0 w-full mb-6 group">
                              <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your email</label>
                              </div>
                              <div class="relative z-0 w-full mb-6 group">
                              <input type="text" name="text" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="text" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Psaword</label>
                              </div>
                              <div style={{width:"110%"}} className=" mt-2 border">
                        <button  className=" bg-primeFirstColor w-full flex justify-center text-white py-3">Login</button>
                        </div>
                              <div>
                              Having trouble with Login?
                              </div>
                            
                              <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>
                             

                           <div style={{width:"110%"}} className=" mt-2 border">
                        <button onClick={()=>{setChecked(true);setPaypalChecked(false)}} className=" bg-primeFirstColor w-full flex justify-center text-white py-3">Pay with Credit Card</button>
                        </div>
                        
                        
                      
                           </div>
                        </div>)
                  } 
      </div>
    </div>
    </Zoom>
  )
 
}




             </div>
             <div className="mt-10 flex justify-center">
                
             </div>
        </div>
    )
}
export default PaymentPage