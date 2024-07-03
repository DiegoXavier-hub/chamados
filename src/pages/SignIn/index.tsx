import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import Fire from '../../assets/images/fire.jpg';
import Button from '../../components/Button';
import { FcGoogle } from "react-icons/fc";
import '../../assets/sass/signInSignUp.css';

// Schema de validação usando Zod
const userSchema = z.object({
    password: z.string().min(8, "Password must have at least 8 characters").max(50),
    email: z.string().email("Type a valid email").min(9, "Type a valid email")
        .refine((value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), "Type a valid email")
});

interface User {
    email: string;
    password?: string;
}

type UserSchema = z.infer<typeof userSchema>;

export default function SignIn() {
    const navigate = useNavigate();
    const { signIn, loadingAuth, signUpGoogle, setLoadingAuth, setEmailauth } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm<UserSchema>({
        resolver: zodResolver(userSchema)
    });

    async function handleSave(user: User) {
        setLoadingAuth(true)
        await signIn(user);
        setLoadingAuth(false)
    }

    function recoverPassword(){
        const emailInput = document.getElementById("email") as HTMLInputElement;
        setEmailauth(emailInput.value)
        navigate('/recoverpassword')
    }

    return (
        <div id="SignIn">
            <div className="container">
                <img src={Fire} alt="fireImage" />
                <form onSubmit={handleSubmit(handleSave)}>
                    <h1>Hello Again!</h1>
                    <h2>Welcome back you've been missed!</h2>

                    <input id='email' type="text" placeholder="Enter your email"  required {...register("email")} />
                    {errors.email && <span className='error'>{errors.email.message}</span>}
                    <input id='password' type="password" placeholder="Password" required {...register("password")} />
                    {errors.password && <span className='error'>{errors.password.message}</span>}

                    <div onClick={()=>{
                        recoverPassword()
                    }} className='recovery-password'>Recovery Password</div>
                    <Button buttonType='submit' classbutton='genericbuttonnormal'>
                        {loadingAuth ? <div className="loader"></div> : 'Sign In'}
                    </Button>
                    <Button buttonType='button' classbutton='genericbuttonwhite' onClick={signUpGoogle}>
                        <FcGoogle size={25}/>
                    </Button>
                    <div className='register-link-text'>Not a member?<Link to='/signup' className='register-link'> Register now</Link></div>
                </form>
            </div>
        </div>
    );
}
