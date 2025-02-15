import GridLines from '../GridLines';
import { EmailInput } from './ui/inputs'; 
import { SignUpButton} from './ui/buttons'; 
import { useState } from "react";
import { forgotPassword } from '../../services/http/auth';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
            email: '',
        });
        const [errors, setErrors] = useState({
            email: '',
        });
        const [success, setSuccess] = useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setErrors({ email: "" });
            if (!formData.email) {
                setErrors({ email: "Enter your email" });
                return;
            }
            try {
                const response = await forgotPassword(formData.email);
                // console.log(response);
                setSuccess(true);
            } catch (err) {
                console.error(err);
            }
        }

        const handleChange = async (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    return (
        <div className="relative w-full">
            <GridLines />

            <div className="min-h-screen flex items-center justify-center p-4 font-['Source_Code_Pro']">
                <div className="w-full max-w-2xl bg-black/20 rounded-2xl backdrop-blur-sm border border-white flex flex-col p-8 text-left">
                    <h1 className="font-bold lg:text-4xl">Srijan 2025</h1>
                    <br/>
                    <h1 className="font-bold lg:text-2xl">Reset your password.<br/>Enter Email for verification</h1>
                    <br/>

                    <form id="signupForm" className="space-y-4 mt-4" onSubmit={handleSubmit}> 
                        <EmailInput 
                            labelContent="Email" 
                            name="email" 
                            value={formData.email} 
                            error={errors.email} 
                            setErrors={setErrors} 
                            onChange={handleChange} 
                            onFocus={() => {}} 
                            onBlur={() => {}} 
                        />
                        <div className="w-full flex justify-center mt-8 lg:-ml-4">
                            <SignUpButton onClick={handleSubmit} textContent = "SEND"/>
                        </div>
                    </form>

                    {success && <h1 className="text-bold mt-6">Verification email sent at {formData.email}</h1>}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
