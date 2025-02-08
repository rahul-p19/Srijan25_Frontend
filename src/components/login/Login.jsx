import { useState, useEffect } from 'react';
import { SignUpButton, GoogleSignInButton } from './ui/buttons';
import { EmailInput, PasswordInput } from './ui/inputs';
import { useNavigate } from "react-router-dom";
import GridLines from '../GridLines';
import { authController, serviceController } from "../../services/http"
import { CONST } from "../../config"

const Login = () => {
    const navigate = useNavigate();
    
    const [imageSrc, setImageSrc] = useState("/mascot.svg");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); 

    const [formData, setFormData] = useState({
        email: '',
        loginPassword: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        loginPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleInputFocus = () => {
        setImageSrc("/mascot_right.svg");
    };

    const handleInputBlur = () => {
        setImageSrc("/mascot.svg");
    };

    const handleForgotPassword = async (e) => {
        try{
            navigate("/forgotPassword");
        }catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        const sid = JSON.parse(localStorage.getItem("sid")); 
        if (sid) {
            navigate("/"); 
            return;
        }
    
        serviceController.isOAuth2GoogleAvailable()
            .then(response => {
                let { serviceName, isActive } = response.data;
                console.log(`${serviceName} status: ${isActive ? "Available" : "Not available"}`);
            })
            .catch(error => {
                console.error("Error checking Google OAuth availability:", error);
            });
    }, [navigate]);
    

    const startWithGoogle = function (e) {
        e.preventDefault()
        authController.startWithOAuth2(CONST.uri.auth.GOOGLE_LOGIN)
            .then(onSuccessLogin)
            .catch(onFailLogin)
    }

    const onSuccessLogin = function ({data}) {
        let { sid } = data
        console.log("hello")
        if (!sid) {
            let error = "An error occurred during the login process"
            console.log(error)
            setMessageError(error)
            return
        }
        localStorage.setItem("sid", JSON.stringify(sid))
        navigate("/")
    }

    const onFailLogin = function (error) {
        console.error("Login failed:", error);
    
        if (!error?.response?.data) {
            setMessage("An unexpected error occurred. Please try again.");
            return;
        }
    
        const errorMessage = error.response.data.error || "Unknown error occurred.";
        console.log(errorMessage);
        setMessage(errorMessage);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = { ...errors };

        if (!formData.loginPassword) {
            newErrors.loginPassword = "Please enter a password";
        } else {
            newErrors.loginPassword = ""; 
        }

        if (!formData.email) {
            newErrors.email = "Please enter an email";
        } else {
            newErrors.email = "";
        }

        setErrors(newErrors);
        
        // Prevent submission if there are errors
        if (!Object.values(errors).every(error => error === "")) return;

        // Set loading state to true while the API request is in progress
        setLoading(true);

        try {
            const response = await authController.startWithCredentials({
                email: formData.email,
                password: formData.loginPassword
            })
    
            // Redirect to EmailVerify page with formData (including email)
            navigate("/", { state: { userData: response.data } });

        } catch (error) {
            if (error.response && error.response.data.error) {
                const { keyPattern } = error.response.data.error;
                
                if (keyPattern.email) {
                    setErrors(prev => ({ ...prev, email: "This email is not registered" }));
                }
                if(keyPattern.password){
                    setErrors(prev => ({ ...prev, loginPassword: "Incorrect password" }));
                }
            } else {
                setMessage("Error registering user. Try again.");
            }
        } finally {
            // Set loading state to false once the request is complete (success or error)
            setLoading(false);
        }
    };

    return (
        <div className="w-full relative">
            <GridLines />

            <div className="min-h-screen flex items-center justify-center p-4 font-['Source_Code_Pro']">
                <div className="w-full max-w-2xl bg-black/20 rounded-2xl backdrop-blur-sm border border-white flex flex-col p-8 text-left">
                    <h1 className="font-bold lg:text-2xl">Welcome to Srijan - 2025!<br />Let's continue the adventure</h1>

                    <div className="mt-6 mb-4 flex flex-wrap">

                        <div className="w-full lg:w-1/2 flex flex-col ">
                            <GoogleSignInButton onClick={startWithGoogle}></GoogleSignInButton>
                            <form id="signupForm" className="space-y-4 mt-4" onSubmit={handleSubmit}>                                  
                                <EmailInput 
                                    labelContent={<><span className="text-[#8420FF]">Enter your</span> email</>}
                                    name="email"
                                    type="text"
                                    placeholder="Email..."
                                    value={formData.email}
                                    error={errors.email}
                                    setErrors={setErrors}
                                    onChange={handleChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                />
                                
                                <PasswordInput 
                                    labelContent={<><span className="text-[#8420FF]">Enter</span> password</>}
                                    name="loginPassword"
                                    placeholder={"Password..."}
                                    value={formData.loginPassword}
                                    error={errors.loginPassword}
                                    setErrors={setErrors}
                                    onChange={handleChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                />
                            </form>
                            <h1 onClick={()=> handleForgotPassword()} className='italic font-bold mt-4 cursor-pointer'><span className="text-[#8420FF] cursor-pointer">Forgot </span>Password?</h1>
                            {/* LOGIN BUTTON */}
                                <div className="w-full flex justify-center mt-8 lg:-ml-4">
                                    <SignUpButton onClick={handleSubmit} textContent = {loading ? "Logging In..." : "Login"}/>
                                </div>
                        </div>

                        {/* ROBOT IMAGE */}
                        <div className="hidden lg:flex w-1/2 flex-col items-center robot-container h-auto">
                            <img
                                src={imageSrc} 
                                alt="Robot mascot"
                                className="w-84 h-84 lg:w-84 lg:h-84 object-contain transition-all duration-900"
                            />
                        </div>

                        <h1 className='italic font-bold mt-4 lg:mt-0'>Not signed up yet? <span onClick={() => navigate("/signup")}  className="text-[#8420FF] cursor-pointer">Sign up</span></h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
