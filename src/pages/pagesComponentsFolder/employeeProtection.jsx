import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Link } from "react-router-dom";
import clsx from 'clsx';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
function EmployerProtection() {
  const[showSalaryWarning,setShowSalaryWarning]=useState(true)
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
    const isMaxSm = window.innerWidth <= 640;
    const[viewCoverHovered,setViewCoverHovered]=useState(false)
    const[viewPremiumHovered,setViewPremiumHovered]=useState(false)
    const[buyInsuranceButtonClicked,setbuyInsuranceButtonClicked]=useState(false)
  const [martualStatus, setMartualStatus] = useState("");
  const [martualStatusCheck, setMartualStatusCheck] = useState(false);
  const [salaryInPut, setSalaryInPut] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [numberOfDirectParent, setNumberOfDirectParent] = useState(0);
  const [numberOfDirectParentInLaw, setNumberOfDirectParentInLaw] = useState(0);
  const [sumInsuredRate, setSumInsuredRate] = useState(6);
  const [funel, setFuneral] = useState("Yes");
  const [savingStatus, setSavingStatus] = useState("Yes");
  const [insuredsharedToSpouse, setInsuredsharedToSpouse] = useState("Yes");
  const [premiumrate, setPremiumrate] = useState(3);
  const [disable, setDisable] = useState(true);
  const [riskPremiumValue, setRiskPremiumValue] = useState(0);
  const [premiumSavings, setPremiumSavings] = useState(0);
  const [riskPremiumAnuallyValue, setRiskPremiumAnuallyValue] = useState(0);
  const [savingsAnually, setSavingsAnually] = useState(0);
  const [deathsumAssuredHolder, setDeathsumAssuredHolder] = useState(0);
  const [permanentSumAssuredHolder, setPermanentSumAssuredHolder] = useState(0);
  const [lossOfRevenueSumAssuredHolder, setLossOfRevenueSumAssuredHolder] =
    useState(0);
  const [funeralFeesSumAssuredHolder, setFuneralFeesSumAssuredHolder] =
    useState(0);
  const [deathSpouseAssuredHolder, setDeathSpouseAssuredHolder] = useState(0);
  const [permanentSpouseAssuredHolder, setPermanentSpouseAssuredHolder] =
    useState(0);
  const [
    lossOfRevenueSpouseAssuredHolder,
    SetLossOfRevenueSpouseAssuredHolder,
  ] = useState(0);
  const [funeralFeesSpouseAssuredHolder, setFuneralFeesSpouseAssuredHolder] =
    useState(0);
    const [theme, setTheme] = useState("light");
    const handleChange = () => {
      setTheme(theme==="dark"?"light":"dark")
  
    };
    useEffect(()=>{
      if(theme==="dark")
      {
       document.documentElement.classList.add("dark")
      }
      else{
        document.documentElement.classList.remove("dark")
      }
    },[theme])
  const Getstatus = (e) => {
    // console.log(e.target.value);
    setMartualStatus(e.target.value);
    setNumberOfChildren(0)

    if (e.target.value === "Single") {
      setMartualStatusCheck(true);
    } else {
      setMartualStatusCheck(false);
    }
    
  };
  const Getsalary = (e) => {
    // console.log("salary is:", e.target.value);
    setSalaryInPut(e.target.value);
    setDisable(false);
    if (e.target.value < 300000) {
      setDisable(true);
      setShowSalaryWarning(true)
    } else {
      setDisable(false);
    }
  };
  const GetnumberOfChild = (e) => {
    // console.log("number of children are:", e.target.value);
    setNumberOfChildren(e.target.value);
  };
  const GetNumberOfDirectParent = (e) => {
    // console.log("number of direct parent are:", parseInt(e.target.value));
    setNumberOfDirectParent(parseInt(e.target.value));
  };
  const GetNumberOfDirectParentInLaw = (e) => {
    // console.log(
    //   "number of direct parent in law are:",
    //   parseInt(e.target.value)
    // );
    setNumberOfDirectParentInLaw(parseInt(e.target.value));
  };
  const GetSumInsuredRate = (e) => {
    // console.log("sum insured rate are:", e.target.value);
    setSumInsuredRate(parseInt(e.target.value));
  };
  const GetFuneral = (e) => {
    // console.log(e.target.value);
    setFuneral(e.target.value);
  };
  const GetSavings = (e) => {
    // console.log(e.target.value);
    setSavingStatus(e.target.value);
  };
  const GetSumInsuredsharedToSpouse = (e) => {
    // console.log(e.target.value);
    setInsuredsharedToSpouse(e.target.value);
  };
  const GetPremiumRate = (e) => {
    // console.log("premium rate are:", e.target.value);
    setPremiumrate(e.target.value);
  };
  useEffect(() => {
    if (salaryInPut >= 300000) {
      setShowSalaryWarning(false)
      let death = sumInsuredRate * salaryInPut;
      // console.log("death amount is:", death);
      let permanentDisability = death;
      let lossOfRevenue = (death * 75) / 100;
      // console.log("permanent disability is", permanentDisability);
      // console.log("loss of revenue  is", lossOfRevenue);
      let funeralFess;
      let PmonthlyFuneralFees;
      let FuneralFeesSumAssuredHolder;
      let FuneralFeesSpouseAssuredHolder;
      if (funel === "No") {
        funeralFess = 0;
        PmonthlyFuneralFees = 0;
        FuneralFeesSumAssuredHolder = 0;
        FuneralFeesSpouseAssuredHolder = 0;
      } else {
        funeralFess = Math.min(1000000, salaryInPut * sumInsuredRate);
        PmonthlyFuneralFees = 2416;
        FuneralFeesSumAssuredHolder = Math.min(
          1000000,
          salaryInPut * sumInsuredRate
        );
        FuneralFeesSpouseAssuredHolder = Math.min(
          1000000,
          salaryInPut * sumInsuredRate
        );
      }
      setFuneralFeesSumAssuredHolder(FuneralFeesSumAssuredHolder);
      setFuneralFeesSpouseAssuredHolder(FuneralFeesSpouseAssuredHolder);
      let DeathsumAssuredHolder;
      let DeathSpouseAssuredHolder;

      if (insuredsharedToSpouse === "No") {
        DeathsumAssuredHolder = salaryInPut * sumInsuredRate;
        DeathSpouseAssuredHolder = 0;
        setDeathSpouseAssuredHolder(DeathSpouseAssuredHolder);
        setDeathsumAssuredHolder(DeathsumAssuredHolder);
        let PermanentSumAssuredHolder = salaryInPut * sumInsuredRate;
        let PermanentSpouseAssuredHolder = 0;
        setPermanentSpouseAssuredHolder(PermanentSpouseAssuredHolder);
        setPermanentSumAssuredHolder(PermanentSumAssuredHolder);
      } else {
        DeathsumAssuredHolder = (salaryInPut * sumInsuredRate * 60) / 100;
        DeathSpouseAssuredHolder = (salaryInPut * sumInsuredRate * 40) / 100;
        setDeathSpouseAssuredHolder(DeathSpouseAssuredHolder);
        setDeathsumAssuredHolder(DeathsumAssuredHolder);
        let PermanentSumAssuredHolder =
          (salaryInPut * sumInsuredRate * 60) / 100;
        let PermanentSpouseAssuredHolder =
          (salaryInPut * sumInsuredRate * 40) / 100;
        setPermanentSpouseAssuredHolder(PermanentSpouseAssuredHolder);
        setPermanentSumAssuredHolder(PermanentSumAssuredHolder);
      }

      let LossOfRevenueSumAssuredHolder = (DeathsumAssuredHolder * 75) / 100;
      setLossOfRevenueSumAssuredHolder(LossOfRevenueSumAssuredHolder);
      SetLossOfRevenueSpouseAssuredHolder(0);

      // console.log("death shared are :", DeathsumAssuredHolder);

      // console.log("funeral fees is:", funeralFess);
      // console.log("Pmonthly funeral fees is:", PmonthlyFuneralFees);
      let PmonthlyDeath =
        (1850 + (death * 4.89477683361112) / 12 / 1000) / 0.85;
      let PmonthlyDeathValue = Math.ceil(PmonthlyDeath);
      let PannualDeath = (PmonthlyDeath * 12) / 1.04 - 1000;
      // console.log("PannualDeath", PmonthlyDeath);
      // console.log("premium monthly Death:", PmonthlyDeathValue);
      let PmonthlyPermanentDisability = (permanentDisability * 1.2) / 1000 / 12;
      let PannualPermanentDisability =
        (PmonthlyPermanentDisability * 12) / 1.04;
      // console.log(
      //   "Premium monthly Permanent Disability is:",
      //   PmonthlyPermanentDisability
      // );
      let PmonthlyLossOfRevenue = (lossOfRevenue * 0.001) / 12;
      let PannualLossOfRevenue = (PmonthlyLossOfRevenue * 12) / 1.04;
      let PannualFuneralFess = (PmonthlyFuneralFees * 12) / 1.04;
      let PmonthlyLossOfRevenueValue = Math.ceil(PmonthlyLossOfRevenue);
      // console.log(
      //   "Premium monthly loss of revenue is:",
      //   PmonthlyLossOfRevenueValue
      // );

      let RiskPremium;
      let RiskPremiumAnnually;
      let additionalAmount;
      let additionalAmountAnnually;
      if(martualStatus === "Other")
      {
        setNumberOfDirectParentInLaw(0)
        if (numberOfChildren > 4 && numberOfDirectParent != 0) {
          const additionalChild = numberOfChildren - 4;
          // console.log("number of children are:", additionalChild);
          additionalAmount = additionalChild * 500;
          additionalAmountAnnually = additionalChild * 6000;
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees +
            additionalAmount +
            2500;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess +
            additionalAmountAnnually +
            2500 * 12;
        }
      }
      else {
        if (
          numberOfChildren > 4 &&
          numberOfDirectParent != 0 &&
          numberOfDirectParentInLaw != 0
        ) {
          const additionalChild = numberOfChildren - 4;
          // console.log("number of children are:", additionalChild);
          additionalAmount = additionalChild * 500;
          additionalAmountAnnually = additionalChild * 6000;
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees +
            additionalAmount +
            5000;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess +
            additionalAmountAnnually +
            2500 * 12 +
            2500 * 12;
        } else if (numberOfChildren > 4 && numberOfDirectParent != 0) {
          const additionalChild = numberOfChildren - 4;
          // console.log("number of children are:", additionalChild);
          additionalAmount = additionalChild * 500;
          additionalAmountAnnually = additionalChild * 6000;
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees +
            additionalAmount +
            2500;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess +
            additionalAmountAnnually +
            2500 * 12;
        } else if (numberOfChildren > 4 && numberOfDirectParentInLaw != 0) {
          const additionalChild = numberOfChildren - 4;
          // console.log("number of children are:", additionalChild);
          additionalAmount = additionalChild * 500;
          additionalAmountAnnually = additionalChild * 6000;
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees +
            additionalAmount +
            2500;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess +
            additionalAmountAnnually +
            2500 * 12;
        } else if (numberOfChildren > 4) {
          const additionalChild = numberOfChildren - 4;
          // console.log("number of children are:", additionalChild);
          additionalAmount = additionalChild * 500;
          // console.log("number of children are:", additionalChild);
          additionalAmountAnnually = additionalChild * 6000;
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees +
            additionalAmount;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess +
            additionalAmountAnnually;
          // console.log(
          //   "p anuaal funeral fees issssssss",
          //   additionalAmountAnnually
          // );
        } else if (
          numberOfDirectParent != 0 &&
          numberOfDirectParentInLaw != 0
        ) {
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees +
            5000;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess +
            2500 * 12 +
            2500 * 12;
        } else if (numberOfDirectParent != 0) {
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees +
            2500;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess +
            2500 * 12;
        } else if (numberOfDirectParentInLaw != 0) {
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees +
            2500;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess +
            2500 * 12;
        } else {
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess;
        }
      }
      
      if (martualStatus === "Single") {
        RiskPremium =
          PmonthlyDeath +
          PmonthlyPermanentDisability +
          PmonthlyLossOfRevenue +
          PmonthlyFuneralFees;
        RiskPremiumAnnually =
          PannualDeath +
          PannualPermanentDisability +
          PannualLossOfRevenue +
          PannualFuneralFess;
      }  else {
        if (
          numberOfChildren > 4 &&
          numberOfDirectParent != 0 &&
          numberOfDirectParentInLaw != 0
        ) {
          const additionalChild = numberOfChildren - 4;
          // console.log("number of children are:", additionalChild);
          additionalAmount = additionalChild * 500;
          additionalAmountAnnually = additionalChild * 6000;
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees +
            additionalAmount +
            5000;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess +
            additionalAmountAnnually +
            2500 * 12 +
            2500 * 12;
        } else if (numberOfChildren > 4 && numberOfDirectParent != 0) {
          const additionalChild = numberOfChildren - 4;
          // console.log("number of children are:", additionalChild);
          additionalAmount = additionalChild * 500;
          additionalAmountAnnually = additionalChild * 6000;
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees +
            additionalAmount +
            2500;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess +
            additionalAmountAnnually +
            2500 * 12;
        } else if (numberOfChildren > 4 && numberOfDirectParentInLaw != 0) {
          const additionalChild = numberOfChildren - 4;
          // console.log("number of children are:", additionalChild);
          additionalAmount = additionalChild * 500;
          additionalAmountAnnually = additionalChild * 6000;
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees +
            additionalAmount +
            2500;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess +
            additionalAmountAnnually +
            2500 * 12;
        } else if (numberOfChildren > 4) {
          const additionalChild = numberOfChildren - 4;
          // console.log("number of children are:", additionalChild);
          additionalAmount = additionalChild * 500;
          // console.log("number of children are:", additionalChild);
          additionalAmountAnnually = additionalChild * 6000;
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees +
            additionalAmount;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess +
            additionalAmountAnnually;
          // console.log(
          //   "p anuaal funeral fees issssssss",
          //   additionalAmountAnnually
          // );
        } else if (
          numberOfDirectParent != 0 &&
          numberOfDirectParentInLaw != 0
        ) {
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees +
            5000;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess +
            2500 * 12 +
            2500 * 12;
        } else if (numberOfDirectParent != 0) {
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees +
            2500;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess +
            2500 * 12;
        } else if (numberOfDirectParentInLaw != 0) {
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees +
            2500;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess +
            2500 * 12;
        } else {
          RiskPremium =
            PmonthlyDeath +
            PmonthlyPermanentDisability +
            PmonthlyLossOfRevenue +
            PmonthlyFuneralFees;
          RiskPremiumAnnually =
            PannualDeath +
            PannualPermanentDisability +
            PannualLossOfRevenue +
            PannualFuneralFess;
        }
      }
      let RiskPremiumValue = Math.floor(RiskPremium);
      let RiskPremiumAnnuallyValue = Math.round(RiskPremiumAnnually);
      // console.log("risk premium value are:", RiskPremiumValue);
      setRiskPremiumValue(RiskPremiumValue);
      setRiskPremiumAnuallyValue(RiskPremiumAnnuallyValue);
      let savings;
      let savingsAnually;
      if (savingStatus === "Yes") {
        if(martualStatus === "Other")
        {

        }
        if (martualStatus === "Single") {
          savings = (salaryInPut * premiumrate) / 100 - RiskPremiumValue;
          savingsAnually =
            ((salaryInPut * premiumrate) / 100) * 12 - RiskPremiumAnnuallyValue;
        }  else {
          if (
            numberOfChildren > 4 &&
            numberOfDirectParent != 0 &&
            numberOfDirectParentInLaw != 0
          ) {
            savings =
              (salaryInPut * premiumrate) / 100 -
              (RiskPremiumValue - additionalAmount - 5000);
            const additionalChild = numberOfChildren - 4;
            // console.log("number of children are:", additionalChild);
            additionalAmount = additionalChild * 500;
            additionalAmountAnnually = additionalChild * 6000;
            savingsAnually =
              ((salaryInPut * premiumrate) / 100) * 12 -
              (RiskPremiumAnnuallyValue -
                additionalAmountAnnually -
                2500 * 12 -
                2500 * 12);
            // console.log("aaaaaaaa:", salaryInPut);
          } else if (numberOfChildren > 4 && numberOfDirectParent != 0) {
            savings =
              (salaryInPut * premiumrate) / 100 -
              (RiskPremiumValue - additionalAmount - 2500);
            savingsAnually =
              ((salaryInPut * premiumrate) / 100) * 12 -
              (RiskPremiumAnnuallyValue - additionalAmountAnnually - 2500 * 12);
          } else if (numberOfChildren > 4 && numberOfDirectParentInLaw != 0) {
            savings =
              (salaryInPut * premiumrate) / 100 -
              (RiskPremiumValue - additionalAmount - 2500);
            savingsAnually =
              ((salaryInPut * premiumrate) / 100) * 12 -
              (RiskPremiumAnnuallyValue - additionalAmountAnnually - 2500 * 12);
          } else if (numberOfChildren > 4) {
            savings =
              (salaryInPut * premiumrate) / 100 -
              (RiskPremiumValue - additionalAmount);
            savingsAnually =
              ((salaryInPut * premiumrate) / 100) * 12 -
              (RiskPremiumAnnuallyValue - additionalAmountAnnually);
          } else if (
            numberOfDirectParent != 0 &&
            numberOfDirectParentInLaw != 0
          ) {
            savings =
              (salaryInPut * premiumrate) / 100 - (RiskPremiumValue - 5000);
            savingsAnually =
              ((salaryInPut * premiumrate) / 100) * 12 -
              (RiskPremiumAnnuallyValue - 2500 * 12 - 2500 * 12);
          } else if (numberOfDirectParent != 0) {
            savings =
              (salaryInPut * premiumrate) / 100 - (RiskPremiumValue - 2500);
            savingsAnually =
              ((salaryInPut * premiumrate) / 100) * 12 -
              (RiskPremiumAnnuallyValue - 2500 * 12);
          } else if (numberOfDirectParentInLaw != 0) {
            savings =
              (salaryInPut * premiumrate) / 100 - (RiskPremiumValue - 2500);
            savingsAnually =
              ((salaryInPut * premiumrate) / 100) * 12 -
              (RiskPremiumAnnuallyValue - 2500 * 12);
          } else {
            savings = (salaryInPut * premiumrate) / 100 - RiskPremiumValue;
            savingsAnually =
              ((salaryInPut * premiumrate) / 100) * 12 -
              RiskPremiumAnnuallyValue;
          }
        }
      } else {
        savings = 0;
        savingsAnually = 0;
      }

      // console.log("savings are:", Math.floor(savings));
      setPremiumSavings(Math.floor(savings));
      setSavingsAnually(Math.round(savingsAnually));
    } else {
      setRiskPremiumValue(0);
      setRiskPremiumAnuallyValue(0);
      setPremiumSavings(0);
      setSavingsAnually(0);
    }

  }, [
    salaryInPut,
    insuredsharedToSpouse,
    sumInsuredRate,
    funel,
    savingStatus,
    premiumrate,
    numberOfChildren,
    numberOfDirectParent,
    numberOfDirectParentInLaw,
    martualStatus,
  ]);


    const handleContinue=()=>{
      // console.log("clicked")
    }
  
  return (

 <>
    <div className="  flex justify-center max-sm:overflow-hidden">

   {
    showSalaryWarning&&(
      <div id="toast-warning" class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
      <div  class="inline-flex  animate-bounce items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
          <svg  class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
          </svg>
          <span class="sr-only">Warning icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">Please enter your salary; the minimum is 300,000 Rwf.</div>
      <button onClick={()=>setShowSalaryWarning(false)}  type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
      </button>
  </div>
    )
   }

    </div>
   
 <Table  style={{ border: '5px solid #ddd', borderCollapse: 'collapse', fontSize: '14px' }}>
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
    <select 
   className="w-full border border-gray-400  hover:border hover:border-orange-300  max-sm:border max-sm:border-black max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor"
     defaultValue={""}
   disabled={disable}
     onChange={Getstatus}
        >
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
        <span className=" max-sm:ml-7">{riskPremiumValue}</span>
         </Td>)
    }
   {
    isIsNotSmallScreen&&( <Td style={{ borderRight: '5px solid #ddd' }}>
      <span className=" max-sm:ml-16">{riskPremiumAnuallyValue}</span>
      </Td>)
   }
  </Tr>
  <Tr>
    <Td>Monthly Salary</Td>
    <Td>
    <input
      className={`${
        showSalaryWarning ? "border-red-500" : ""
      } hover:border border w-full border-gray-400 hover:border-orange-300 max-sm:border max-sm:border-black max-sm:w-24 dark:bg-darkModeColor`}
      
     type="number"
     onChange={Getsalary}
     value={salaryInPut}
       />
   </Td>
   {
    isIsNotSmallScreen&&( <Td style={{ borderRight: '5px solid #ddd' }}>Saving Premium</Td>)
   }
   {
    isIsNotSmallScreen&&( <Td style={{ borderRight: '5px solid #ddd' }}>
      <span className=" max-sm:ml-16">{premiumSavings}</span> 
      </Td>)
   }
   {
    isIsNotSmallScreen&&( <Td style={{ borderRight: '5px solid #ddd' }}>
      <span className=" max-sm:ml-16">{savingsAnually}</span>
      </Td>)
   }
  </Tr>
  <Tr>
    <Td> Number of childreen</Td>
    <Td>
    <input       
    value={numberOfChildren}  className="max-sm:w-24 w-full border border-gray-400 hover:border hover:border-orange-300  max-sm:border max-sm:border-black   dark:bg-darkModeColor"
   type="number"
    disabled={disable}
    onChange={GetnumberOfChild}
                      />
    </Td>
    {
      isIsNotSmallScreen&&(<Td style={{ borderRight: '5px solid #ddd' }}>Total Premium</Td>)
    }
    {
      isIsNotSmallScreen&&(<Td style={{ borderRight: '5px solid #ddd' }}>
        <span className=" max-sm:ml-16">   {riskPremiumValue + premiumSavings}</span>
        </Td>)
    }
   {
    isIsNotSmallScreen&&( <Td style={{ borderRight: '5px solid #ddd' }}>
      <span  className=" max-sm:ml-16">   {riskPremiumAnuallyValue + savingsAnually}</span> 
      </Td>)
   }
  </Tr>
  <Tr>
    <Td> Number of Direct Parent</Td>
    <Td>
    <select
   className="w-full border border-gray-400  hover:border  hover:border-orange-300  max-sm:border max-sm:border-black max-sm:w-24 dark:bg-darkModeColor"
     disabled={disable}
       onChange={GetNumberOfDirectParent}
         >
      <option value="0">0</option>
       <option value="1">1</option>
      <option value="2">2</option>
      </select>
    </Td>
   
  </Tr>
  <Tr>
    <Td> Number of Direct Parent in law</Td>
    <Td>
    <select
   className="w-full border border-gray-400 hover:border hover:border-orange-300 max-sm:w-24  max-sm:border max-sm:border-black  dark:bg-darkModeColor"
    disabled={disable}
    onChange={GetNumberOfDirectParentInLaw}
     >
   <option value="0">0</option>
   <option value="1">1</option>
    <option value="2">2</option>
   </select>
    </Td>
   
  </Tr>
  <Tr>
    <Td> Funeral</Td>
    <Td>
    <select
   className="w-full border border-gray-400 hover:border hover:border-orange-300 max-sm:w-24  max-sm:border max-sm:border-black dark:bg-darkModeColor"
  disabled={disable}
     onChange={GetFuneral}
      >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
    </Td>
   
  </Tr>
  <Tr>
    <Td>  Savings</Td>
    <Td>
    <select
   className="w-full border border-gray-400 hover:border hover:border-orange-300 max-sm:w-24  max-sm:border max-sm:border-black dark:bg-darkModeColor"
       disabled={disable}
        onChange={GetSavings}
        >
        <option value="Yes">Yes</option>
         <option value="No">No</option>
     </select>
    </Td>
   
  </Tr>

  <Tr>
    <Td>Sum Insured shared  to spouse</Td>
    <Td>
    <select
                        className="w-full  border border-gray-400 hover:border hover:border-orange-300 max-sm:w-24  max-sm:border max-sm:border-black dark:bg-darkModeColor"
                        disabled={disable}
                        onChange={GetSumInsuredsharedToSpouse}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
    </Td>
   
  </Tr>
  <Tr>
    <Td>Sum Insured rate</Td>
    <Td>
    <select
      className="w-full border border-gray-400 hover:border hover:border-orange-300   max-sm:w-24  max-sm:border max-sm:border-black dark:bg-darkModeColor"
        disabled={disable}
       onChange={GetSumInsuredRate}
       >
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="24">24</option>
        <option value="15">15</option>
        </select>
    </Td>
   
  </Tr>
  <Tr>
    <Td>Premium rate</Td>
    <Td>
    <select
                      className="w-full border border-gray-400  hover:border hover:border-orange-300  max-sm:w-24  max-sm:border max-sm:border-black dark:bg-darkModeColor"
                      disabled={disable}
                      onChange={GetPremiumRate}
                    >
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                    </select>
    </Td>
   
  </Tr>

  {/* <Tr>
    <Td>Premium Frequency</Td>
    <Td>
    <select className=" w-56  hover:border border border-gray-400 hover:border-orange-300 max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor" onChange={(e)=>{
     setPremiumFrequency(e.target.value)
    console.log(e.target.value)
       }}>
    <option value="Monthly">Monthly</option>
   <option value="Annually">Annually</option>
   </select>
    </Td>
   
  </Tr> */}
 
