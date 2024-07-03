import { FunctionComponent, ReactNode } from "react";
import '../../assets/sass/button.css'

interface ButtonProps{
    onClick?: () => void;
    buttonDisabled?: boolean;
    buttonType?: "submit" | "reset" | "button" | undefined;
    children?: ReactNode;
    classbutton: 'genericbuttonnormal' | 'genericbuttonwhite';
}

const Button: FunctionComponent<ButtonProps> = ({ onClick, buttonDisabled, buttonType, children, classbutton }) => {
    return (
        <button 
        type={buttonType}
        onClick={onClick}
        disabled={buttonDisabled}
        className={classbutton + ' genericbutton'}
        >
        {children}
        </button>
    );
};

export default Button;
