import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import { useContext } from 'react';
import { OpenModalContext } from './context';
import ReactTyped from "react-typed";
import 'animate.css';
import YourComponent from './pagesComponentsFolder/welldone';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const{myPoliciesButtonClicked}=useContext(OpenModalContext)
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title>  Products | Prime life </title>
      </Helmet>
       
      <Container>
      {
        myPoliciesButtonClicked?(  <Typography variant="h4" sx={{ mb: 8 }}>
       <div className='max-sm:hidden'> Policies</div>
      </Typography>):( <>
      
        <Typography className='' variant="h4" sx={{ mb: 8 }}>
          <div className=' flex justify-between'>
      <div className='max-sm:hidden  max-md:hidden max-lg:hidden '>

      <div style={{color:'#16A0DB',fontSize:27}} sx={{ mb: 8 }} className=' max-sm:hidden  max-md:hidden max-lg:hidden absolute  top-28 pl-5'>
       <span>Choose product to get Quotation</span>
       </div>
      </div>
      <div>
       
      </div>
      </div>
     
      </Typography>
       
      </>)
      }
      <ProductList products={PRODUCTS} />
       
      </Container>
    </>
  );
}
