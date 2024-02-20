import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Title from './Title';

const Mychart = () => {
  const id = localStorage.getItem('userId');
  const [data, setData] = useState([]);
  const [sum, setSum] = useState(0);
  const date = new Date();

  const monthWiseTotals = {
    January: 0, February: 0, March: 0, April: 0, May: 0, June: 0,
    July: 0, August: 0, September: 0, October: 0, November: 0, December: 0,
  };

  const [chartData, setChartData] = useState({
    options: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'],
    },
    series: [],
  });

  const getAlldata = async () => {
    try {
      const result = await fetch(`http://localhost:5000/getPaymentDetailsById?id=${id}`);
      const result2 = await result.json();
      // console.log('result2 is', result2);
      if (result2.paymentsDetails.length > 0) {
        const data = result2.paymentsDetails;
        // console.log('data', data);
        setData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          sum += data[i].riskPremiumMonthlyMinSavings;
        }
        setSum(sum);
        // console.log('amount sum is', sum);
        processChartData(data);
      } else {
        // console.log('No records found.');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const processChartData = (data) => {
    data.forEach((payment) => {
      const recordedDate = new Date(payment.recordedDate);
      const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(recordedDate);
      const monthTotal = payment.riskPremiumMonthlyMinSavings;

      monthWiseTotals[monthName] += monthTotal;
    });

    const chartSeries = Object.values(monthWiseTotals);

    setChartData({
      options: {
        labels: Object.keys(monthWiseTotals),
      },
      series: chartSeries,
    });
  };

  useEffect(() => {
    getAlldata();
  }, []);

  return (
    <div className="donut">
      <Title>{date.getFullYear()}</Title>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="320"
      />
    </div>
  );
};

export default Mychart;
