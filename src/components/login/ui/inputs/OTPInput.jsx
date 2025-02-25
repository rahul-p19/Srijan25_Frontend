import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
import { BasicButton } from '../buttons/common';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { authController } from '../../../../services/http';

const OTPInput = ({ email, length = 6, onVerifySuccess }) => {
  const location = useLocation();
  const { formData } = location.state;
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(length).fill(''));
  const [isFormValid, setIsFormValid] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      setIsFormValid(newOtp.every((digit) => digit !== ''));

      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    }

    if (value === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
  
      if (otp[index] !== '') {
        newOtp[index] = '';
        setOtp(newOtp);
  
        if (index > 0) {
          setTimeout(() => {
            inputs.current[index - 1].focus();
          }, 0);
        }
        setIsFormValid(newOtp.every((digit) => digit !== ''));
      } else if (index > 0) {
        setTimeout(() => {
          inputs.current[index - 1].focus();
        }, 0);
        setIsFormValid(newOtp.every((digit) => digit !== ''));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
        try {
            // Step 1: Verify OTP
            const verifyResponse = await authController.verifyEmail(email, otp.join(''))

            if (verifyResponse.data.success) {
              navigate('/dashboard', { state: { formData } });
            } else {
                console.error('OTP verification failed:', verifyResponse.data.message);
                setErrorMessage('Incorrect OTP. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Incorrect OTP. Please try again.');
            console.error('Error in OTP verification or registration:', error.message);
        }
    }
};


  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit}>
        {otp.map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputs.current[index] = el)}
            style={{
              width: '40px',
              height: '40px',
              margin: '0 5px',
              textAlign: 'center',
              fontSize: '18px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        ))}
        {/* Display Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-center mt-2">{errorMessage}</div>
        )}
        {isFormValid && <div className="w-full flex justify-center mt-6">
          <BasicButton 
            type="submit" 
            disabled={!isFormValid}  
            className="border-green-500 text-white w-36" 
            onClick={handleSubmit} 
            text="Verify"
          />
        </div>}
      </form>
    </div>
  );
};

export default OTPInput;
