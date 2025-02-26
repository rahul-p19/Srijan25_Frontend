import React, { useState } from "react";
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import "./index.css";

function TextInput({ labelContent, className, name, type, placeholder, value, error, onChange, onFocus, onBlur }) {
    return (
        <div className="text-sm">
            <label htmlFor={name} className="text-white font-extrabold text-sm sm:text-base">
                {labelContent}
            </label>
            <br />
            <div className='flex flex-row items-center'>
                {value && !error && <CheckIcon className="h-5 w-5 text-green-500" />}
                {value && error && <XMarkIcon className="h-5 w-5 text-red-500" />}
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}
                    required
                    className={`input-field text-sm sm:text-base font-extrabold ${className} ${!value ? 'ml-4' : ''}`}
                />
            </div>
            {error && <p className="text-red-500 text-sm ml-4 italic font-extrabold">{error}</p>}
        </div>
    );
}

function EmailInput({ labelContent, name, value, onChange, error, setErrors, onFocus, onBlur }) {

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors(prev => ({
                ...prev,
                email: emailRegex.test(email) ? "" : "Enter a valid email"
            }));
    };
    const handleChange = (e) => {
        const { value } = e.target;
        onChange(e);
        validateEmail(value);
    };

    return (
        <TextInput
            labelContent={labelContent}
            name={name}
            type="text"
            placeholder="Email..."
            value={value}
            error={error}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
}

function PhoneInput({ labelContent, name, value, onChange, error, setErrors, onFocus, onBlur }) {

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        setErrors(prev => ({
                ...prev,    
                phone: phoneRegex.test(phone) ? "" : "Enter a valid phone number"
            }));
    };

    const handleChange = (e) => {
        const { value } = e.target;
        onChange(e);
        validatePhone(value);
    };

    return (
        <TextInput
            labelContent={labelContent}
            name={name}
            type="text"
            placeholder="Phone Number..."
            value={value}
            error={error}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
}

function PasswordInput({ labelContent, name, placeholder, value, error, setErrors, password, onChange, onFocus, onBlur }) {

    const validatePassword = (password) => {
        let message = "";
        if (password.length < 8) {
            message = "Password must be at least 8 characters long.";
        } else if (!/[A-Z]/.test(password)) {
            message = "Password must contain at least one uppercase letter.";
        } else if (!/[a-z]/.test(password)) {
            message = "Password must contain at least one lowercase letter.";
        } else if (!/\d/.test(password)) {
            message = "Password must contain at least one digit.";
        }

        setErrors(prev => ({
            ...prev,
            password: message
        }));
    };

    const validateConfirmPassword = (confirmPassword) => {
        setErrors(prev => ({
                ...prev,
                confirmPassword: password === confirmPassword ? "" : "Passwords do not match"
            }));
    }

    const handleChange = (e) => {
        const { value } = e.target;
        onChange(e);
        if(name === "loginPassword") setErrors(prev => ({
            ...prev,
            loginPassword: ""
        }));
        if(name === "password") validatePassword(value);
        if(name === "confirmPassword") validateConfirmPassword(value);

    };

    return (
        <TextInput
            labelContent={labelContent}
            name={name}
            type="password"
            placeholder={placeholder}
            value={value}
            error={error}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
}

export { TextInput, EmailInput, PhoneInput, PasswordInput };
