import GridLines from '../GridLines';
import { OTPInput } from './ui/inputs';  
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {authController} from '../../services/http';

const EmailVerify = () => {
    const location = useLocation();
    const { formData } = location.state;
    const [countdown, setCountdown] = useState(50);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const handleResendOTP = async () => {

        // Call API to resend OTP
        try {
            const response = await authController.resendOTP(formData.email);
            const result = response.data;
            if (result.success) {
                setCountdown(50); // Restart countdown
                setCanResend(false);
            } else {
                alert("Failed to resend OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
        }
    };

    return (
        <div className="relative w-full">
            <GridLines />

            <div className="min-h-screen flex items-center justify-center p-4 font-['Source_Code_Pro']">
                <div className="w-full max-w-2xl bg-black/20 rounded-2xl backdrop-blur-sm border border-white flex flex-col p-8">
                    <h1 className="font-bold lg:text-4xl">Srijan 2025</h1>
                    <br/>
                    <h1 className="font-bold lg:text-2xl">Verify your email. Enter OTP sent at {formData.email}</h1>
                    <br/>
                    {/* Resend OTP Section */}
                    <h2 className="font-medium text-lg">
                        Resend OTP in:{" "}
                        {canResend ? (
                            <button
                                onClick={handleResendOTP}
                                className="text-blue-500 hover:underline"
                            >
                                Resend OTP
                            </button>
                        ) : (
                            <span className="text-red-500">{countdown} sec</span>
                        )}
                    </h2>
                    <br />
                    <OTPInput length={6} email={formData.email} formData={formData} />
                </div>
            </div>
        </div>
    )
}

export default EmailVerify;
