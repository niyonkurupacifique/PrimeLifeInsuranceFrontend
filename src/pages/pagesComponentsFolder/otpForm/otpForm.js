import React, { useEffect, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { concat, result } from 'lodash';
import { useState } from 'react';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Zoom } from 'react-swift-reveal';
import CreatePassword from '../createPassword';
import SignUp from '../Signup';

const OtpVerification = (props) => {
  const inputs = useRef([]);
  
  const { setOpenOtpForm } = props;
  const{setIsOtpVerified}=props;
  const button = useRef(null);
  const toast = useToast();
  const [resendOtp, setResendOtp] = useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const handleKeyUp = (index, e) => {
    const currentInput = inputs.current[index];
    const nextInput = inputs.current[index + 1];
    const prevInput = inputs.current[index - 1];
   
    if (currentInput.value.length > 1) {
      currentInput.value = '';
      return;
    }

    if (e.key === 'Backspace' && currentInput.value === '') {
      // If Backspace is pressed and the current input is empty,
      // clear its value and focus on the previous input.
      prevInput && prevInput.focus();
      return;
    }

    if (nextInput && nextInput.disabled) {
      // If the next input is disabled, enable it.
      nextInput.disabled = false;
    }

    if (nextInput && currentInput.value !== '') {
      // If the next input exists and the current input is not empty,
      // focus on the next input.
      nextInput.focus();
    }

    if (
      !inputs.current[inputs.current.length - 1].disabled &&
      inputs.current[inputs.current.length - 1].value !== ''
    ) {
      // If the last input is not disabled and its value is not empty,
      // add the 'active' class to the button.
      button.current.classList.add('active');
    } else {
      // If none of the conditions are met, remove the 'active' class from the button.
      button.current.classList.remove('active');
    }
  };

  useEffect(() => {
    inputs.current.forEach((input, index) => {
      input.addEventListener('keyup', (e) => handleKeyUp(index, e));
    });

    window.addEventListener('load', () => inputs.current[0].focus());

    return () => {
      inputs.current.forEach((input, index) => {
        input && input.removeEventListener('keyup', (e) => handleKeyUp(index, e));
      });
    };
  }, []);

  const inputValues = inputs.current.map((input) => input.value);
  // console.log('Input Values:', inputValues);

  // Convert each input value to a string and join them
  //  const concatenatedNumber = inputValues.join('');
  // console.log('Concatenated Number:', concatenatedNumber);
  // setOtp(inputValues.join(""));
 

  const storedUserName = localStorage.getItem('usernamee');
  const storedUserId = localStorage.getItem('userId');

  const handleOtpValidation = async (e) => {
    const concatenated = inputs.current.map(i => i.value).join("");
    e.preventDefault();
    const loadingToastId = toast({
      title: 'Verifying...',
      description: 'Please wait...',
      status: 'loading',
      position: 'top',
      duration: null,
    });

    try {
      const response = await fetch('https://apps.prime.rw/customerbackend/User/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: storedUserName,
          otp:concatenated,
        }),
      });

      // console.log('email is', storedUserName);
      // console.log('otp is', concatenated);

      const result = await response.json();

      // console.log('Response from API:', result);

      if (response.ok) {
        console.log('Verification Message:', result.successMessage);
        toast({
          title: result.successMessage,
          position: 'top',
          status: 'success',
          duration: 3000,
        });
       setIsOtpVerified(true)
       setOpenOtpForm(false)
      } else {
        setResendOtp(true);
        // console.log('Verification Error Message:', result.errorMessage);
        toast({
          title: 'Verification failed',
          description: result.errorMessage,
          position: 'top',
          status: 'error',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: 'Verification failed',
        description: result.errorMessage,
        position: 'top',
        status: 'error',
        duration: 3000,
      });
    } finally {
      toast.close(loadingToastId);
    }
  };
  

  const handleResendOtp = async (e) => {
    e.preventDefault();
    const loadingToastId = toast({
      title: 'Sending new OTP...',
      description: 'Please wait...',
      status: 'loading',
      position: 'top',
      duration: null,
    });

    try {
      const response = await fetch(`https://apps.prime.rw/customerbackend/User/resendOtp?id=${storedUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast({
          title: 'New OTP sent successfully',
          description: 'Check your message',
          position: 'top',
          status: 'success',
          duration: 3000,
        });
      } else {
        setResendOtp(true);
        // console.log('Verification Error Message:');
        toast({
          title: 'Failed to generate new OTP',
          description: 'Contact prime life insurance for support',
          position: 'top',
          status: 'error',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('OTP generation failed:', error);
      toast({
        title: 'Failed to generate new OTP',
        description: 'Contact prime life insurance for support',
        position: 'top',
        status: 'error',
        duration: 3000,
      });
    } finally {
      toast.close(loadingToastId);
    }
  };

  return (
    <Zoom>
      <div className="min-h-screen flex items-center justify-center ">
     
      
        <div className="container bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center gap-y-5">
          <header className="h-16 w-16 bg-blue-500 text-white text-2xl rounded-full flex items-center justify-center">
            <i className="bx bxs-check-shield"></i>
          </header>
          <h4 className="text-lg font-medium text-gray-700">Enter OTP Code</h4>
          <form className="flex flex-col items-center justify-center" action="#">
            <div className="flex flex-row gap-x-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  type="number"
                  className="h-11 w-10 rounded-md outline-none text-center text-lg border-2 border-gray-300"
                  ref={(el) => (inputs.current[index] = el)}
                  onKeyUp={(e) => handleKeyUp(index, e)}
                />
              ))}
            </div>
            <button
              ref={button}
              onClick={handleOtpValidation}
              className="mt-5 w-full z-20 text-white text-base border-none py-2 cursor-pointer rounded-md  bg-blue-500 transition-all duration-200"
            >
              Verify OTP
            </button>
            {resendOtp && (
              <Grid container justifyContent="flex-end">
                <button onClick={handleResendOtp}>
                  <Grid item>
                    <Link  variant="body2">
                      Request another OTP
                    </Link>
                  </Grid>
                </button>
              </Grid>
            )}
          </form>
        </div>
      </div>
    </Zoom>
  );
};

export default OtpVerification;
