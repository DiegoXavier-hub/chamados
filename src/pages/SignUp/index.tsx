import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import Fire from '../../assets/images/flame.jpg'
import Button from '../../components/Button';
import { FcGoogle } from "react-icons/fc";
import '../../assets/sass/signInSignUp.css';

// Schema de validação usando Zod
const userSchema = z.object({
    name: z.string().min(3, "Name must have at least 3 characters").max(50),
    password: z.string().min(8, "Password must have at least 8 characters").max(50),
    email: z.string().email("Type a valid email").min(9, "Type a valid email")
        .refine((value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), "Type a valid email")
});

interface User {
    name: string;
    email: string;
    password?: string;
}

type UserSchema = z.infer<typeof userSchema>;

export default function SignUp() {

    const { signUp, loadingAuth, signUpGoogle, setLoadingAuth } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm<UserSchema>({
        resolver: zodResolver(userSchema)
    });

    async function handleSave(user: User) {
        setLoadingAuth(true)
        await signUp(user);
        setLoadingAuth(false);
    }

    return (
        <div id="SignUp">
            <div className="container">
                <img src={Fire} alt="fireImage" />
                <form onSubmit={handleSubmit(handleSave)}>
                    <h1>Join Us</h1>
                    <h2>Welcome it's nice to see you here!</h2>

                    <input id='name' type="text" placeholder="Enter your name" required {...register("name")} />
                    {errors.name && <span className='error'>{errors.name.message}</span>}
                    <input id='email' type="text" placeholder="Enter your email" required {...register("email")} />
                    {errors.email && <span className='error'>{errors.email.message}</span>}
                    <input id='password' type="password" placeholder="Password" required {...register("password")} />
                    {errors.password && <span className='error'>{errors.password.message}</span>}

                    <Button buttonType='submit' classbutton='genericbuttonnormal'>
                        {loadingAuth ? <div className="loader"></div> : 'Sign Up'}
                    </Button>
                    <Button buttonType='button' classbutton='genericbuttonwhite' onClick={signUpGoogle}>
                        <FcGoogle size={25}/>
                    </Button>
                    <div className='register-link-text'>Already have a account?<Link to='/signin' className='register-link'> Sign In</Link></div>
                </form>
            </div>
        </div>
    );
}
