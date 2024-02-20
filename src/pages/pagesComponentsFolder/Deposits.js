import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
function preventDefault(event) {
  event.preventDefault();
}


export default function Deposits() {
  const id=localStorage.getItem("userId")
  const[data,setData]=React.useState([])
  const[sum,setSum]=React.useState(0)
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
        let sum=0
       for(let i=0;i<data.length;i++)
       {
        sum+=data[i].riskPremiumMonthlyMinSavings
       }
       setSum(sum)
      //  console.log(" amount sum is ",sum)
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


  const names=localStorage.getItem('names');
    const currentDate=new Date()
    const day=currentDate.getDay()
    const months=currentDate.getMonth()
    const year=currentDate.getFullYear()

  return (
    <React.Fragment>
      <Title>Recent Payments</Title>
      <Typography component="p" variant="h4">
        {sum} Rwf
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {day} /{months+1}/{year}
      </Typography>
      <div>
        <Link  color="primary" href="/Home/products" >
          Buy Insurance
        </Link>
      </div>
    </React.Fragment>
  );
}