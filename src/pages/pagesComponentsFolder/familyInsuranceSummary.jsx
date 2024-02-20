import React, { useEffect, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { concat, result } from 'lodash';
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Zoom } from 'react-swift-reveal';
import zxcvbn from 'zxcvbn';
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useContext } from 'react';
import { OpenModalContext } from '../context';
import { Navigate } from "react-router-dom";

const FamilyInsuranceSummary = (props) => {
  const {maritalStatus}=props
  const{categoryTyp}=props
  const{numberOfdirectParent}=props
  const{numberOfDirectParentInLaw}=props
  const{premiumFrequency}=props
  const{numberOfChildreen}=props 
  const{policyholderSumInsured}=props
  const{spouseSumInsured}=props
  const{kidsSumInsured}=props
  const{ parentSumInsured}=props
  const{funeralAmount}=props
  const{hospitalAmount}=props
  const{driverEmergencyAmount}=props
   const{riskPremium}=props
   const{AnnualRiskPremium}=props
   const{MonthlyMinSavings}=props
   const{AnnualyMinSavings}=props


   const{setBuyInsuranceButtonClicked}=props

   const[isSingle,setIsSingle]=useState("")
   const navigate=useNavigate(Navigate)
   
     const nationalId=  localStorage.getItem('nationalId');
     
     const token=sessionStorage.getItem('token')
    //  console.log("token  is ",token)
     const{setLoginFromHeader}=useContext(OpenModalContext) 
    //seeting data in local storage

    localStorage.setItem("insuranceName","family")
    localStorage.setItem('maritalStatus',maritalStatus);
    localStorage.setItem('SelectedCategoryType',categoryTyp);
     localStorage.setItem('numberOfdirectParent',numberOfdirectParent.toString());
     localStorage.setItem('numberOfdirectParentInLaw',numberOfDirectParentInLaw.toString());
   localStorage.setItem('premiumFrequency', premiumFrequency);
  localStorage.setItem('numberOfchildren',numberOfChildreen.toString());
 localStorage.setItem('riskPremium', riskPremium.toString());
 localStorage.setItem('AnnualRiskPremium',AnnualRiskPremium.toString());
localStorage.setItem('MonthlyMinSavings',MonthlyMinSavings.toString());
localStorage.setItem('AnnualyMinSavings', AnnualyMinSavings.toString());
localStorage.setItem('riskPremiumMonthlyMinSavings', riskPremium+MonthlyMinSavings);
 localStorage.setItem('AnnualRiskPremiumAnnualyMinSavings', AnnualRiskPremium+AnnualyMinSavings);
 if(premiumFrequency==="Monthly")
 {
  localStorage.setItem('premium', riskPremium.toString());
 }
 if(premiumFrequency==="Annually"){
  localStorage.setItem('premium',AnnualRiskPremium.toString());
 }
      
  ///////////////////////////////////////

 const toast = useToast()
 
     const  handleContinue=async()=>{
        setLoginFromHeader(false)
        if (!token) {
          navigate("/login");
          console.log("no token found")
        }
        else {
          const decodedToken =jwtDecode(token);
          const currentTime = Date.now() / 1000;
       if (decodedToken.exp < currentTime) {
            navigate("/login");
            console.log("token is inactive",decodedToken)
          } else {
            console.log("token is active")
            navigate(`/payment`);
            // console.log("decorded value are:",decodedToken.email)
        
          }
        }
     }



      







  
return (
    <Zoom>
      <div className="min-h-screen max-sm:w-full  max-sm:h-full flex items-center justify-center ">
        
        <div className="container bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center gap-y-5">
        <div>your input </div>
        <Table className="border-collapse border border-gray-400">
  <Thead>
    <Tr>
      <Th className="max-sm:text-sm border border-gray-400"><span className=' max-sm:hidden'> Marital</span> status</Th>
      <Th className="max-sm:text-sm border border-gray-400">Category</Th>
      <Th className="max-sm:text-sm border border-gray-400"> <span className=' max-sm:hidden'> Number of</span> Direct Parent</Th>
      <Th className="max-sm:text-sm border border-gray-400"> <span className=' max-sm:hidden'> Number of Direct </span> Parent in Law</Th>
      <Th className="max-sm:text-sm border border-gray-400"> <span className=' max-sm:hidden'> Premium </span>Frequency</Th>
      <Th className="max-sm:text-sm border border-gray-400"> <span className=' max-sm:hidden'> Number Of</span> Children</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td className="max-sm:text-sm border border-gray-400">{maritalStatus}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{categoryTyp}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{numberOfdirectParent}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{numberOfDirectParentInLaw}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{premiumFrequency}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{numberOfChildreen}</Td>
    </Tr>
  </Tbody>
</Table>



<div className=''> Covers </div>
<Table className="border-collapse border border-gray-400">
  <Thead>
    <Tr>
      <Th className="max-sm:text-sm border border-gray-400">PolicyholderSum</Th>
      <Th className="max-sm:text-sm border border-gray-400">SpouseSum</Th>
      <Th className="max-sm:text-sm border border-gray-400">KidsSumInsured</Th>
      <Th className="max-sm:text-sm border border-gray-400">ParentSum</Th>
      <Th className="max-sm:text-sm border border-gray-400">FuneralAmount</Th>
      <Th className="max-sm:text-sm border border-gray-400">HospitalAmount</Th>
      <Th className="max-sm:text-sm border border-gray-400">DriverEmergency</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td className="max-sm:text-sm border border-gray-400">{policyholderSumInsured}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{spouseSumInsured}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{kidsSumInsured}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{parentSumInsured}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{funeralAmount}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{hospitalAmount}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{driverEmergencyAmount}</Td>
    </Tr>
  </Tbody>
</Table>

<div className=' '> Premium </div>
<Table className="border-collapse border border-gray-400">
  <Thead>
    <Tr>
      <Th className="max-sm:text-sm border border-gray-400">Monthly Risk</Th>
      <Th className="max-sm:text-sm border border-gray-400">Annually Risk</Th>
      <Th className="max-sm:text-sm border border-gray-400">Monthly Saving</Th>
      <Th className="max-sm:text-sm border border-gray-400">Annually Saving</Th>
      <Th className="max-sm:text-sm border border-gray-400">Total Premium</Th>
      <Th className="max-sm:text-sm border border-gray-400">Total Savings</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td className="max-sm:text-sm border border-gray-400">{riskPremium}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{AnnualRiskPremium}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{MonthlyMinSavings}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{AnnualyMinSavings}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{riskPremium + MonthlyMinSavings}</Td>
      <Td className="max-sm:text-sm border border-gray-400">{AnnualRiskPremium + AnnualyMinSavings}</Td>
    </Tr>
  </Tbody>
</Table>


<Grid spacing={2} container justifyContent="center">
      <Grid className=' max-sm:hidden' item>
        <Link  variant="body2">
          Do you wish to continue?
        </Link>
      </Grid>
      <Grid item>
      <Button onClick={handleContinue}  variant="outlined">Continue</Button>
      </Grid>
      <Grid item>
      <Button onClick={()=>{setBuyInsuranceButtonClicked(false)}} variant="outlined" color="error">
        Cancel
      </Button>
      </Grid>
    </Grid>
        
        </div>
      </div>
    </Zoom>
  );
};

export default FamilyInsuranceSummary;
