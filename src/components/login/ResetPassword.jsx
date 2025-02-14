import { useState } from "react";
import { PasswordInput } from './ui/inputs';
import { SignUpButton} from './ui/buttons';
import { useParams, useNavigate } from "react-router-dom";
import GridLines from '../GridLines';
import { resetPassword } from "../../services/http/auth";

const ResetPassword = () => {
    const { token } = useParams(); // Get token from URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        consent: ''
    });
    const [imageSrc, setImageSrc] = useState("/mascot.svg");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
            setLoading(false);
            return;
        }

        try {
            const response = await resetPassword(formData, token);
            setSuccess(true);
            setTimeout(() => navigate("/login"), 3000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    const handleInputFocus = () => {
        setImageSrc("/mascot_right.svg");
    };

    const handleInputBlur = () => {
        setImageSrc("/mascot.svg");
    };

    return (
        <div className="relative w-full">
            <GridLines />

            <div className="min-h-screen flex items-center justify-center p-4 font-['Source_Code_Pro']">
                <div className="w-full max-w-2xl bg-black/20 rounded-2xl backdrop-blur-sm border border-white flex flex-col p-8 text-left">
                    <h1 className="font-bold lg:text-4xl">Srijan - 2025</h1>
                    <br/>
                    <h1 className="font-bold lg:text-2xl">Reset your Password</h1>
                    <br/>
                    <div className="mb-4 flex flex-wrap">
                        <div className="w-full lg:w-1/2 flex flex-col text-sm">
                            <form id="passwordResetForm" className="space-y-4 mt-4" onSubmit={handleSubmit}>                                  

                                <PasswordInput 
                                    labelContent={<><span className="text-[#8420FF]">Enter new</span> password</>}
                                    name="password"
                                    placeholder={"Password..."}
                                    value={formData.password}
                                    error={errors.password}
                                    setErrors={setErrors}
                                    onChange={handleChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                />
                                <PasswordInput 
                                        labelContent={<><span className="text-[#8420FF]">Confirm your</span> password</>}
                                        name="confirmPassword"
                                        placeholder={"Confirm password..."}
                                        value={formData.confirmPassword}
                                        password={formData.password}
                                        error={errors.confirmPassword}
                                        setErrors={setErrors}
                                        onChange={handleChange}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                />
                                {/* LOGIN BUTTON */}
                                <div className="w-full flex justify-center mt-8 lg:-ml-4">
                                    <SignUpButton onClick={handleSubmit} textContent = {loading ? "Resetting..." : "RESET"}/>
                                </div>
                            </form>
                        </div>
                        {/* ROBOT IMAGE */}
                        <div className="hidden lg:flex w-1/2 flex-col items-center robot-container h-auto">
                            <img
                                src={imageSrc} 
                                alt="Robot mascot"
                                className="w-84 h-84 lg:w-84 lg:h-84 object-contain transition-all duration-900"
                            />
                        </div>
                        {success && <h1 className="text-bold w-1/2 justify-center">Password Reset succesfully. Redirecting to Login...</h1>}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ResetPassword;
