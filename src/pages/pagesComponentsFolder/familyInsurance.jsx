import React, { useEffect, useState } from "react";
import {Grid} from '@material-ui/core'
import clsx from 'clsx';
import LoginPage from "../LoginPage";
import { Link } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Zoom } from "react-swift-reveal";
import FamilyInsuranceSummary from "./familyInsuranceSummary";

//react super table
 
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


//////////////////////


function FamilyInsurance() {
    const isMaxSm = window.innerWidth <= 640;
    const [data, setData] = useState([]);
    const [maritalStatus, setMaritalStatus] = useState("Married");
    const [disableChildren, setDisableChildren] = useState(false);
    const [disableParentInLaw, setDisableParentInLaw] = useState(false);
    const [categoryTyp,setCategoryTyp]=useState("")
    const[numberOfchildren,SetNumberOfchildren]=useState(0)
    const[numberOfdirectParent,setNumberOfdirectParent]=useState(0)
    const[numberOfDirectParentInLaw,setNumberOfDirectParentInLaw]=useState(0)
    const[premiumFrequency,setPremiumFrequency]=useState("Monthly")
    const[SelectedCategoryType,setSelectedCategoryType]=useState(null)
    const[monthlyPremium,setMonthlyPremium]=useState(0)
    const[baseKids,setBaseKids]=useState(0)
    const[MonthlyMinSavings,setMonthlyMinSavings]=useState(0)
    const[AnnualyPremium,setAnnualyPremium]=useState(0)
    const[AnnualyMinSavings,setAnnualyMinSavings]=useState(0)
    const [ MonthlyAddPremium,setMonthlyAddPremium]=useState(0)
    const[AnnualyAddPremium,setAnnualyAddPremium]=useState(0)
    const[MonthlyAddPmParent,setMonthlyAddPmParent]=useState(0)
    const[MonthlyBkids,setMonthlyBkids]=useState(0)
    const [riskPremium, setRiskPremium] = useState(0);
    const[AnnualBkids,setAnnualBkids]=useState(0)
    const [AnnualRiskPremium,setAnnualRiskPremium]=useState(0)
    const[resultt,setResultt]=useState(0)
    const[TotalAmountForaddParent,setTotalAmountForaddParent]=useState(0)
    const[TotalAmountForaddParentAnually,setTotalAmountForaddParentAnually]=useState(0)
    const[TotalAmountForaddParentInLaw,setTotalAmountForaddParentInLaw]=useState(0)
    const[TotalAmountForaddParentInLawAnually,setTotalAmountForaddParentInLawAnually]=useState(0)
    const[childrenInPut,setChildrenInput]=useState(false)
    const[PolicyholderSumInsured,setPolicyholderSumInsured]=useState(0)
    const[SpouseSumInsured,setSpouseSumInsured]=useState(0)
    const[KidsSumInsured,setKidsSumInsured]=useState(0)
    const[ParentSumInsured,setParentSumInsured]=useState(0)
    const[FuneralAmount,setFuneralAmount]=useState(0)
    const[HospitalAmount,setHospitalAmount]=useState(0)
    const[DriverEmergencyAmount,setDriverEmergencyAmount]=useState(0)
    const[buyInsuranceButtonClicked,setBuyInsuranceButtonClicked]=useState(false)
    const[viewPremiumHovered,setViewPremiumHovered]=useState(false)
    const[viewCoverHovered,setViewCoverHovered]=useState(false)
     
    const[IsBuyEnabled,setIsBuyEnabled]=useState(false)
    console.log("is buy enabled",IsBuyEnabled)
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
  const category = async () => {
    const result = await fetch("https://apps.prime.rw/customerbackend/api/familyCategories");
    const result2 = await result.json();
    if(Array.isArray(result2)){
      setData(result2);
    }
    else{
      setData([result2])
    }
    
    // console.log(result2);
  };

  useEffect(() => {
    category();
    
  }, []);
  useEffect(() => {
      if(maritalStatus==="Single"){
        setRiskPremium(monthlyPremium);
        setAnnualRiskPremium(AnnualyPremium);
        setDisable(true)
      }
      else{
        setDisable(false)
        if(numberOfdirectParent!=0 && numberOfDirectParentInLaw!=0)
        {
         setRiskPremium(monthlyPremium + MonthlyBkids+MonthlyAddPmParent+MonthlyAddPmParent);
         setAnnualRiskPremium(AnnualyPremium+AnnualBkids+MonthlyAddPmParent*12+MonthlyAddPmParent*12);
        }
        else if(numberOfdirectParent==0 && numberOfDirectParentInLaw==0)
        {
         setRiskPremium(monthlyPremium + MonthlyBkids);
         setAnnualRiskPremium(AnnualyPremium+AnnualBkids);
        }
        else{
         setRiskPremium(monthlyPremium + MonthlyBkids+MonthlyAddPmParent);
         setAnnualRiskPremium(AnnualyPremium+AnnualBkids+MonthlyAddPmParent*12);
        }
      }
      
       
   
  }, [monthlyPremium, MonthlyBkids,AnnualyPremium,AnnualBkids,MonthlyAddPmParent,TotalAmountForaddParent,TotalAmountForaddParentAnually,TotalAmountForaddParentInLaw,TotalAmountForaddParentInLawAnually,maritalStatus]);

  const handleMaritalStatusChange = (e) => {
    let selectedStatus = e.target.value;
     setMaritalStatus(selectedStatus);
    // console.log("martual is:"+selectedStatus)

    if (selectedStatus === "Single") {
      SetNumberOfchildren(0)
      setDisableChildren(true);
      setDisableParentInLaw(true);
      
        
    } else {
      setDisableChildren(false);
      setDisableParentInLaw(false);
     
    }
  };
  
  const handleCategoryTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedCategoryType(selectedType);
    setIsBuyEnabled(true)
  //  console.log(selectedType)
   for(let i=0;i<data.length;i++){
    const selectedData=data.find(items=>items.categoryType===selectedType)
    if (selectedData) {
      // console.log("Monthly Premium:", selectedData.monthlyPremium);
      setMonthlyPremium(selectedData.monthlyPremium)
      setRiskPremium(selectedData.monthlyPremium + MonthlyBkids);
        setAnnualRiskPremium(AnnualyPremium + AnnualBkids);
   
    } else {
      // console.log("Not found");
    }
  };
  for(let m=0;m<data.length;m++){
    const selectedDataa=data.find(itemss=>itemss.categoryType===selectedType)
    if (selectedDataa) {
      // console.log("Basekids:", selectedDataa.baseKids);
      setBaseKids(selectedDataa.baseKids)
      
    } else {
      // console.log("Not found");
    }
  };
  for(let n=0;n<data.length;n++){
    const selectedDataaa=data.find(itemsss=>itemsss.categoryType===selectedType)
    if (selectedDataaa) {
      // console.log("MonthlyMinSavings:", selectedDataaa.monthlyMinSavings);
      setMonthlyMinSavings(selectedDataaa.monthlyMinSavings)
    } else {
      // console.log("Not found");
    }
  };
  for(let p=0;p<data.length;p++){
    const selectedDataaaa=data.find(itemssss=>itemssss.categoryType===selectedType)
    if (selectedDataaaa) {
      // console.log("AnnualyPremium:", selectedDataaaa.annualyPremium);
      setAnnualyPremium(selectedDataaaa.annualyPremium)
    } else {
      // console.log("Not found");
    }
  };
  for(let q=0;q<data.length;q++){
    const selectedDataaaaa=data.find(itemsssss=>itemsssss.categoryType===selectedType)
    if (selectedDataaaaa) {
      // console.log("AnnualyMinSavings:", selectedDataaaaa.annualyMinSavings);
      setAnnualyMinSavings(selectedDataaaaa.annualyMinSavings)
    } else {
      // console.log("Not found");
    }
  };
  for(let q=0;q<data.length;q++){
    const selectedDataaaaa=data.find(itemsssss=>itemsssss.categoryType===selectedType)
    if (selectedDataaaaa) {
      // console.log("MonthlyAddPremium:", selectedDataaaaa.monthlyAddPremium);
      setMonthlyAddPremium(selectedDataaaaa.monthlyAddPremium)
    } else {
      // console.log("Not found");
    }
  };
  for(let q=0;q<data.length;q++){
    const selectedDataaaaa=data.find(itemsssss=>itemsssss.categoryType===selectedType)
    if (selectedDataaaaa) {
      // console.log("AnnualyAddPremium:", selectedDataaaaa.annualyAddPremium);
      setAnnualyAddPremium(selectedDataaaaa.annualyAddPremium)
    } else {
      // console.log("Not found");
    }
  };
  for(let q=0;q<data.length;q++){
    const selectedDataaaaa=data.find(itemsssss=>itemsssss.categoryType===selectedType)
    if (selectedDataaaaa) {
      // console.log("MonthlyAddPmParent:", selectedDataaaaa.monthlyAddPmParent);
      setMonthlyAddPmParent(selectedDataaaaa.monthlyAddPmParent)
    } else {
      // console.log("Not found");
    }
  };
  for(let x=0;x<data.length;x++){
    const selectedDataaaaa=data.find(itemsssss=>itemsssss.categoryType===selectedType)
    if (selectedDataaaaa) {
      // console.log("PolicyholderSumInsured:", selectedDataaaaa.policyholderSumInsured);
      setPolicyholderSumInsured(selectedDataaaaa.policyholderSumInsured)
      setSpouseSumInsured(selectedDataaaaa.spouseSumInsured)
      setKidsSumInsured(selectedDataaaaa.kidsSumInsured)
      setParentSumInsured(selectedDataaaaa.parentSumInsured)
      setFuneralAmount(selectedDataaaaa.funeralAmount)
      setHospitalAmount(selectedDataaaaa.hospitalAmount)
      setDriverEmergencyAmount(selectedDataaaaa.driverEmergencyAmount)

    } else {
      // console.log("Not found");
    }
  };
   }
   
  
   const numberOfChildreen=(e)=>{
    SetNumberOfchildren(e.target.value)
      let  number=e.target.value
      // console.log(number)
      if(number<0)
      {
        setChildrenInput(true)
      }
      else{
        setChildrenInput(false)
      }
     if(number>baseKids)
    {
     let  result=number-baseKids
      setResultt(result)
      setMonthlyBkids(result*MonthlyAddPremium)
      // console.log(result*MonthlyAddPremium)
      setAnnualBkids(result*AnnualyAddPremium)
    }
    else{
      setRiskPremium(monthlyPremium + MonthlyBkids+TotalAmountForaddParent+TotalAmountForaddParentInLaw)
      setAnnualRiskPremium(AnnualyPremium+AnnualBkids+TotalAmountForaddParentAnually+TotalAmountForaddParentInLawAnually)
      setMonthlyBkids(0)
      setAnnualBkids(0)
      
    } 
   }
  const NumberofParent=(e)=>{
      // console.log(e.target.value)
      setNumberOfdirectParent( parseInt(e.target.value))
      const number=e.target.value
     let  totalAmount=0 
     
     if(number==0)
     {
      totalAmount=0
     }
     else{
      totalAmount=MonthlyAddPmParent
      // console.log("total amount are:",totalAmount)
     } 
    
     if(maritalStatus==="Single")
     {
      setTotalAmountForaddParent(0)
      setTotalAmountForaddParentAnually(0)
      SetNumberOfchildren(0)
      setRiskPremium(monthlyPremium)
     }
     else{
      setTotalAmountForaddParent(totalAmount)
      setTotalAmountForaddParentAnually(totalAmount*12)
     }
    
  }
  const NumberofParentInLaw=(e)=>{
    // console.log(e.target.value)
    setNumberOfDirectParentInLaw(e.target.value)
    const number=e.target.value
    let  totalAmount=0
    if(number==0)
    {
     totalAmount=0   
    }
    else{
      totalAmount=MonthlyAddPmParent
    }
     
  //  console.log(totalAmount)
   setTotalAmountForaddParentInLaw(totalAmount)
   setTotalAmountForaddParentInLawAnually(totalAmount*12)
}
if(SelectedCategoryType!=null)
{
  
}

