import React, { useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import { useContext } from 'react';
import { OpenModalContext } from '../context';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { MdDone } from "react-icons/md";
import { FcDownload } from "react-icons/fc";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
// import Signature from '/Images/StampCEO.jpg'

 import Signature from '../pagesComponentsFolder/Images/StampCEO.jpg'
 import primeLogo from '../pagesComponentsFolder/Images/PrimeLifeLogo.jpg'

// import primeLogo from '/Images/PrimeLifeLogo.jpg'
import CircularProgress from '@mui/material/CircularProgress';
import "jspdf-autotable";
export default function MyPolicies(props) {
  const [data,setData]=useState([])
  const [loadingRows, setLoadingRows] = useState({}); 
 

  const[InsuranceDetails,setInsuranceDetails]=useState()
  const [selectedRow, setSelectedRow] = useState(null);

   const nationalId=sessionStorage.getItem("nationalId")
   const telephone=localStorage.getItem("usernamee")
  const [EmployeeInsurancePaymentsDetails,setEmployeeInsurancePaymentDetails]=useState()
  const [EducationInsurancePaymentsDetails,setEducationInsurancePaymentDetails]=useState()
  const[PansionAndSavingInsurancePayments,setPansionAndSavingInsurancePayments]=useState()
  const fetchMyPolicies = async () => {
    try {
      const result = await fetch("https://apps.prime.rw/customerbackend/api/view_all_policies_statements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "nationalId":nationalId,
          "telephone":telephone,
        }),
      });
      
      const result2=await result.json()
      console.log("my policies areee",result2)
      if(Array.isArray(result2))
      {
        setData(result2)
      }
      else{
        setData([result2])
      }
       

    } catch (error) {
      console.error("Error during fetch:", error);
    }
  }; 
  
  
  
   
  


  const handleDownloadPDF = async(row) => {

  console.log('products is',row.products)
  console.log("item is ",row.schemeId)
    setLoadingRows((prevLoadingRows) => ({ ...prevLoadingRows, [row.policyNumber]: true }));
       
   

    //////////////////  employeee ////////////////



   if(row.products==="Employee Protection"){
    try {
      
      const pdf = new jsPDF();
      const headerStyle = { fillColor: [21, 159, 219] };
      const result=await fetch(`https://apps.prime.rw/customerbackend/api/statement/employee/${row.policyNumber}`)
      const result2=await result.json()
      console.log("hello world ")
      
      setEmployeeInsurancePaymentDetails(result2[0].paymentStatements)

      console.log("data in employee is",result2[0].epiInsuredDetails)
      let nullAmountCounti =result2[0].paymentStatements.filter((item) => {
        return new Date(item.paymentPeriod) <= new Date() && item.amountPayed === null;
      }).length
      console.log(" nullamount count",nullAmountCounti); 
       
      const insuredDetails =result2[0].epiInsuredDetails;
      const Schemename=insuredDetails.schemeName
      const schemeId = insuredDetails.schemeId;
      const fullName = insuredDetails.fullName;
      const sex=insuredDetails.gender;
      let email=""
      if(insuredDetails.email!=null)
      {
       email=insuredDetails.email;
      }
     
      

      const mobileNumber=insuredDetails.phoneNumber1
      const ResidenceProvince=insuredDetails.issuedProvince
      const ResidenceSector=insuredDetails.issuedSector
      const maturityDate=insuredDetails.maturityDate
      const riskPremium=insuredDetails.riskPremium
      const SubscriberSumInsured=insuredDetails.ppdsi
      const totalAmountPayed=result2[0].paymentStatements[0].totalAmountDue
     const policyTerm=insuredDetails.policyTermYears
      const premiumFrequency=insuredDetails.premiumFrequency
      const policyNumber=insuredDetails.policyNumber
      const Civilstatus=insuredDetails.martialStatus
      const Dateofbirth=insuredDetails.dateOfBirth 
      const IdNumber=insuredDetails.idDocumentNumber
      const ResidenceDistrict=insuredDetails.issuedDistrict
      const effectiveDate=insuredDetails.effectiveDate
       const premium=insuredDetails.riskPremium
       const TotalRiskPremium=insuredDetails.riskPremium
       
        // Add Prime logo at the top
      pdf.addImage('https://apps.prime.rw/customerportal/images/primelogo.png', 'png', 14, 7,0,25);
    
      const titleMargin = 10;
      const titleY = 39; // Adjusted startY value with margin
      const titleYY =52;
      const titleX = 18; // Adjust as needed
    
      pdf.setFontSize(15);

      const textWidth = pdf.getStringUnitWidth('EMPLOYEE PROTECTION INSURANCE PAYMENT STATEMENT') ;
      
      const rectHeight = -3; // Height of the border rectangle
      const centerY = titleY - (rectHeight / 2); // Center of the rectangle on the y-axis
      const centerYY = titleYY
      const centerYYY=120
      const rectWidth = textWidth + 10; // Extra 10 for padding
      const centerX = titleX - 40 + rectWidth / 2;
    
      pdf.text('EMPLOYEE PROTECTION INSURANCE PAYMENT STATEMENT',30, centerY);
      pdf.text('Insured Details', 85, centerYY, { decoration: 'underline' });
      pdf.rect(80 ,54, pdf.getStringUnitWidth('Insured Details') * 6+7,0); // Border around the title

      pdf.text('Policy Payment Details', 85, centerYYY);
      pdf.rect(78 ,122, pdf.getStringUnitWidth('Policy Payment Details') * 6+7,0); // Border around the title
      
      pdf.rect(titleX , titleY - 5, pdf.getStringUnitWidth('EMPLOYEE PROTECTION INSURANCE PAYMENT STATEMENT') * 6 + 10, 10); // Border around the title
    
      
  /////column 1 /////////// 
  
  
  pdf.setFontSize(8)
  pdf.setFont(undefined, 'bold')
  pdf.text(`Scheme name: ${Schemename}`, 20, 60).setFont(undefined, 'bold');
  pdf.text(`Sex: ${sex}`, 20, 65).setFont(undefined, 'bold');
  pdf.text(`Email: ${email}`, 20, 70).setFont(undefined, 'bold');
  pdf.text(`Mobile number: ${mobileNumber}`, 20, 75).setFont(undefined, 'bold');
  pdf.text(`Residence Province: ${ResidenceProvince}`, 20, 80).setFont(undefined, 'bold');
  pdf.text(`Residence Sector: ${ResidenceSector}`, 20, 85).setFont(undefined, 'bold');
  pdf.text(`Maturity date: ${maturityDate}`, 20, 90).setFont(undefined, 'bold');
  pdf.text(`Risk Premium: ${riskPremium} Rwf`, 20, 95).setFont(undefined, 'bold');
  pdf.text(`Subscriber Sum Insured: ${SubscriberSumInsured} Rwf`, 20, 100).setFont(undefined, 'bold');
  pdf.text(`Total Amount Payed  : ${totalAmountPayed} Rwf`, 20, 105).setFont(undefined, 'bold');
  
  
  
  //////////// column 2 /////////////////////////
  
  pdf.text(`Scheme number : ${schemeId}`,142, 60).setFont(undefined, 'bold');
  pdf.text(`Policy number : ${policyNumber}`, 142, 65).setFont(undefined, 'bold');
  pdf.text(`Civil status : ${Civilstatus}`,142, 70).setFont(undefined, 'bold');
  pdf.text(`Date of birth : ${Dateofbirth}`, 142, 75).setFont(undefined, 'bold');
  pdf.text(`ID/Passport number : ${IdNumber}`, 142, 80).setFont(undefined, 'bold');
  pdf.text(`Residence District : ${ResidenceDistrict}`,142, 85).setFont(undefined, 'bold');
  pdf.text(`Effective date  : ${effectiveDate}`, 142, 90).setFont(undefined, 'bold');
  pdf.text(`Policy Term  : ${policyTerm} Years`,142, 95).setFont(undefined, 'bold');
  pdf.text(`Premium frequency : ${premiumFrequency}`,142, 100).setFont(undefined, 'bold');
  pdf.text(`Total Risk Premium : ${TotalRiskPremium} Rwf`,142, 105).setFont(undefined, 'bold');
  pdf.text(`Oustanding Amount: ${nullAmountCounti*premium} Rwf`,142, 110).setFont(undefined, 'bold');
  
  
     
     
      pdf.autoTable({
        head: [['Reference', 'PaymentDate', 'ProofOfPayment', 'Observation', 'Amount Payed ']],
        body: result2[0].paymentStatements.filter((items)=> new Date(items.paymentPeriod)<=new Date()).map(item => [
          item.referencePay, 
          item.paymentDate,
          item.proofOfPayment,
          item.comments,
          item.amountPayed
        ]),
        
        styles: {
          cellPadding:1, // Add padding to cells
          lineWidth: 0.1,
          lineColor: [0, 0, 0],
          fontSize: 7.3,
          halign: 'center',
          valign: 'middle',
          overflow: 'linebreak', 
          cellWidth: 'wrap',
          tableWidth: 'auto',
          bodyStyles: {
            lineWidth: 0.1,
            lineColor: [0, 0, 0] // Add borders around all cells
          },
          headStyles: {
            lineWidth: 0.1,
            lineColor: [0, 0, 0], 
            fillColor: [22,160,219] // Add background color to header cells
          }
        },
        startY:125,
        showHead: 'firstPage'
      });
     
      
      
     
  
      const signatureX = pdf.internal.pageSize.width - 75;
    
      pdf.addImage('https://apps.prime.rw/customerportal/images/stamp.png', 'png', signatureX, pdf.internal.pageSize.height - 45, 65, 45);
    
      pdf.save(`${fullName}'EPI-Policy.pdf`);

    } catch (error) {
      console.error(error)  
    }
    finally {
      // Reset loading state for the clicked row
      setLoadingRows((prevLoadingRows) => ({ ...prevLoadingRows, [row.policyNumber]: false }));
    }
   }
  //////////////////////////////// employee end //////////////////////////


 ////////////////////////////////////////////// education start////////////////////


 if(row.products==="Education"){
  try {
    
    const pdf = new jsPDF();
    const headerStyle = { fillColor: [21, 159, 219] };
    const result=await fetch(`https://apps.prime.rw/customerbackend/api/statement/education/${row.policyNumber}`)
    const result2=await result.json()
    console.log("hello world ") 
    
    setEducationInsurancePaymentDetails(result2[0].paymentStatements)

    console.log("data in employee is",result2[0].educationInsuredDetails)
    let nullAmountCounti =result2[0].paymentStatements.filter((item) => {
      return new Date(item.paymentPeriod) <= new Date() && item.amountPayed === null;
    }).length


    let PremiumCount =result2[0].paymentStatements.filter((item) => {
      return new Date(item.paymentPeriod) <= new Date() 
    }).length
    console.log(" premium count is", PremiumCount); 
    
    const insuredDetails =result2[0].educationInsuredDetails;
     console.log(" total amount payedd",result2[0].totalAmountPayed)
    
    const fullName = insuredDetails.fullName; //
    const mobileNumber=insuredDetails.subscriberPhoneNumber //   
    const maturityDate=insuredDetails.endDate // 
    const totalAmountPayed=result2[0].totalAmountPayed//
    const premiumFrequency=insuredDetails.paymentFrequency //
    const policyNumber=insuredDetails.policyNumberEndo  // 
    const IdNumber=insuredDetails.idDocumentNumber   //
    const endContributionDate=insuredDetails.endDate //
    const amountAfterDeffered=insuredDetails.amtAfterDiffered//
    const amountDuringDefered=insuredDetails.amtDuringDiffered //
    const effectiveDate=insuredDetails.startDate //
     const premium=insuredDetails.premium   //
     const TotalRiskPremium=insuredDetails.premiums //
     const schemaName=insuredDetails.schemeName //
     
      // Add Prime logo at the top
    pdf.addImage('https://apps.prime.rw/customerportal/images/primelogo.png', 'png', 14, 7,0,25);
  
    const titleMargin = 10;
    const titleY = 39; // Adjusted startY value with margin
    const titleYY =52;
    const titleX = 18; // Adjust as needed
  
    pdf.setFontSize(15);

    const textWidth = pdf.getStringUnitWidth('EDUCATION ENDOWMENT PAYMENT STATEMENT') ;
    
    const rectHeight = -3; // Height of the border rectangle
    const centerY = titleY - (rectHeight / 2); // Center of the rectangle on the y-axis
    const centerYY = titleYY
    const centerYYY=120
    const rectWidth = textWidth + 10; // Extra 10 for padding
    const centerX = titleX - 40 + rectWidth / 2;
  
    pdf.text('EDUCATION ENDOWMENT PAYMENT STATEMENT',30, centerY);
    pdf.text('Insured Details', 85, centerYY, { decoration: 'underline' });
    pdf.rect(80 ,54, pdf.getStringUnitWidth('Insured Details') * 6+7,0); // Border around the title

    pdf.text('Policy Payment Details', 85, centerYYY);
    pdf.rect(78 ,122, pdf.getStringUnitWidth('Policy Payment Details') * 6+7,0); // Border around the title
    
    pdf.rect(titleX , titleY - 5, pdf.getStringUnitWidth('EDUCATION ENDOWMENT PAYMENT STATEMENT') * 7 + 10, 10); // Border around the title
  
    
/////column 1 /////////// 


pdf.setFontSize(8)
pdf.setFont(undefined, 'bold')
pdf.text(`Insured: ${fullName}`, 20, 60).setFont(undefined, 'bold');
pdf.text(`Policy number: ${policyNumber}`, 20, 65).setFont(undefined, 'bold');
pdf.text(`ID/Passport number: ${IdNumber}`, 20, 70).setFont(undefined, 'bold');
pdf.text(`End Contribution Date: ${endContributionDate}`, 20, 75).setFont(undefined, 'bold');
pdf.text(`Premium : ${premium}`, 20, 80).setFont(undefined, 'bold');
pdf.text(`Amt After Differed: ${amountAfterDeffered}`, 20, 85).setFont(undefined, 'bold');
pdf.text(`Total Premium: ${PremiumCount*premium}`, 20, 90).setFont(undefined, 'bold');
pdf.text(`Oustanding Amount: ${nullAmountCounti*premium}`, 20, 95).setFont(undefined, 'bold');




//////////// column 2 /////////////////////////

pdf.text(`Scheme name : ${schemaName}`,142, 60).setFont(undefined, 'bold');
pdf.text(`Mobile number : ${mobileNumber}`, 142, 65).setFont(undefined, 'bold');
pdf.text(`Effective date : ${effectiveDate}`,142, 70).setFont(undefined, 'bold');
pdf.text(`Maturity date : ${maturityDate}`,142, 75).setFont(undefined, 'bold');
pdf.text(`Premium frequency : ${premiumFrequency}`, 142, 80).setFont(undefined, 'bold');
pdf.text(`Amt During Differed : ${amountDuringDefered}`, 142, 85).setFont(undefined, 'bold');
pdf.text(`Total Amount Payed : ${totalAmountPayed}`,142, 90).setFont(undefined, 'bold');



   
   
    pdf.autoTable({
      head: [['Reference','PaymentPeriod', 'PaymentDate', 'ProofOfPayment', 'Amount Payed ']],
      body: result2[0].paymentStatements.filter((items)=> new Date(items.paymentPeriod)<=new Date()).map(item => [
        item.referencePay, 
        item.paymentPeriod,
        item.paymentDate,
        item.proofOfPayment,
        item.amountPayed
      ]),
      
      styles: {
        cellPadding:1, // Add padding to cells
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        fontSize: 7.3,
        halign: 'center',
        valign: 'middle',
        overflow: 'linebreak', 
        cellWidth: 'wrap',
        tableWidth: 'auto',
        bodyStyles: {
          lineWidth: 0.1,
          lineColor: [0, 0, 0] // Add borders around all cells
        },
        headStyles: {
          lineWidth: 0.1,
          lineColor: [0, 0, 0], 
          fillColor: [22,160,219] // Add background color to header cells
        }
      },
      startY:125,
      showHead: 'firstPage'
    });
   
    
    
   

    const signatureX = pdf.internal.pageSize.width - 75;
  
    pdf.addImage('https://apps.prime.rw/customerportal/images/stamp.png', 'png', signatureX, pdf.internal.pageSize.height - 45, 65, 45);
  
    pdf.save(`${fullName}'Education-Policy.pdf`);

  } catch (error) {
    console.error(error)  
  }
  finally {
    // Reset loading state for the clicked row
    setLoadingRows((prevLoadingRows) => ({ ...prevLoadingRows, [row.policyNumber]: false }));
  }
 }




//////////////// education end///////////////////////////////////




  /////////////// PANSION AND SAVING START/////////////////////////////////



  if(row.products==="Pension and Savings" && row.schemeId!="IKIMINA".toLocaleLowerCase()){
    try {
      
      const pdf = new jsPDF();
      const headerStyle = { fillColor: [21, 159, 219] };
      const result=await fetch(`https://apps.prime.rw/customerbackend/api/statement/employee/saving/${row.policyNumber}`)
      const result2=await result.json()
      console.log("hello world ") 
       
      setPansionAndSavingInsurancePayments(result2[0].paymentStatements)
  
      let nullAmountCounti =result2[0].paymentStatements.filter((item) => {
        return new Date(item.paymentDate) <= new Date() && item.amountPayed === null;
      }).length
     console.log("atishyuwe ni",nullAmountCounti*result2[0].epiInsuredDetails.contribution)
  
      
      
      const insuredDetails =result2[0].epiInsuredDetails;  
      const fullName = insuredDetails.accountName; ////
      const policyNumber=insuredDetails.policyNumberMain  //// 
      const effectiveDate=new Date(insuredDetails.accountOpenDate )
      const options = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    };
    const formattedDate =effectiveDate.toLocaleDateString('en-US', options);
      const StatementDate = new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      });

      const lastPaymentStatement = result2[0].paymentStatements[result2[0].paymentStatements.length - 1];
     
      const Currentcontribution=lastPaymentStatement.amountPayed  ////
  
  
      const Totalcontribution=result2[0].totalAmountPayed; /////
      const SurrenderAmount=result2[0].surrenderAmount //////

      console.log("surrender amount is",SurrenderAmount)
      const currentFundValue=result2[0].currentFundValue  //////
       
       
        // Add Prime logo at the top
      pdf.addImage('https://apps.prime.rw/customerportal/images/primelogo.png', 'png', 14, 7,0,25);
    
      const titleMargin = 10;
      const titleY = 39; // Adjusted startY value with margin
      const titleYY =52;
      const titleX = 18; // Adjust as needed
    
      pdf.setFontSize(15);
  
      const textWidth = pdf.getStringUnitWidth('INDIVIDUAL STATEMENT') ;
      
      const rectHeight = -3; // Height of the border rectangle
      const centerY = titleY - (rectHeight / 2); // Center of the rectangle on the y-axis
      const centerYY = titleYY
      const centerYYY=120
      const rectWidth = textWidth + 10; // Extra 10 for padding
      const centerX = titleX - 40 + rectWidth / 2;
    
      pdf.text('INDIVIDUAL STATEMENT',85, centerY);
      pdf.text('Insured Details', 85, centerYY, { decoration: 'underline' });
      pdf.rect(80 ,54, pdf.getStringUnitWidth('Insured Details') * 6+7,0); // Border around the title
  
      pdf.text('Policy Payment Details', 85, centerYYY);
      pdf.rect(78 ,122, pdf.getStringUnitWidth('Policy Payment Details') * 6+7,0); // Border around the title
      
      pdf.rect(titleX , titleY - 5, pdf.getStringUnitWidth('INDIVIDUAL STATEMENT') * 14 + 10, 10); // Border around the title
    
      
  
  
  
  
  
  //////////// column 2 /////////////////////////
  pdf.setFontSize(13)
  
  pdf.text(`Policy holder : ${fullName}`,60, 60).setFont(undefined);
  pdf.text(`Policy number : ${policyNumber}`,60, 65).setFont(undefined);
  pdf.text(`Policy effective date : ${formattedDate}`,60, 70).setFont(undefined);
  pdf.text(`Statement date: ${StatementDate}`,60, 75).setFont(undefined);
  // pdf.text(`Current contribution  : ${Currentcontribution}`,60, 80).setFont(undefined);
  pdf.text(`Total contribution : ${Totalcontribution}`,60, 85).setFont(undefined);
  pdf.text(`Surrender Amount: ${SurrenderAmount}`,60, 90).setFont(undefined);
  pdf.text(`Current fund value : ${currentFundValue}`,60, 95).setFont(undefined);
  pdf.text(`Outstanding contribution : ${nullAmountCounti*result2[0].epiInsuredDetails.contribution}`,60, 100).setFont(undefined);
  
  
  
  
     
     
      pdf.autoTable({
        head: [['Invoice #','Proof of payment', 'Payment date', 'Amount', 'Obseravation ']],
        body: result2[0].paymentStatements.filter((items)=> new Date(items.paymentDate)<=new Date()).map(item => [
          item.referencePay, 
          item.proofOfPayment,
          item.paymentDate,
          item.amountPayed,
          item.comments
        ]),
        
        styles: {
          cellPadding:1, // Add padding to cells
          lineWidth: 0.1,
          lineColor: [0, 0, 0],
          fontSize: 7.3,
          halign: 'center',
          valign: 'middle',
          overflow: 'linebreak', 
          cellWidth: 'wrap',
          tableWidth: 'auto',
          bodyStyles: {
            lineWidth: 0.1,
            lineColor: [0, 0, 0] // Add borders around all cells
          },
          headStyles: {
            lineWidth: 0.1,
            lineColor: [0, 0, 0], 
            fillColor: [22,160,219] // Add background color to header cells
          }
        },
        startY:125,
        showHead: 'firstPage'
      });
     
      
      
     
  
      const signatureX = pdf.internal.pageSize.width - 75;
    
      pdf.addImage('https://apps.prime.rw/customerportal/images/stamp.png', 'png', signatureX, pdf.internal.pageSize.height - 45, 65, 45);
    
      pdf.save(`${fullName}'Savings.pdf`);
  
    } catch (error) {
      console.error(error)  
    }
    finally {
      // Reset loading state for the clicked row
      setLoadingRows((prevLoadingRows) => ({ ...prevLoadingRows, [row.policyNumber]: false }));
    }
   }

  
  






  ///////////////// PANSION AND SAVING END///////////////////




