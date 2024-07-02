import { FunctionComponent, ReactNode } from "react";

interface ButtonProps{
    onClick?: () => void;
    buttonDisabled?: boolean;
    buttonType?: "submit" | "reset" | "button" | undefined;
    children?: ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({ onClick, buttonDisabled, buttonType, children }) => {
    return (
        <button 
        type={buttonType}
        onClick={onClick}
        disabled={buttonDisabled}
        className='genericbutton'
        >
        {children}
        </button>
    );
};

export default Button;
