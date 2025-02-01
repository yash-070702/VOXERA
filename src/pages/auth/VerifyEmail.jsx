
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { Link } from 'react-router-dom';
import OTPInput from "react-otp-input";
import { useNavigate } from 'react-router-dom';
import { sendOtp,signUp } from '../../services/operations/authAPI'
const VerifyEmail = () => {
    const [otp,setOtp]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {signupData,loading}=useSelector((state)=>state.auth);

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        }=signupData;
        dispatch(signUp(firstName,lastName,email,password,confirmPassword,otp,navigate))
    }
    return (
        <div  className="  grid place-items-center text-richblack-5">
        {
            loading ?(<div className='spinner'></div>):(<div className="lg:max-w-[500px]  p-8 lg:p-8">
                <h1 className="text-richblack-5 font-semibold text-[1.875rem] text-center leading-[2.375rem]">
                Verify Email
              </h1>
              <p className="text-[1rem] md:text-[1.125rem] text-center leading-[1.625rem] my-4 text-richblack-100">
                A verification code has been sent to you. Enter the code below
              </p>
                <form onSubmit={handleOnSubmit}>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => (
                    <input
                      {...props}
                      placeholder="-"
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-[40px] lg:w-[60px] border-0 bg-black rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                    />
                  )}
                  containerStyle={{
                    justifyContent: "space-between",
                    gap: "0 6px",
                  }}
                />
                       <button
                  type="submit"
                  className="w-full bg-white py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-black"
                >
                  Verify Email
                </button>
              </form>
              <div className="mt-6 flex items-center justify-between">
                <Link to="/signup">
                  <p className="text-richblack-5 flex items-center gap-x-2">
                    <BiArrowBack /> Back To Signup
                  </p>
                </Link>
                <button
                  className="flex items-center text-blue-100 gap-x-2"
                  onClick={() => dispatch(sendOtp(signupData.email))}
                >
                  <RxCountdownTimer />
                  Resend it
                </button>
              </div>
            </div>)
        }
          
        </div>
      )
}

export default VerifyEmail