//////////////////////////IKIMINA START//////////////////



 if(row.products==="Pension and Savings"&&row.schemeId=="IKIMINA".toLocaleLowerCase()){
  try {
    
    const pdf = new jsPDF();
    const headerStyle = { fillColor: [21, 159, 219] };
    const result=await fetch(`https://apps.prime.rw/customerbackend/api/statement/Ikimina/saving/${row.policyNumber}`)
    const result2=await result.json()
    console.log("hello world ") 
    
    setPansionAndSavingInsurancePayments(result2[0].paymentStatements)

    let nullAmountCounti =result2[0].paymentStatements.filter((item) => {
      return new Date(item.paymentDate) <= new Date() && item.amountPayed === null;
    }).length


    
    
    const insuredDetails =result2[0].epiInsuredDetails;  
    const fullName = insuredDetails.accountName; ////
    const policyNumber=insuredDetails.policyNumberMain  //// 
    const effectiveDate=insuredDetails.accountOpenDate ////
    const StatementDate = new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });

    const lastPaymentStatement = result2[0].paymentStatements[result2[0].paymentStatements.length - 1];
    
    const Currentcontribution=lastPaymentStatement.amountPayed  ////


    const Totalcontribution=result2[0].totalAmountPayed; /////
    const SurrenderAmount=result2[0].surrenderAmount //////
    const currentFundValue=Math.round(result2[0].currentFundValue )
     
     
      // Add Prime logo at the top
    pdf.addImage('https://apps.prime.rw/customerportal/images/primelogo.png', 'png', 14, 7,0,25);
  
    const titleMargin = 10;
    const titleY = 39; // Adjusted startY value with margin
    const titleYY =52;
    const titleX = 18; // Adjust as needed
  
    pdf.setFontSize(15);

    const textWidth = pdf.getStringUnitWidth('INDIVIDUAL STATEMENT') ;
    
    const rectHeight = -3; // Height of the border rectangle
    const centerY = titleY - (rectHeight / 2); // Center of the rectangle on the y-axis
    const centerYY = titleYY
    const centerYYY=120
    const rectWidth = textWidth + 10; // Extra 10 for padding
    const centerX = titleX - 40 + rectWidth / 2;
  
    pdf.text('INDIVIDUAL STATEMENT',85, centerY);
    pdf.text('Insured Details', 85, centerYY, { decoration: 'underline' });
    pdf.rect(80 ,54, pdf.getStringUnitWidth('Insured Details') * 6+7,0); // Border around the title

    pdf.text('Policy Payment Details', 85, centerYYY);
    pdf.rect(78 ,122, pdf.getStringUnitWidth('Policy Payment Details') * 6+7,0); // Border around the title
    
    pdf.rect(titleX , titleY - 5, pdf.getStringUnitWidth('INDIVIDUAL STATEMENT') * 14 + 10, 10); // Border around the title
  
    





