import { useContext, useEffect } from 'react';
import Button from '../../components/Button';
import { AuthContext } from '../../contexts/auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import '../../assets/sass/esquecisenha.css';

interface User {
    email: string;
}

// Schema de validação usando Zod
const userSchema = z.object({
    email: z.string().email("Type a valid email").min(9, "Type a valid email")
        .refine((value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), "Type a valid email")
});

type UserSchema = z.infer<typeof userSchema>;

const RecoverPassword: React.FC = () => {
    const { loadingAuth, emailauth, recoverPassword, setLoadingAuth } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<UserSchema>({
        resolver: zodResolver(userSchema)
    });

    const onSubmit = (user: User) => {
        setLoadingAuth(true);
        recoverPassword(user);
        setLoadingAuth(false);
    };

    useEffect(() => {
        const emailInput = document.getElementById("email") as HTMLInputElement;
        if (emailInput !== null) {
            setValue("email", emailInput.value = emailauth);
        }
    }, [emailauth, setValue]);

    return (
        <div id="RecoverPassword">
            <div className='content'>
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Email:
                        <input
                            type="email"
                            placeholder="Email"
                            id='email'
                            {...register('email')}
                            required
                        />
                        {errors.email && <span className='error'>{errors.email.message}</span>}
                    </label>
                    <Button
                        buttonDisabled={loadingAuth}
                        buttonType='submit'
                        classbutton='genericbuttonnormal'
                    >
                        {loadingAuth ? <div className="loader"></div> : 'Send Reset Link'}
                    </Button>
                    <span className='sign-message-content'>A password reset link will be sent to your email</span>
                </form>
            </div>
        </div>
    );
};

export default RecoverPassword;