const HandleBuyInsuranceButtonClicked=()=>{
  if(maritalStatus=="")
  {
    
  return  toast({
      title: 'failed',
      description:"martal status is required",
      position: 'top',
      status: 'error',
      duration: 3000, 
    });
  }
 else if(premiumFrequency=="")
  {
   
  return  toast({
      title: 'failed',
      description:"premium frequency is required",
      position: 'top',
      status: 'error',
      duration: 3000, 
    });
  }
 else if(SelectedCategoryType==null)
{
 
 return toast({
    title: 'failed',
    description:"please select any Category",
    position: 'top',
    status: 'error',
    duration: 3000, 
  });

}
else if(riskPremium===0 &&  premiumFrequency==="Monthly"){
  return toast({
    title: 'failed',
    description:"selected category does not have Monthly Premium",
    position: 'top',
    status: 'error',
    duration: 3000, 
  }); 
}
else{
  setBuyInsuranceButtonClicked(true)
}   
 
}

  const handleContinue=()=>{
      if(riskPremium+MonthlyMinSavings===0)
      {
        // console.log("false false false")
        toast({
          title: 'failed',
          description:"Total Premium must be greater than 0",
          position: 'top',
          status: 'error',
          duration: 3000, 
        });
      }
      else{
        
     
      }
  }
  
  return (

 <>
{
buyInsuranceButtonClicked&&(
  <div className='Familyoverlay'>
    <FamilyInsuranceSummary setBuyInsuranceButtonClicked={setBuyInsuranceButtonClicked} riskPremium={riskPremium} AnnualRiskPremium={AnnualRiskPremium} MonthlyMinSavings={MonthlyMinSavings} AnnualyMinSavings={AnnualyMinSavings}  policyholderSumInsured={PolicyholderSumInsured} spouseSumInsured={SpouseSumInsured} kidsSumInsured={KidsSumInsured} parentSumInsured={ParentSumInsured} funeralAmount={FuneralAmount} hospitalAmount={HospitalAmount}  driverEmergencyAmount={DriverEmergencyAmount}  maritalStatus={maritalStatus} categoryTyp={SelectedCategoryType} numberOfdirectParent={numberOfdirectParent} numberOfDirectParentInLaw={numberOfDirectParentInLaw} premiumFrequency={premiumFrequency} numberOfChildreen={numberOfchildren}></FamilyInsuranceSummary>
  </div>
)
}
 <Table style={{ border: '5px solid #ddd', borderCollapse: 'collapse', fontSize: '14px' }}>
<Thead>
  <Tr >
    <Th>Feild</Th>
    <Th>Value</Th>
    {
      isIsNotSmallScreen&&(<Th>Premium</Th>)
    }
   {
    isIsNotSmallScreen&&( <Th>Monthly</Th>)
   }
   {
    isIsNotSmallScreen&&( <Th>Annual</Th>)
   }
  </Tr>
</Thead>
<Tbody>
  <Tr>
    <Td> Marital status</Td>
    <Td>
    <select className=" w-56  hover:border border border-gray-400 hover:border-orange-300 max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor"  onChange={handleMaritalStatusChange}>
    <option value="Married">Married</option>
     <option value="Single">Single</option>
     <option value="Other">Other</option>
    </select>
    </Td>
   {
    isIsNotSmallScreen&&( <Td style={{ borderRight: '5px solid #ddd' }}>Risk Premium</Td>)
   }
    {
      isIsNotSmallScreen&&(<Td style={{ borderRight: '5px solid #ddd' }}>
        <span className=" max-sm:ml-7"> {riskPremium}</span>
         </Td>)
    }
   {
    isIsNotSmallScreen&&( <Td style={{ borderRight: '5px solid #ddd' }}>
      <span className=" max-sm:ml-16"> {AnnualRiskPremium}</span>
      </Td>)
   }
  </Tr>
  <Tr>
    <Td>Category</Td>
    <Td>

    <select
  className="w-56 hover:border border border-gray-400 hover:border-orange-300 max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor"
  onChange={handleCategoryTypeChange}
>
  {data &&
    data
      .filter((item) =>
        item.categoryType.toLowerCase().includes("nkunganire") ||
        item.categoryType.toLowerCase().includes("akabando")
      )
      .map((item) => (
        <option key={item.categoryType} value={item.categoryType}>
          {item.categoryType}
        </option>
      ))}
</select>

   </Td>
   {
    isIsNotSmallScreen&&( <Td style={{ borderRight: '5px solid #ddd' }}>Saving Premium</Td>)
   }
   {
    isIsNotSmallScreen&&( <Td style={{ borderRight: '5px solid #ddd' }}>
      <span className=" max-sm:ml-16"> {MonthlyMinSavings}</span> 
      </Td>)
   }
   {
    isIsNotSmallScreen&&( <Td style={{ borderRight: '5px solid #ddd' }}>
      <span className=" max-sm:ml-16">  {AnnualyMinSavings}</span>
      </Td>)
   }
  </Tr>
  <Tr>
    <Td>Number of Direct Parent</Td>
    <Td>
    <select className=" w-56  hover:border border border-gray-400 hover:border-orange-300 max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor" onInput={NumberofParent} defaultValue={"0"} >
     <option value="0">0</option>
    <option value="1">1</option>
     <option value="2">2</option>
     </select>
    </Td>
    {
      isIsNotSmallScreen&&(<Td style={{ borderRight: '5px solid #ddd' }}>Total Premium</Td>)
    }
    {
      isIsNotSmallScreen&&(<Td style={{ borderRight: '5px solid #ddd' }}>
        <span className=" max-sm:ml-16">   {riskPremium + MonthlyMinSavings}</span>
        </Td>)
    }
   {
    isIsNotSmallScreen&&( <Td style={{ borderRight: '5px solid #ddd' }}>
      <span  className=" max-sm:ml-16">   {AnnualRiskPremium + AnnualyMinSavings}</span> 
      </Td>)
   }
  </Tr>
  <Tr>
    <Td> Number of Direct Parent in Law</Td>
    <Td>
    <select  disabled={disable}  className=" w-56  hover:border border border-gray-400 hover:border-orange-300 max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor"   onInput={NumberofParentInLaw}>
    <option value="0">0</option>
   <option value="1">1</option>
    <option value="2">2</option>
    </select>
    </Td>
   
  </Tr>
  <Tr>
    <Td>Premium Frequency</Td>
    <Td>
    <select className=" w-56  hover:border border border-gray-400 hover:border-orange-300 max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor" onChange={(e)=>{
     setPremiumFrequency(e.target.value)
    // console.log(e.target.value)
       }}>
    <option value="Monthly">Monthly</option>
   <option value="Annually">Annually</option>
   </select>
    </Td>
   
  </Tr>
  <Tr>
    <Td>Number Of Children</Td>
    <Td>
    <input  disabled={disable} className=" w-56  hover:border border border-gray-400 hover:border-orange-300    max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor"  type="number"   onInput={numberOfChildreen} />
    </Td>
   
  </Tr>
</Tbody>
</Table>

  <div className=" flex justify-center mt-5 ">Covers</div>

  <Table className="" style={{ border: '1px solid #ddd', borderCollapse: 'collapse', fontSize: '14px' }}>
  <Thead>
    <Tr style={{ borderBottom: '10px solid #ddd' }}>
      <Th>Policyholder Sum</Th>
      <Th>Spouse Sum</Th>
      <Th>Kids Sum Insured</Th>
      <Th>Parent Sum</Th>
      <Th>Funeral Amount</Th>
      <Th>Hospital Amount</Th>
      <Th>Driver Emergency</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr style={{ borderBottom: '5px solid #ddd' }}>
      <Td>{PolicyholderSumInsured}</Td>
      <Td>{SpouseSumInsured}</Td>
      <Td>{KidsSumInsured}</Td>
      <Td>{ParentSumInsured}</Td>
      <Td>{FuneralAmount}</Td>
      <Td>{HospitalAmount}</Td>
      <Td>{DriverEmergencyAmount}</Td>
    </Tr>
  </Tbody>
</Table>

    <>
  {isSmallsCreen && (
    <>
    <div className="flex justify-center mt-5">Premium</div>

    <Table className="w-full">
      <Thead className="w-full">
        <Tr className="">
          <Th>MonthlyRisk</Th>
          <Th>AnnuallyRisk</Th>
          <Th>MonthlySaving</Th>
          <Th>AnnuallySaving</Th>
          <Th>TotalPremium</Th>
          <Th>TotalSavings</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>{riskPremium}</Td>
          <Td>{AnnualRiskPremium}</Td>
          <Td>{MonthlyMinSavings}</Td>
          <Td>{AnnualyMinSavings}</Td>
          <Td>{riskPremium + MonthlyMinSavings}</Td>
          <Td> {AnnualRiskPremium + AnnualyMinSavings}</Td>
        </Tr>
      </Tbody>
    </Table>
    </>
  )}
 {
  IsBuyEnabled&&(
    <Zoom>
    <div className=" flex justify-center">
    <button  onClick={HandleBuyInsuranceButtonClicked} type="button" class="  bn-32 bn32  text-white ml-3 mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Buy insurance</button> 
     </div>
     </Zoom>
  )
 }
</>

</>

  )
}


export default FamilyInsurance
