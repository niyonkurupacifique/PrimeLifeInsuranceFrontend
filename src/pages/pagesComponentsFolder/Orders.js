import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title.js';

// Generate Order Data
function createData(date,primiumFrequency,riskPremium,annualRiskPremium,monthlyMinSaving,annualMinSaving, paymentMethod, amount) {
  return {date,primiumFrequency,riskPremium, annualRiskPremium,monthlyMinSaving,annualMinSaving,paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const names=localStorage.getItem('names');
  const id=localStorage.getItem("userId")
  // console.log(" id in localstorae is",id)
  const[data,setData]=React.useState([])
  const getAlldata = async () => {
    try {
      const result = await fetch(`http://localhost:5000/getPaymentDetailsById?id=${id}`);
      const result2 = await result.json();
      //  console.log("result2 is",result2)
      if (result2.paymentsDetails.length > 0) {
        const data = result2.paymentsDetails; // This is the array of records
        // console.log("data",data);
        if(Array.isArray(data))
        {
          setData(data)
        }
        else
        {
          setData([data])
        }
        // Now you can loop through the records and access the fields you need
        for (const record of data) {
          const transactionId = record.transactionId;
          const customerName = record.customerName;
          const customerEmail = record.customerEmail;
          // ... access other fields as needed
          // console.log(`Transaction ID: ${transactionId}, Name: ${customerName}, Email: ${customerEmail}`);
        }
      } else {
        // console.log("No records found.");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  
 
  
    React.useEffect(()=>{
     getAlldata()
    },[])
  return (
    <React.Fragment>
      <Title>Recent Payments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>primiumFrequency</TableCell>
            <TableCell>riskPremium</TableCell>
            <TableCell>annualRiskPremium</TableCell>
            <TableCell>monthlyMinSaving</TableCell>
            <TableCell>annualMinSaving</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right"> Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow >
              <TableCell>{row.recordedDate}</TableCell>
              <TableCell>{row.primiumFrequency}</TableCell>
              <TableCell>{row.riskPremium}</TableCell>
              <TableCell>{row.annualRiskPremium}</TableCell>
              <TableCell>{row.monthlyMinSaving}</TableCell>
              <TableCell>{row.annualMinSaving}</TableCell>
              <TableCell className=' whitespace-nowrap'>{row.paymentMode}</TableCell>
              <TableCell className=' whitespace-nowrap'  align="right">{` ${row.riskPremiumMonthlyMinSavings} Rwf`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more
      </Link>
    </React.Fragment>
  );
}