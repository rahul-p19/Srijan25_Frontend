// loginButton.jsx
import { BasicButton } from "./common";
import { FcGoogle } from 'react-icons/fc'

function SignUpButton({ onClick, textContent }) {
    return (
        <BasicButton
            type="submit"
            text={textContent || "SIGN UP"}
            className="border-green-500 text-white w-36"
            onClick={onClick}
        />
    );
}

function GoogleSignInButton({ onClick, textContent }) {
    return (
        <BasicButton
            text={textContent || "Sign in with Google"}
            IconElement={() => <FcGoogle className="mx-2 size-6" />}
            className="bg-[#000000] w-6/7 flex items-center justify-center py-3 rounded-lg"
            onClick={onClick}
        />
    );
}


export { SignUpButton, GoogleSignInButton };