//////////// column 2 /////////////////////////
pdf.setFontSize(13)

pdf.text(`Policy holder : ${fullName}`,60, 60).setFont(undefined);
pdf.text(`Policy number : ${policyNumber}`,60, 65).setFont(undefined);
pdf.text(`Policy effective date : ${effectiveDate}`,60, 70).setFont(undefined);
pdf.text(`Statement date: ${StatementDate}`,60, 75).setFont(undefined);
//  pdf.text(`Current contribution  : ${Currentcontribution}`,60, 80).setFont(undefined);
pdf.text(`Total contribution  : ${Totalcontribution}`,60, 85).setFont(undefined);
pdf.text(`Surrender Amount : ${SurrenderAmount}`,60, 90).setFont(undefined);
pdf.text(`Current fund value : ${currentFundValue}`,60, 95).setFont(undefined);




   
   
    pdf.autoTable({
      head: [['Invoice #','Proof of payment', 'Payment date', 'Amount', 'Obseravation ']],
      body: result2[0].paymentStatements.filter((items)=> new Date(items.paymentDate)<=new Date()).map(item => [
        item.referencePay, 
        item.proofOfPayment,
        item.paymentDate,
        item.amountPayed,
        item.comments
      ]),
      
      styles: {
        cellPadding:1, // Add padding to cells
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        fontSize: 7.3,
        halign: 'center',
        valign: 'middle',
        overflow: 'linebreak', 
        cellWidth: 'wrap',
        tableWidth: 'auto',
        bodyStyles: {
          lineWidth: 0.1,
          lineColor: [0, 0, 0] // Add borders around all cells
        },
        headStyles: {
          lineWidth: 0.1,
          lineColor: [0, 0, 0], 
          fillColor: [22,160,219] // Add background color to header cells
        }
      },
      startY:125,
      showHead: 'firstPage'
    });
   
    
    
   

    const signatureX = pdf.internal.pageSize.width - 75;
  
    pdf.addImage('https://apps.prime.rw/customerportal/images/stamp.png', 'png', signatureX, pdf.internal.pageSize.height - 45, 65, 45);
  
    pdf.save(`${fullName}'Savings.pdf`);

  } catch (error) {
    console.error(error)  
  }
  finally {
    // Reset loading state for the clicked row
    setLoadingRows((prevLoadingRows) => ({ ...prevLoadingRows, [row.policyNumber]: false }));
  }
 }




