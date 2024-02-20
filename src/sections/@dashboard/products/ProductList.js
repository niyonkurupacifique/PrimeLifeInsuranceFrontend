
import React from 'react';
import { useState,useEffect } from 'react';


import PropTypes from 'prop-types';

// @mui
import { Grid } from '@mui/material';
import Header from 'src/pages/pagesComponentsFolder/header';
import FamilyInsurance from 'src/pages/pagesComponentsFolder/familyInsurance';
import EmployerProtection from 'src/pages/pagesComponentsFolder/employeeProtection';
import PrimeEducation from 'src/pages/pagesComponentsFolder/educationInsurance';
import SignUp from 'src/pages/pagesComponentsFolder/Signup';
import { useContext } from 'react';
import { OpenModalContext } from 'src/pages/context';
import LoginPage from 'src/pages/LoginPage';
import MyPolicies from 'src/pages/pagesComponentsFolder/myPolicies';
import LoanInsurance from 'src/pages/pagesComponentsFolder/loanProtection';
import { Zoom } from "react-swift-reveal";
import Slideshow from 'src/pages/landingPage';

// ----------------------------------------------------------------------

export default function ProductList({ products, ...other }) {
  const[familyInsuranceClicked,setFamilyInsuranceClicked]=useState(false)
  const[familyInsuranceStyle,setFamilyInsuranceStyle]=useState(false)
  const[employeeProtectionStyle,setEmployeeProtectionStyle]=useState(false)
  const[educationInsuranceStyle,setEducationInsuranceStyle]=useState(false)
  const[loanInsuranceStyle,setLoanInsuranceStyle]=useState(false)


  const[familyInsuranceClick,setFamilyInsuranceClick]=useState(false) 
  const[employeeProtectionClicked,setEmployeeProtectionClick]=useState(false)
  const[educationInsuranceClick,setEducationInsuranceClick]=useState(false)
  const[LoanInsuranceClick,setLoanInsuranceClick]=useState(false)
  const[ShowLandingPagee,setShowLandingPage]=useState(true)



  const{loginCalled}=useContext(OpenModalContext) 
  const{istokenIsActive}=useContext(OpenModalContext)

 const [IsFamilyInsuranceHovered,setIsFamilyInsuranceHovered]=useState(false)
 const[IsEmployeeInsuranceHovered,setIsEmployeeInsuranceHovered]=useState(false)
 const[IsEducationInsuranceHovered,setIsEducationInsuranceHovered]=useState(false)
 const[IsLoanInsuranceHovered,setIsLoanInsuranceHovered]=useState(false)

  const{myPoliciesButtonClicked}=useContext(OpenModalContext)
  // console.log("myPoliciesButtonClicked",myPoliciesButtonClicked)
  const [selectedInsurance, setSelectedInsurance] = useState('landingpage');
  const handleFamilyInsuranceClick = () => {
    
    // setSelectedInsurance('family');
    setFamilyInsuranceClicked(true)
    setEmployeeProtectionClick(false)
    setEducationInsuranceClick(false)
    setLoanInsuranceClick(false)
    setShowLandingPage(false)
    setFamilyInsuranceStyle(true)
    setEmployeeProtectionStyle(false)
    setEducationInsuranceStyle(false)
    setLoanInsuranceStyle(false)

    console.log("family insured clickef")
  };

//  console.log("is token active verification",istokenIsActive)
  const handleEmployeeInsuranceClick = () => {
    // setSelectedInsurance('employee');
     setEmployeeProtectionClick(true)
    setFamilyInsuranceClicked(false)
    setEducationInsuranceClick(false)
    setLoanInsuranceClick(false)
    setEmployeeProtectionStyle(true)
    setFamilyInsuranceStyle(false)
    setEducationInsuranceStyle(false)
    setLoanInsuranceStyle(false)
    setShowLandingPage(false)
  };

  const handleEducationInsuranceClick = () => {
    // setSelectedInsurance('education');
    setEducationInsuranceClick(true)
    setFamilyInsuranceClicked(false)
    setEmployeeProtectionClick(false) 
    setLoanInsuranceClick(false)
    setEducationInsuranceStyle(true)
    setEmployeeProtectionStyle(false)
    setFamilyInsuranceStyle(false)
    setLoanInsuranceStyle(false)
  };

  const handleLoanInsuranceClick=()=>{
    // setSelectedInsurance('loan');
    setLoanInsuranceClick(true)
     setFamilyInsuranceClicked(false)
     setEmployeeProtectionClick(false)
     setEducationInsuranceClick(false)
    setEducationInsuranceStyle(false)
    setEmployeeProtectionStyle(false)
    setFamilyInsuranceStyle(false)
    setLoanInsuranceStyle(true)
    setShowLandingPage(false)
  }

  const familyInsuranceHovered=()=>{
    // console.log("family is being hovered")
    // setIsFamilyInsuranceHovered(true) 

    // setShowLandingPage(false)
    // setEmployeeProtectionClick(false)
    // setFamilyInsuranceClicked(true)
    // setEducationInsuranceClick(false)
    // setLoanInsuranceClick(false)
    // setEducationInsuranceStyle(false)
    // setEmployeeProtectionStyle(false)
    // setFamilyInsuranceStyle(true)
    // setLoanInsuranceStyle(false)
  }
  const familyInsuranceHoveredLeave=()=>{
   
   
 }



 const EmployeeInsuranceHovered=()=>{
 
  // setIsEmployeeInsuranceHovered(true)  
  // setShowLandingPage(false)

  //  setEmployeeProtectionClick(true)
  // setFamilyInsuranceClicked(false)
  // setLoanInsuranceClick(false)
  // setEducationInsuranceClick(false)
  // setEducationInsuranceStyle(false)
  // setEmployeeProtectionStyle(true)
  // setFamilyInsuranceStyle(false)
  // setLoanInsuranceStyle(false)
}
const EmployeeInsuranceHoveredLeave=()=>{
  
 
}

 
const EducationInsuranceHovered=()=>{
  // console.log("family is being hovered")
  // setIsEducationInsuranceHovered(true)  
  // setShowLandingPage(false)

  // setEducationInsuranceClick(true)
  // setEmployeeProtectionClick(false)
  // setFamilyInsuranceClicked(false) 
  // setLoanInsuranceClick(false)


  // setEducationInsuranceStyle(true)
  // setEmployeeProtectionStyle(false)
  // setFamilyInsuranceStyle(false)
  // setLoanInsuranceStyle(false)
}
const EducationInsuranceHoveredLeave=()=>{
 
}

const LoanInsuranceHovered=()=>{
//   console.log("family is being hovered")
//   setIsLoanInsuranceHovered(true)  
//   setShowLandingPage(false)

//   setLoanInsuranceClick(true)
//   setEmployeeProtectionClick(false)
//  setFamilyInsuranceClicked(false)
//  setEducationInsuranceClick(false)
 
//   setEducationInsuranceStyle(false)
//   setEmployeeProtectionStyle(false)
//   setFamilyInsuranceStyle(false)
//   setLoanInsuranceStyle(true)
}
const LoanInsuranceHoveredLeave=()=>{
  
 
}

  return (

    <>

  

 {/* {
  loginCalled && (
    <>
      <div className="fixed inset-0 w-full bg-black bg-opacity-50 ">
      <div className="fixed inset-0 flex items-center justify-center z-30"> 
        <div style={{width:'100%'}} className="bg-white  pl-64 rounded-lg">
          <LoginPage />  
        </div>
      </div>
      </div>
    </>
  )
} */}



    <Grid className=" " container spacing={4} {...other}>
     
        <Grid  item xs={12} sm={12} md={12} lg={12}>
         <Header familyInsuranceClicked={familyInsuranceClicked} employeeProtectionClicked={employeeProtectionClicked} educationInsuranceClick={educationInsuranceClick} LoanInsuranceClick={LoanInsuranceClick} LoanInsuranceHoveredLeave={LoanInsuranceHoveredLeave} LoanInsuranceHovered={LoanInsuranceHovered} EducationInsuranceHoveredLeave={EducationInsuranceHoveredLeave} EducationInsuranceHovered={EducationInsuranceHovered} EmployeeInsuranceHoveredLeave={EmployeeInsuranceHoveredLeave} EmployeeInsuranceHovered={EmployeeInsuranceHovered} familyInsuranceHoveredLeave={familyInsuranceHoveredLeave} familyInsuranceHovered={familyInsuranceHovered} loanInsuranceStyle={loanInsuranceStyle} handleLoanInsuranceClick={handleLoanInsuranceClick} employeeProtectionStyle={employeeProtectionStyle} educationInsuranceStyle={educationInsuranceStyle} familyInsuranceStyle={familyInsuranceStyle} handleFamilyInsuranceClick={handleFamilyInsuranceClick} handleEmployeeInsuranceClick={handleEmployeeInsuranceClick} handleEducationInsuranceClick={handleEducationInsuranceClick}></Header>
        </Grid>
        <Grid style={{ overflow: "auto" }} item xs={12} sm={12} md={12} lg={12}>
          {myPoliciesButtonClicked ? (
            <MyPolicies />
          ) : (
            <>
             {familyInsuranceClicked && <FamilyInsurance />}
             {employeeProtectionClicked && <EmployerProtection />}
             {educationInsuranceClick &&  <PrimeEducation /> }
             {LoanInsuranceClick &&  <LoanInsurance />}
             {ShowLandingPagee&& <Slideshow /> }

              
             
            
            </>
            
          )}
        </Grid>
       
     
    </Grid>
  
    </>
  );
}
