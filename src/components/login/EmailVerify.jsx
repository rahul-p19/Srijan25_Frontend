import GridLines from '../GridLines';
import { OTPInput } from './ui/inputs';  
import { useLocation } from 'react-router-dom';

const EmailVerify = () => {
    const location = useLocation();
    const { formData } = location.state;

    return (
        <div className="relative w-full">
            <GridLines />

            <div className="min-h-screen flex items-center justify-center p-4 font-['Source_Code_Pro']">
                <div className="w-full max-w-2xl bg-black/20 rounded-2xl backdrop-blur-sm border border-white flex flex-col p-8">
                    <h1 className="font-bold lg:text-4xl">Srijan 2025</h1>
                    <br/>
                    <h1 className="font-bold lg:text-2xl">Verify your email. Enter OTP sent at {formData.email}</h1>
                    <br/>
                    <OTPInput length={6} email={formData.email} formData={formData} />
                </div>
            </div>
        </div>
    )
}

export default EmailVerify;
