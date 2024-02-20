import React, { useEffect, useState } from "react";
 import '../../pages/pages.css'
 import { LuLogIn } from "react-icons/lu";
 import familyPhoto from './Images/family.png'
import employeePhoto from './Images/employee.png'
import educationPhoto from './Images/education.png'
import loanPhoto from './Images/loan.png'
import { Typography } from "@mui/material";
function Header({selectedInsurance, LoanInsuranceHoveredLeave,EducationInsuranceHoveredLeave,EmployeeInsuranceHoveredLeave,LoanInsuranceHovered,EducationInsuranceHovered,EmployeeInsuranceHovered,employeeProtectionStyle,familyInsuranceHoveredLeave,familyInsuranceHovered,loanInsuranceStyle,handleLoanInsuranceClick,educationInsuranceStyle,familyInsuranceStyle,handleFamilyInsuranceClick,handleEmployeeInsuranceClick,handleEducationInsuranceClick,familyInsuranceClicked,employeeProtectionClicked,educationInsuranceClick,LoanInsuranceClick}) {
 
  const[mouseIsOver,setMouseIsOver]=useState(false)
  const[mouseIsOver2,setMouseIsOver2]=useState(false)
  const[mouseIsOver1,setMouseIsOver1]=useState(false)
  const[isSmallsCreen,setisSmallsCreen]=useState(false);
  const [isIsNotSmallScreen, setIsNotSmallScreen] = useState(false);
  const [isMiddleScreen, setIsMiddleScreen]=useState(false)
    // console.log("current style is:",employeeProtectionStyle)
    
  const handleMouseOver=()=>{
    // console.log("mouse is over")
    setMouseIsOver(true)
  }


  const handleResize = () => {
    setisSmallsCreen(window.innerWidth <= 600);
    setIsNotSmallScreen(window.innerWidth > 1150);
    setIsMiddleScreen(window.innerWidth > 600 && window.innerWidth <= 1150);
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



  const handleMouseOver1=()=>{
    // console.log("mouse is over")
    setMouseIsOver1(true)
  }
  const handleMouseOver2=()=>{
    // console.log("mouse is over")
    setMouseIsOver2(true)
  }

  const handleMouseOut=()=>{
    setMouseIsOver(false)
  }
  const handleMouseOut1=()=>{
    setMouseIsOver1(false)
  }
  const handleMouseOut2=()=>{
    setMouseIsOver2(false)
  }
  

  return (
    <>
    <div className="     ">
   {
    isIsNotSmallScreen&&(  <div className="  flex justify-around">
    <div className="flex ">
    <div className="flex max-sm:ml-4 animate__animated animate__backInLeft   items-center" style={{ whiteSpace: "nowrap" }}> {/* Use 'items-center' to vertically center children */}
  <button onMouseLeave={familyInsuranceHoveredLeave} onMouseOver={familyInsuranceHovered}  onClick={handleFamilyInsuranceClick}  style={{fontStyle:"normal", fontFamily: 'Rubik, sans-serif',fontWeight:200,fontSize:20}} className= { ` ${familyInsuranceStyle ? ' bn35':'bn-32 bn32'}  text-dropdownTextColor family`}>
    Family
  <span className=" max-sm:hidden text-xxxxxColor"> Insurance</span>
  </button>
  <div>
    <svg
      class="w-2.5 h-2.5 ml-2.5 max-sm:ml-9"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </div>
</div>
    </div>
    <div className="flex">
    <div className="flex animate__animated animate__zoomIn  items-center" style={{ whiteSpace: "nowrap" }}> {/* Use 'items-center' to vertically center children */}
  <button onMouseOver={EmployeeInsuranceHovered} onMouseLeave={EmployeeInsuranceHoveredLeave} onClick={handleEmployeeInsuranceClick}  style={{fontStyle:"normal", fontFamily: 'Rubik, sans-serif',fontWeight:200,fontSize:20}}      className={`${employeeProtectionStyle ? ' bn35':'bn-32 bn32'}  text-dropdownTextColor family`}>
    Employee Protection
  <span className=" max-sm:hidden text-xxxxxColor ">Insurance</span> 
  </button>
  <div>
    <svg
      class="w-2.5 h-2.5 ml-2.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </div>
</div>
    </div>
    <div className="flex">
    <div className="flex animate__animated animate__backInLeft items-center pr-8" style={{ whiteSpace: "nowrap" }}> {/* Use 'items-center' to vertically center children */}
  <button onMouseOver={EducationInsuranceHovered} onMouseLeave={EducationInsuranceHoveredLeave} onClick={handleEducationInsuranceClick}  style={{fontStyle:"normal", fontFamily: 'Rubik, sans-serif',fontWeight:200,fontSize:20}} className= {` ${educationInsuranceStyle ? ' bn35':'bn-32 bn32'}  text-dropdownTextColor family`}>
   
 Education
 <span className=" max-sm:hidden text-xxxxxColor"> Insurance</span>
  </button>
  <div>
    <svg
      class="w-2.5 h-2.5 ml-2.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </div>
</div>
    </div>
    <div className="flex">
    <div className="flex  animate__animated animate__zoomIn items-center pr-8" style={{ whiteSpace: "nowrap" }}> {/* Use 'items-center' to vertically center children */}
  <button onMouseOver={LoanInsuranceHovered} onMouseLeave={LoanInsuranceHoveredLeave} onClick={handleLoanInsuranceClick}  style={{fontStyle:"normal", fontFamily: 'Rubik, sans-serif',fontWeight:200,fontSize:20}} className= {` ${loanInsuranceStyle ? ' bn35':'bn-32 bn32'}  text-dropdownTextColor family`}>
   
 Loan Protection 
 <span className=" ml-2 max-sm:hidden text-xxxxxColor">Insurance</span>
  </button>
  <div>
    <svg
      class="w-2.5 h-2.5 ml-2.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </div>
</div>
    </div>
   </div>)
   }
      
      
  {
    isSmallsCreen&&(
        <>
         <div style={{color:'#16A0DB',fontSize:20}} sx={{ mb: 8 }} className='animate__animated animate__zoomIn z-20      absolute  top-16 '>
       <span>Choose product to get Quotation</span>
       </div>
      <div className={`${selectedInsurance==='family'?'max-sm:top-24':'max-sm:top-28'}  absolute  top-16  `}>
  <div className="flex flex-col  space-y-5 max-sm:ml-4">
 
   {
    !(employeeProtectionClicked || educationInsuranceClick || LoanInsuranceClick) &&( <div className="flex  animate__animated animate__backInLeft flex-col items-center" style={{ whiteSpace: "nowrap" }}>
    
    <button onClick={handleFamilyInsuranceClick} style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 200, fontSize: 20 }} className={`${familyInsuranceStyle ? 'bn35' : 'bn-32 bn32'} text-dropdownTextColor `}>
 
        Family
        <span className=" text-xxxxxColor"> Insurance</span>
      </button>
     
      <div className=" flex justify-center">
      {
        familyInsuranceClicked? <img style={{width:'13%'}} src="https://apps.prime.rw/customerportal/images/family.png" alt="" />: <img style={{width:'40%'}} src="https://apps.prime.rw/customerportal/images/family.png" alt="" />
      }
      </div>
    </div>)
   }
   

   {
    !(familyInsuranceClicked || educationInsuranceClick ||LoanInsuranceClick) &&(
      <div className="flex flex-col animate__animated animate__zoomIn items-center">
      <button onClick={handleEmployeeInsuranceClick} style={{ fontStyle: "normal", fontFamily: 'Rubik, sans-serif', fontWeight: 200, fontSize: 20 }} className={`${employeeProtectionStyle ? 'bn35' : 'bn-32 bn32'} text-dropdownTextColor family`}>
        Employee Protection
        <span className=" text-xxxxxColor"> Insurance</span>
      </button>
      <div>
      <div className=" flex justify-center">
     {
      employeeProtectionClicked?  <img className=" z-10" style={{width:'15%'}} src="https://apps.prime.rw/customerportal/images/employee.png" alt="" />:  <img style={{width:'40%'}} src="https://apps.prime.rw/customerportal/images/employee.png" alt="" />
     }
      </div>
      </div>
    </div>
    )
   }

   {
    !(familyInsuranceClicked || employeeProtectionClicked ||LoanInsuranceClick)  &&(
      <div className="flex animate__animated animate__backInLeft flex-col items-center pr-8">
      <button onClick={handleEducationInsuranceClick} style={{ fontStyle: "normal", fontFamily: 'Rubik, sans-serif', fontWeight: 200, fontSize: 20 }} className={`${educationInsuranceStyle ? 'bn35' : 'bn-32 bn32'} text-dropdownTextColor family`}>
        Education
        <span className=" text-xxxxxColor"> Insurance</span>
      </button>
      <div>
      <div className=" flex justify-center">
     {
      educationInsuranceClick?  <img style={{width:'15%'}} src="https://apps.prime.rw/customerportal/images/education.png" alt="" />:  <img style={{width:'40%'}} src="https://apps.prime.rw/customerportal/images/education.png" alt="" />
     }
      </div>
      </div>
    </div>
    )
   }
    <div>
   {
    !(familyInsuranceClicked || employeeProtectionClicked || educationInsuranceClick) &&(
      <div className="flex animate__animated animate__backInLeft flex-col items-center pr-8" style={{ whiteSpace: "nowrap" }}> {/* Use 'items-center' to vertically center children */}
      <button onClick={handleLoanInsuranceClick}  style={{fontStyle:"normal", fontFamily: 'Rubik, sans-serif',fontWeight:200,fontSize:20}} className= {` ${loanInsuranceStyle ? ' bn35':'bn-32 bn32'}  text-dropdownTextColor family`}>
       
     Loan Protection
     <span className="  text-xxxxxColor">Insurance</span>
      </button>
      <div>
      <div className=" flex justify-center">
          {
            LoanInsuranceClick? <img style={{width:'15%'}} src="https://apps.prime.rw/customerportal/images/loan.png" alt="" />: <img style={{width:'40%'}} src="https://apps.prime.rw/customerportal/images/loan.png" alt="" />
          }
          </div>
      </div>
    </div>
    )
   }
    </div>
    {/* Repeat the above structure for additional items if needed */}
  </div>
</div>
</>

    )
  }
   {
    isMiddleScreen&&(  <div className=" absolute left-0 right-0 flex justify-around">
    <div className="flex ">
    <div className="flex max-sm:ml-4   items-center" style={{ whiteSpace: "nowrap" }}> {/* Use 'items-center' to vertically center children */}
  <button onMouseLeave={familyInsuranceHoveredLeave} onMouseOver={familyInsuranceHovered}  onClick={handleFamilyInsuranceClick}  style={{fontStyle:"normal", fontFamily: 'Open Sans, sans-serif',fontWeight:200,fontSize:20}} className= { ` ${familyInsuranceStyle ? ' bn35':'bn-32 bn32'}  text-dropdownTextColor family`}>
    Family
  <span className=" max-sm:hidden text-xxxxxColor"> Insurance</span>
  </button>
  <div>
    <svg
      class="w-2.5 h-2.5 ml-2.5 max-sm:ml-9"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </div>
</div>
    </div>
    <div className="flex">
    <div className="flex   items-center" style={{ whiteSpace: "nowrap" }}> {/* Use 'items-center' to vertically center children */}
  <button onMouseLeave={EmployeeInsuranceHoveredLeave} onMouseOver={EmployeeInsuranceHovered} onClick={handleEmployeeInsuranceClick}  style={{fontStyle:"normal", fontFamily: 'Open Sans, sans-serif',fontWeight:200,fontSize:20}}      className={`${employeeProtectionStyle ? ' bn35':'bn-32 bn32'}  text-dropdownTextColor family`}>
    Employee Protection
  <span className=" max-sm:hidden text-xxxxxColor ">Insurance</span> 
  </button>
  <div>
    <svg
      class="w-2.5 h-2.5 ml-2.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </div>
</div>
    </div>
    <div className="flex">
    <div className="flex items-center pr-8" style={{ whiteSpace: "nowrap" }}> {/* Use 'items-center' to vertically center children */}
  <button onMouseOver={EducationInsuranceHovered} onMouseLeave={EducationInsuranceHoveredLeave} onClick={handleEducationInsuranceClick}  style={{fontStyle:"normal", fontFamily: 'Open Sans, sans-serif',fontWeight:200,fontSize:20}} className= {` ${educationInsuranceStyle ? ' bn35':'bn-32 bn32'}  text-dropdownTextColor family`}>
   
 Education
 <span className=" max-sm:hidden text-xxxxxColor"> Insurance</span>
  </button>
  <div>
    <svg
      class="w-2.5 h-2.5 ml-2.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </div>
</div>
    </div>
    <div className="flex">
    <div className="flex items-center pr-8" style={{ whiteSpace: "nowrap" }}> {/* Use 'items-center' to vertically center children */}
  <button onMouseOver={LoanInsuranceHovered} onMouseLeave={LoanInsuranceHoveredLeave} onClick={handleLoanInsuranceClick}  style={{fontStyle:"normal", fontFamily: 'Open Sans, sans-serif',fontWeight:200,fontSize:20}} className= {` ${loanInsuranceStyle ? ' bn35':'bn-32 bn32'}  text-dropdownTextColor family`}>
   
 Loan Protection
 <span className=" max-sm:hidden text-xxxxxColor"></span>
  </button>
  <div>
    <svg
      class="w-2.5 h-2.5 ml-2.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </div>
</div>
    </div>
   </div>)
   }
    
    </div>
    
    </>
   
  );
}

export default Header;
