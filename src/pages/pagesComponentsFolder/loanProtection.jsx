import React, { useEffect, useState } from "react";
import {Grid} from '@material-ui/core'
import clsx from 'clsx';
import LoginPage from "../LoginPage";
import { Link } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import FamilyInsuranceSummary from "./familyInsuranceSummary";

//react super table
 
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { WidthFull } from "@mui/icons-material";


//////////////////////


function LoanInsurance() {
   
     const[yearOfBirth,setYearOfBirth]=useState()
     const[loanPeriod,setloanPeriod]=useState()
     const[premiumFrequency,setpremiumFrequency]=useState("Annual")
     const[loanAmount,setloanAmount]=useState()
     const[loanType,setloanType]=useState("Decreasing")
     const[isJoint,setisJoint]=useState("False")
     const[coverRetrenchment,setcoverRetrenchment]=useState("False")
     const[loanPeriodArray,setLoanPeriodArray]=useState([])

     const[netPremium,setnetPremium]=useState(0)
     const[administrationFees,setadministrationFees]=useState(0)
     const[totalPremiumSingleBorrower,settotalPremiumSingleBorrower]=useState(0)
     const[totalPremiumJointBorrowers,settotalPremiumJointBorrowers]=useState(0)
     const[retrenchmentPremium,setretrenchmentPremium]=useState(0)
     const[covers,setCovers]=useState()


     const handleYearOfBirth=(e)=>{
        setYearOfBirth(e.target.value)
     }
     const handleLoanPeriod=(e)=>{
     setloanPeriod(e.target.value)
     }
     const handlePremiumFrequency=(e)=>{
    setpremiumFrequency(e.target.value)
     }
     const handleLoanAmount=(e)=>{
        setloanAmount(e.target.value)
     }
     const handleLoanType=(e)=>{
     setloanType(e.target.value)
     }
     const handleIsJoint=(e)=>{
        setisJoint(e.target.value)
     }
     const handleCoverRetrenchment=(e)=>{
        setcoverRetrenchment(e.target.value)
     }

      const getLoanPeriod=()=>{
        for(let i=1;i<=300;i++){
          loanPeriodArray.push(i)
          
        }
   }
    useEffect(()=>{
     getLoanPeriod()

    },[])
   
       


     const getRateS=async()=>{
        const result=await fetch(`https://apps.prime.rw/customerbackend/api/loan-protection?yearOfBirth=${yearOfBirth}&loanPeriod=${loanPeriod}&premiumFrequency=${premiumFrequency}&loanAmount=${loanAmount}&loanType=${loanType}&isJoint=${isJoint}&coverRetrenchment=${coverRetrenchment}`)
        const result2=await result.json()
        console.log("rate per mille from api:",result2)
        setnetPremium(result2.netPremium)
        setadministrationFees(result2.administrationFees)
        settotalPremiumSingleBorrower(result2.totalPremiumSingleBorrower)
        settotalPremiumJointBorrowers(result2.totalPremiumJointBorrowers)
        setretrenchmentPremium(result2.retrenchmentPremium)
        console.log("covers is",result2.covers)
        if(Array.isArray(result2.covers)){
        setCovers(result2.covers)
        }
        else{
            setCovers([result2.covers])
        }

   }


  useEffect(()=>{
    getRateS();
   
   if(loanType==="CreditLine"){
   
   setpremiumFrequency("Single")
   setDisable(true)
   }
   else{
    setDisable(false)
   }
   },[yearOfBirth,loanPeriod,premiumFrequency,loanAmount,loanType,isJoint,coverRetrenchment])



    
    const [disable, setDisable] = useState(false);

    const navigate=useNavigate(Navigate)
    const toast = useToast()
    // console.log("buy insurance state is:",buyInsuranceButtonClicked)
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
  
 
  
  return (

 <>

 <Table style={{ border: '5px solid #ddd', borderCollapse: 'collapse', fontSize: '14px' }}>
<Thead>
  <Tr >
    <Th>Feild</Th>
    <Th>Value</Th>
   
  </Tr>
</Thead>
<Tbody>
<Tr>
    <Td>Year of Birth</Td>
    <Td>
    <input  placeholder="   year only example:1990" onChange={handleYearOfBirth} type="number" className=" w-56  hover:border border border-gray-400 hover:border-orange-300 max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor"  /> 
    </Td>
   {
    isIsNotSmallScreen&&( <Td style={{ borderRight: '5px solid #ddd' }}>netPremium</Td>)
   }
    {
      isIsNotSmallScreen&&(<Td style={{ borderRight: '5px solid #ddd' }}>
        <span className=" max-sm:ml-7"> {netPremium}</span>
         </Td>)
    }
   
  </Tr>
  <Tr>
    <Td>Loan Type</Td>
    <Td>
    <select onChange={handleLoanType} className=" w-56  hover:border border border-gray-400 hover:border-orange-300 max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor" onInput={0} defaultValue={"0"} >
     <option value="Decreasing">decreasing</option>
    <option value="CreditLine">credit line</option>
   
     </select>
    </Td>
    {
      isIsNotSmallScreen&&(<Td style={{ borderRight: '5px solid #ddd' }}>retrenchment Premium</Td>)
    }
    {
      isIsNotSmallScreen&&(<Td style={{ borderRight: '5px solid #ddd' }}>
        <span className=" max-sm:ml-16">   {retrenchmentPremium}</span>
        </Td>)
    }
   
  </Tr>
  <Tr>
    <Td>Loan Period</Td> 
    <Td>

    {/* <input placeholder="   in months"     value={loanPeriod} onChange={handleLoanPeriod} disabled={disable} className=" w-56  hover:border border border-gray-400 hover:border-orange-300    max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor"  type="number"   /> */}
    <select onChange={handleLoanPeriod}  className=" w-56  hover:border border border-gray-400 hover:border-orange-300    max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor"     name="" id="">
     {
   loanType==="CreditLine" && premiumFrequency==="Single"  && loanPeriodArray.filter(data=>data<13).map((item)=>{
        
         return <option value={item}>{item}</option>
      })
      
     }
     {
   (loanType==="Decreasing" && premiumFrequency==="Annual")  && loanPeriodArray.filter(data=>data>23).map((item)=>{
        
         return <option value={item}>{item}</option>
      })
      
     }
     {
   (loanType==="Decreasing" && premiumFrequency==="Single")  && loanPeriodArray.map((item)=>{
        
         return <option value={item}>{item}</option>
      })
      
     }
  
    </select>
   </Td>
   {
    isIsNotSmallScreen&&( <Td style={{ borderRight: '5px solid #ddd' }}>administrationFees</Td>)
   }
   {
    isIsNotSmallScreen&&( <Td style={{ borderRight: '5px solid #ddd' }}>
      <span className=" max-sm:ml-16"> {administrationFees}</span> 
      </Td>)
   }
   
  </Tr>
 

 
  <Tr>
    <Td>loanAmount</Td>
    <Td>
    <input onChange={handleLoanAmount}   className=" w-56  hover:border border border-gray-400 hover:border-orange-300    max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor"  type="number"   />
    </Td>
    {
      isIsNotSmallScreen&&(<Td style={{ borderRight: '5px solid #ddd' }}>total Premium Joint Borrowers</Td>)
    }
    {
      isIsNotSmallScreen&&(<Td style={{ borderRight: '5px solid #ddd' }}>
        <span className=" max-sm:ml-16">   {totalPremiumJointBorrowers}</span>
        </Td>)
    }
   
  </Tr>
 
  

  <Tr>
    <Td>Premium Frequency</Td>
    <Td>
    <select  disabled={disable}  onChange={handlePremiumFrequency} className=" w-56  hover:border border border-gray-400 hover:border-orange-300 max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor" onInput={0} defaultValue={"0"} >
    
   
     {
        loanType==="CreditLine"?( <option value="Single">Single</option>):( <><option value="Annual">Annual</option>
        <option value="Single">Single</option></> )
     }
     </select>
    </Td>
    {
      isIsNotSmallScreen&&(<Td style={{ borderRight: '5px solid #ddd' }}>total Premium Single Borrower</Td>)
    }
    {
      isIsNotSmallScreen&&(<Td style={{ borderRight: '5px solid #ddd' }}>
        <span className=" max-sm:ml-16">   {totalPremiumSingleBorrower}</span>
        </Td>)
    }
  
  </Tr>
 
  <Tr>
    <Td>Is Joint?</Td>
    <Td>
    <select onChange={handleIsJoint} className=" w-56  hover:border border border-gray-400 hover:border-orange-300 max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor" onInput={0} defaultValue={"0"} >
     <option value="False">False</option>
    <option value="True">True</option>
   
     </select>
    </Td>
   
  </Tr>
 
  <Tr>
    <Td>Cover Retrenchment</Td>
    <Td>
    <select onChange={handleCoverRetrenchment} className=" w-56  hover:border border border-gray-400 hover:border-orange-300 max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor" onInput={0} defaultValue={"0"} >
     <option value="False">False</option>
    <option value="True">True</option>
   
     </select>
    </Td>
   
  </Tr>

</Tbody>
</Table>

  <div className=" flex justify-center max-sm:hidden mt-5 ">Covers</div>

  <Table className="" style={{ border: '1px solid #ddd', borderCollapse: 'collapse', fontSize: '14px' }}>
  <Thead>
    <Tr style={{ borderBottom: '10px solid #ddd' }}>
     {
       covers&&covers.map((item)=>{
         return <Th>{item}</Th>
        
           
         
        })
     }
      
    </Tr>
  </Thead>
  <Tbody>
  
  </Tbody>
</Table>

    <>
  {isSmallsCreen && (
    <>
    <div className="flex justify-center mt-5"></div>

    <Table className="w-full text-sm">
      <Thead  className="w-full ">
        <Tr  >
          <Th>net Premium</Th>
          <Th>administration Fees</Th>
          <Th >Joint Borrowers</Th>
          <Th>retrenchment</Th>
          <Th>Single Borrower</Th>
         
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>{netPremium}</Td>
          <Td>{administrationFees}</Td>
          <Td>{totalPremiumJointBorrowers}</Td>
          <Td>{retrenchmentPremium}</Td>
          <Td>{totalPremiumSingleBorrower}</Td>
         
        </Tr>
      </Tbody>
    </Table>
    <div className=" flex justify-center mt-5 ">Covers</div>
    <Table className="" style={{ border: '1px solid #ddd', borderCollapse: 'collapse', fontSize: '14px' }}>
  <Thead>
    <Tr style={{ borderBottom: '10px solid #ddd' }}>
     {
       covers&&covers.map((item)=>{
         return <Th>{item}</Th>
        
           
         
        })
     }
      
    </Tr>
  </Thead>
  <Tbody>
  
  </Tbody>
</Table>
    </>
    
  )}
  <div className=" flex justify-center">

  </div>
</>

</>

  )
}


export default LoanInsurance
