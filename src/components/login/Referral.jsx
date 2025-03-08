import GridLines from '../GridLines';
import { TextInput } from './ui/inputs'; 
import { SignUpButton } from './ui/buttons'; 
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addReferral } from '../../services/http/auth';

const Referral = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({ code: '' });
    const [errors, setErrors] = useState({ code: '' });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!location.state?.allowed) {
            navigate("/"); 
        }
    }, [location, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ code: "" });

        if (!formData.code) {
            navigate("/");
            return;  
        }

        try {
            const response = await  addReferral(formData.code)
            setSuccess(true);
            navigate("/dashboard");
        } catch (err) {
            console.error("Error submitting referral code:", err);
            setErrors({ code: "Invalid referral code" });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="relative w-full">
            <GridLines />
            <div className="min-h-screen flex items-center justify-center p-4 font-['Source_Code_Pro']">
                <div className="w-full max-w-2xl bg-black/20 rounded-2xl backdrop-blur-sm border border-white flex flex-col p-8 text-left">
                    <h1 className="font-bold lg:text-4xl">Welcome to Srijan 2025</h1>
                    <br />
                    <h1 className="font-bold lg:text-2xl">Do you have a Campus Referral Code?</h1>
                    <br />

                    <form id="referralForm" className="space-y-4 mt-4" onSubmit={handleSubmit}>
                        <TextInput
                            labelContent={<span className="text-[#8420FF]">Campus Referral Code</span>}
                            name="code"
                            value={formData.code}
                            placeholder="Enter code..."
                            error={errors.code}
                            setErrors={setErrors}
                            onChange={handleChange}
                            onFocus={() => {}}
                            onBlur={() => {}}
                        />
                        <div className="w-full flex justify-center mt-8 lg:-ml-4 cursor-pointer">
                            <SignUpButton textContent={formData.code ? "SUBMIT" : "SKIP"} onClick={handleSubmit} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Referral;