</Tbody>
</Table>

  <div className=" flex justify-center mt-5 ">Covers</div>
  
  <Table style={{ border: '5px solid #ddd', borderCollapse: 'collapse', fontSize: '14px' }}>
  <Thead>
    <Tr style={{ borderBottom: '2px solid #ddd' }}>
      <Th className="absolute pl-10" style={{ borderRight: '1px solid #ddd' }}>Covers</Th>
      <Th style={{ borderRight: '1px solid #ddd' }}> <span className=" max-sm:text-sm">Sum Assured  <span className=" max-sm:hidden">Policy Holder</span> </span></Th>
      <Th className=""> <span className=" max-sm:text-sm">Spouse Assured </span> <span className=" max-sm:hidden">Policy Holder</span></Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr style={{ borderBottom: '1px solid #ddd' }}>
      <Td style={{ borderRight: '1px solid #ddd' }}>Death</Td>
      <Td style={{ borderRight: '1px solid #ddd' }}>{deathsumAssuredHolder}</Td>
      <Td>{deathSpouseAssuredHolder}</Td>
    </Tr>
    <Tr style={{ borderBottom: '1px solid #ddd' }}>
      <Td style={{ borderRight: '1px solid #ddd' }}>Permanent Disability</Td>
      <Td style={{ borderRight: '1px solid #ddd' }}>{permanentSumAssuredHolder}</Td>
      <Td>{permanentSpouseAssuredHolder}</Td>
    </Tr>
    <Tr style={{ borderBottom: '1px solid #ddd' }}>
      <Td style={{ borderRight: '1px solid #ddd' }}>Loss of Revenue</Td>
      <Td style={{ borderRight: '1px solid #ddd' }}>{lossOfRevenueSumAssuredHolder}</Td>
      <Td>{lossOfRevenueSpouseAssuredHolder}</Td>
    </Tr>
    <Tr>
      <Td style={{ borderRight: '1px solid #ddd' }}>Funeral Fees</Td>
      <Td style={{ borderRight: '1px solid #ddd' }}>{funeralFeesSumAssuredHolder}</Td>
      <Td>{funeralFeesSpouseAssuredHolder}</Td>
    </Tr>
  </Tbody>
