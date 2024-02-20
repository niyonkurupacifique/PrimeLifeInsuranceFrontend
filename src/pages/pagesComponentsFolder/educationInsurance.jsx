import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
function PrimeEducation() {
  const[age,setAge]=useState([])
  const[contributionYear,setContributionYear]=useState([])
  const[benefitYears,setBenefitYear]=useState([])
  const[frequency,setFrequency]=useState([])
  const[ageValue,setAgeValue]=useState(18)
  const[contributionYearValue,setContributionYearValue]=useState(1)
  const[benefitYearValue,setBenefitYearValue]=useState(1)
  const[premiumFrequencyValue,setPremiumFrequencyValue]=useState("monthly")
  const[ratePerMille,setRatePerMille]=useState(12159.441)
  const[endowmentAafterDperiod,setEndowmentAafterDperiod]=useState(0)
  const[endowmentAduringDperiod,setEndowmentAduringDperiod]=useState(0)

const getAge = async () => {
  try {
    const result = await fetch("https://apps.prime.rw/customerbackend/api/ages");
    const result2 = await result.json();
    // console.log("Data from API:", result2); // Add this line to see the data structure
    setAge(result2.ages);
  } catch (error) {
    console.error("Error fetching age data:", error);
  }
};
const getContributionYear = async () => {
  try {
    const result = await fetch("https://apps.prime.rw/customerbackend/api/contributionYear");
    const result2 = await result.json();
    // console.log("Data from API FOR CONTRIBU:", result2); // Add this line to see the data structure
    setContributionYear(result2.contributionYear);
  } catch (error) {
    console.error("Error fetching age data:", error);
  }
};
const getBenefitYear = async () => {
  try {
    const result = await fetch("https://apps.prime.rw/customerbackend/api/benefitYears");
    const result2 = await result.json();
    // console.log("Data from API FOR BENEFIT Y:", result2); // Add this line to see the data structure
    setBenefitYear(result2.benefitYears);
  } catch (error) {
    console.error("Error fetching age data:", error);
  }
};
const getFrequency = async () => {
  try {
    const result = await fetch("https://apps.prime.rw/customerbackend/api/frequency");
    const result2 = await result.json();
    // console.log("Data from API FOR frequ Y:", result2); // Add this line to see the data structure
    setFrequency(result2.frequency);
  } catch (error) {
    console.error("Error fetching age data:", error);
  }
};
useEffect(()=>{
  getAge()
  getContributionYear()
  getBenefitYear()
  getFrequency()
},[])

const getAgeValue=(e)=>{
// console.log(e.target.value)
setAgeValue(e.target.value)
}
const getContributionYearValue=(e)=>{
  // console.log(e.target.value)
  setContributionYearValue(e.target.value)
  }
  const getBenefitYearValue=(e)=>{
    // console.log(e.target.value)
    setBenefitYearValue(e.target.value)
    }
    const getPremiumFrequencyValue=(e)=>{
      // console.log(e.target.value)
      setPremiumFrequencyValue(e.target.value)
      }
     
      const getRatePerMille=async()=>{
           const result=await fetch(`https://apps.prime.rw/customerbackend/api/rate_per_mille?age=${ageValue}&premiumFrequency=${premiumFrequencyValue}&benefitYears=${benefitYearValue}&contributionYears=${contributionYearValue}`)
           const result2=await result.json()
          //  console.log("rate per mille from api:",result2)
           setRatePerMille(result2.rate_per_mille)
      }

      useEffect(()=>{
       getRatePerMille()
      },[ageValue,premiumFrequencyValue,benefitYearValue,contributionYearValue])
      let  Endowment_amount_after_differed_period
      let  Endowment_amount_during_differed_period
    useEffect(()=>{
      Endowment_amount_after_differed_period=10000*ratePerMille/1000
      setEndowmentAafterDperiod(Endowment_amount_after_differed_period)
    },[ratePerMille])
    useEffect(()=>{
    Endowment_amount_during_differed_period=endowmentAafterDperiod/2
    setEndowmentAduringDperiod(Endowment_amount_during_differed_period)
    },[endowmentAafterDperiod])
  return (
    <Table style={{ border: '5px solid #ddd', borderCollapse: 'collapse', fontSize: '14px' }}>
    <Thead>
      <Tr>
        <Th className="border border-gray-400 px-2 py-2">Field</Th>
        <Th className="border border-gray-400 px-2 py-2">Value</Th>
      </Tr>
    </Thead>
    <Tbody>
      {[
        { label: 'Premium', inputType: 'text', onChange: getPremiumFrequencyValue },
        { label: 'Age', inputType: 'select', onChange: getAgeValue, options: age },
        { label: 'Contribution Years', inputType: 'select', onChange: getContributionYearValue, options: contributionYear },
        { label: 'Benefit Years', inputType: 'select', onChange: getBenefitYearValue, options: benefitYears },
        { label: 'Premium Frequency', inputType: 'select', onChange: getPremiumFrequencyValue, options: frequency },
        { label: 'Endowment amount after differed period', inputType: 'number', value: Math.round(endowmentAafterDperiod)},
        { label: 'Endowment amount during deferred period', inputType: 'number', value: Math.round(endowmentAduringDperiod) },
      ].map((item, index) => (
        <Tr key={index}>
          <Td className="border border-gray-400 px-2 py-2">{item.label}</Td>
          <Td className="border border-gray-400 px-2 py-2">
            {item.inputType === 'text' && (
              <input
                onChange={item.onChange}
                type="text"
                className="w-32  flex justify-center sm:w-48 px-2 py-1 border border-gray-400 hover:border hover:border-orange-300 max-sm:w-24 max-sm:border max-sm:border-black dark:bg-darkModeColor mx-auto"
              />
            )}
            {item.inputType === 'select' && (
              <select
                onChange={item.onChange}
                className="w-32 flex justify-center sm:w-48 border border-gray-400 hover:border hover:border-orange-300 max-sm:w-24 max-sm:px-1 dark:bg-darkModeColor mx-auto"
              >
                {item.options.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {item.inputType === 'number' && (
              <input
                value={item.value}
                type="number"
                className="w-32 flex justify-center sm:w-48 border border-gray-400 hover:border hover:border-orange-300 max-sm:w-24 max-sm:border max-sm:border-black dark:bg-darkModeColor mx-auto"
              />
            )}
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
  
  
  );
}

export default PrimeEducation;