////////////////////////IKIMINA END///////////////////////////

     else if(row.products==="Familly Insurance"){

   
 try {
      
      const pdf = new jsPDF();
      const headerStyle = { fillColor: [21, 159, 219] };
    
       //////////////// fetch data
  
        
       const result=await fetch(`https://apps.prime.rw/customerbackend/api/statement/family/${row.policyNumber}`)
      const result2=await result.json()
      
      // console.log("my invoices",result2)
      setInsuranceDetails(result2[0].paymentStatements)
       
       //////////calculating outstanding amount/////////////
  
      
       
       let nullAmountCount = result2[0].paymentStatements.filter((item) => {
        return new Date(item.paymentPeriod) <= new Date() && item.amountPayed === null;
      }).length;
      
      console.log(nullAmountCount);
      
  
      
  
  
  
      const insuredDetails =result2[0].insuredDetails;
      const schemeId = insuredDetails.schemeId;
      const fullName = insuredDetails.fullName;
      const mobileNumber=insuredDetails.phoneNumber1
      const effectiveDate=insuredDetails.effectiveDate
      const policyTerm=insuredDetails.policyTermYears
      const premiumFrequency=insuredDetails.premiumFrequency
      const totalAmountPayed=insuredDetails.totalPremium
      const policyNumber=insuredDetails.policyNumber
      const IdNumber=insuredDetails.idDocumentNumber
      const maturityDate=insuredDetails.maturityDate
       const premium=insuredDetails.riskPremium
       const TotalRiskPremium=insuredDetails.riskPremium
      
  
      
  
      // Add Prime logo at the top
      pdf.addImage('https://apps.prime.rw/customerportal/images/primelogo.png', 'png', 14, 7,0,25);
    
      const titleMargin = 10;
    const titleY = 39; // Adjusted startY value with margin
    const titleYY =52;
    const titleX = 18; // Adjust as needed
  
    pdf.setFontSize(15);

    const textWidth = pdf.getStringUnitWidth('EDUCATION ENDOWMENT PAYMENT STATEMENT') ;
    
    const rectHeight = -3; // Height of the border rectangle
    const centerY = titleY - (rectHeight / 2); // Center of the rectangle on the y-axis
    const centerYY = titleYY
    const centerYYY=90
    const rectWidth = textWidth + 10; // Extra 10 for padding
    const centerX = titleX - 40 + rectWidth / 2;
  
    pdf.text('FAMILY INSURANCE PAYMENT STATEMENT',45, centerY);
    pdf.text('Insured Details', 85, centerYY, { decoration: 'underline' });
    pdf.rect(80 ,54, pdf.getStringUnitWidth('Insured Details') * 6+7,0); // Border around the title

    pdf.text('Policy Payment Details', 85, centerYYY);
    pdf.rect(78 ,92, pdf.getStringUnitWidth('Policy Payment Details') * 6+7,0); // Border around the title
    
    pdf.rect(titleX , titleY - 5, pdf.getStringUnitWidth('FAMILY INSURANCE PAYMENT STATEMENT    ') * 7.8 + 9, 10); // Border around the title
    
      
  /////column 1 /////////// 
  
  
  pdf.setFontSize(8)
  pdf.setFont(undefined, 'bold')
  pdf.text(`Scheme name: ${schemeId}`, 20, 60).setFont(undefined, 'bold');
  pdf.text(`Insured : ${fullName}`, 20, 65).setFont(undefined, 'bold');
  pdf.text(`Mobile number: ${mobileNumber}`, 20, 70).setFont(undefined, 'bold');
  pdf.text(`Effective date: ${effectiveDate}`, 20, 75).setFont(undefined, 'bold');
  
  //////////// column 2 /////////////////////////
  
  pdf.text(`Policy Term : ${policyTerm}`,82, 60).setFont(undefined, 'bold');
  pdf.text(`Premium frequency : ${premiumFrequency}`, 82, 65).setFont(undefined, 'bold');
  pdf.text(`Total Amount Payed : ${totalAmountPayed}`, 82, 70).setFont(undefined, 'bold');
  pdf.text(`Scheme number: ${schemeId}`, 82, 75).setFont(undefined, 'bold');
  pdf.text(`Oustanding Amount: ${nullAmountCount*premium}`,82, 80).setFont(undefined, 'bold');
  /////////////// column3 //////////////////////////////
  
  pdf.text(`Policy number: ${policyNumber}`,142, 60).setFont(undefined, 'bold');
  pdf.text(`ID/Passport number: ${IdNumber}`, 142, 65).setFont(undefined, 'bold');
  pdf.text(`Maturity date: ${maturityDate}`, 142, 70).setFont(undefined, 'bold');
  pdf.text(`Premium: ${premium}`, 142, 75).setFont(undefined, 'bold');
  pdf.text(`Total Risk Premium: ${TotalRiskPremium}`, 142, 80).setFont(undefined, 'bold');
  
     
     
      pdf.autoTable({
        head: [['Reference', 'PaymentDate', 'ProofOfPayment', 'Observation', 'Amount Payed ']],
        body: result2[0].paymentStatements.filter((items)=> new Date(items.paymentPeriod)<=new Date()).map(item => [
          item.referencePay, 
          item.paymentDate,
          item.proofOfPayment,
          item.comments,
          item.amountPayed
        ]),
        
        styles: {
          cellPadding:1, // Add padding to cells
          lineWidth: 0.1,
          lineColor: [0, 0, 0],
          fontSize: 7.3,
          halign: 'center',
          valign: 'middle',
          overflow: 'linebreak', 
          cellWidth: 'wrap',
          tableWidth: 'auto',
          bodyStyles: {
            lineWidth: 0.1,
            lineColor: [0, 0, 0] // Add borders around all cells
          },
          headStyles: {
            lineWidth: 0.1,
            lineColor: [0, 0, 0], 
            fillColor: [22,160,219] // Add background color to header cells
          }
        },
        startY:94,
        showHead: 'firstPage'
      });
     
      
      
     
  
      const signatureX = pdf.internal.pageSize.width - 75;
    
      pdf.addImage('https://apps.prime.rw/customerportal/images/stamp.png', 'png', signatureX, pdf.internal.pageSize.height - 45, 65, 45);
    
      pdf.save(`${fullName}'Family-Policy.pdf`);
      setLoadingRows((prevLoadingRows) => ({ ...prevLoadingRows, [row.policyNumber]: 'done' }));
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      // Reset loading state for the clicked row
      setLoadingRows((prevLoadingRows) => ({ ...prevLoadingRows, [row.policyNumber]: false }));
    }

  }


   
  };
  


  useEffect(()=>{
fetchMyPolicies()

  },[])








  return (
    <Table className="w-full border-collapse">
    <Thead>
      <Tr className="bg-gray-500">
      <Th className="p-2 whitespace-nowrap text-sm border border-gray-500">Dawnload</Th>
        <Th className="p-2 whitespace-nowrap text-sm border border-gray-500">Policy Number</Th>
        <Th className="p-2 whitespace-nowrap text-sm border border-gray-500">Account Name</Th>
        <Th className="p-2 whitespace-nowrap text-sm border border-gray-500">Account Status</Th>
        <Th className="p-2 whitespace-nowrap text-sm border border-gray-500">Customer Id</Th>
        <Th className="p-2 whitespace-nowrap text-sm border border-gray-500">Products</Th>
        <Th className="p-2 whitespace-nowrap text-sm border border-gray-500">Schema Id</Th>
        <Th className="p-2 whitespace-nowrap text-sm border border-gray-500">Policy Number Main</Th>
      </Tr>
    </Thead>
    <Tbody>
      {data &&
        data.map((item) => (
          <Tr key={item.policyNumber} className="hover:bg-gray-400 hover:text-white ">
            <Td className="p-2 border border-gray-500">
            {loadingRows[item.policyNumber] ? (
                  <CircularProgress size={20} disableShrink />
                ) : (
                  <button onClick={() => handleDownloadPDF(item)}>
                    <div className="relative  border border-gray-500">
                      <FcDownload className="text-blue-500 border border-gray-500" size={20} />
                    </div>
                  </button>
                )}
            </Td>
            <Td className="p-2 whitespace-nowrap text-sm border border-gray-500">{item.policyNumber}</Td>
            <Td className="p-2 whitespace-nowrap text-sm border border-gray-500">{item.accountName}</Td>
            <Td className="p-2 whitespace-nowrap text-sm border border-gray-500">{item.accountStatus}</Td>
            <Td className="p-2 whitespace-nowrap text-sm border border-gray-500">{item.customerId}</Td>
            <Td className="p-2 whitespace-nowrap text-sm border border-gray-500">{item.products}</Td>
            <Td className="p-2 whitespace-nowrap text-sm border border-gray-500">{item.schemeId}</Td>
            <Td className="p-2 whitespace-nowrap text-sm border border-gray-500">{item.policyNumberMain}</Td>
          </Tr>
        ))}
    </Tbody>
  </Table>
  
   
  );
}