</Table>





  {/* <Table className="">
      <Thead>
        <Tr>
          <Th >PolicyholderSum </Th>
          <Th > SpouseSum </Th>
          <Th > Death</Th>
          <Th >Permanent Disability</Th>
          <Th >Loss of Revenue</Th>
          <Th >Funeral Fees</Th>
          <Th >DriverEmergency</Th>
        
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>{PolicyholderSumInsured}</Td>
          <Td>{SpouseSumInsured}</Td>
          <Td>{KidsSumInsured}</Td>
          <Td>{ParentSumInsured}</Td>
          <Td>{FuneralAmount}</Td>
          <Td>{HospitalAmount}</Td>
          <Td>{DriverEmergencyAmount}</Td>
        </Tr>
        
      </Tbody>
    </Table> */}
    <>
  {isSmallsCreen && (
    <>
    <div className="flex justify-center mt-5">Premium</div>

    <Table  style={{ border: '5px solid #ddd', borderCollapse: 'collapse', fontSize: '14px' }} className="w-full">
      <Thead className="w-full">
        <Tr className="">
          <Th >MonthlyRisk</Th>
          <Th>AnnuallyRisk</Th>
          <Th>MonthlySaving</Th>
          <Th>AnnuallySaving</Th>
          <Th>TotalPremium</Th>
          <Th>TotalSavings</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>{riskPremiumValue}</Td>
          <Td>{riskPremiumAnuallyValue}</Td>
          <Td>{premiumSavings}</Td>
          <Td>{savingsAnually}</Td>
          <Td>{riskPremiumValue + premiumSavings}</Td>
          <Td> {riskPremiumAnuallyValue + savingsAnually}</Td>
        </Tr>
      </Tbody>
    </Table>
    </>
  )}
 
</>

</>

  )
}


export default EmployerProtection
