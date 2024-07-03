import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { auth, db } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface User {
    uid?: string;
    name?: string;
    email: string;
    avatarUrl?: string | null;
    expirationTime?: string;
    password?: string;
}

interface AuthContextType {
    signed: boolean;
    user: User | null;
    loadingAuth: boolean;
    setLoadingAuth: (loading: boolean) => void;
    logOut: (expired: boolean) => Promise<void>;
    signIn: (user: User) => Promise<void>;
    signUp: (user: User) => Promise<void>;
    recoverPassword: (user: User) => Promise<void>;
    signUpGoogle: () => Promise<void>;
    emailauth: string;
    setEmailauth: (value: string) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
    signed: false,
    user: null,
    loadingAuth: false,
    setLoadingAuth: () => { },
    logOut: async () => { },
    signIn: async () => { },
    signUp: async () => { },
    recoverPassword: async () => { },
    signUpGoogle: async () => { },
    emailauth: '',
    setEmailauth: () => { },
});

export default function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // new state to handle the initial loading
    const provider = new GoogleAuthProvider()
    const [emailauth, setEmailauth] = useState<string>('')

    function storageUser(user: User) {
        const expirationTime = new Date().getTime() + 1 * 24 * 60 * 60 * 1000; // 1 dia em milissegundos

        const userData = {
            ...user,
            expirationTime,
        };

        localStorage.setItem('@ticketsPRO', JSON.stringify(userData));
        toast.success(`Bem-vindo(a), ${user.name}!`);
    }

    async function signIn(user: Pick<User, 'email' | 'password'>) {
        setLoadingAuth(true);
        try {
            if (user && user.email && user.password) {
                await signInWithEmailAndPassword(auth, user.email, user.password)
                    .then(async (value) => {
                        if (!value.user.emailVerified) {
                            toast.error("Please verify your email before logging in.");
                            return;
                        }

                        const uid = value.user.uid;
                        const docRef = doc(db, 'users', uid);
                        const docSnap = await getDoc(docRef);

                        const data: User = {
                            uid: uid,
                            name: docSnap.data()?.name,
                            email: value.user.email ? value.user.email : 'error recovering email sign in',
                            avatarUrl: docSnap.data()?.avatarUrl,
                        };

                        storageUser(data);

                        navigate('/');
                    })
                    .catch((error) => {
                        switch (error.code) {
                            case 'auth/user-not-found':
                                toast.error('User not found"');
                                break;
                            case 'auth/invalid-credential':
                                toast.error('Invalid credentials');
                                break;
                            default:
                                toast.error('Ops, something went wrong, try again later!');
                                break;
                        }

                    });
            } else {
                throw new Error('object user is necessary to sign in');
            }
        }
        catch (error) {
            console.log(error);
        } finally {
            setLoadingAuth(false);
        }
    }

    async function signUp(user: User) {
        setLoadingAuth(true);
        try {
            if (user && user.email && user.password) {
                await createUserWithEmailAndPassword(auth, user.email, user.password)

                    .then(async (value) => {
                        const uid = value.user.uid;

                        await setDoc(doc(db, 'users', uid), {
                            name: user.name,
                            avatarUrl: null,
                        })
                            .then(() => {
                                navigate('/signin');
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        await sendEmailVerification(value.user);
                    })
                    .catch((error) => {
                        let emailElement;
                        let emailInUseElement;
                        let passwordElement;

                        switch (error.code) {
                            case 'auth/invalid-email':
                                emailElement = document.getElementById('email');
                                if (emailElement) {
                                    emailElement.style.border = '1px solid red';
                                }
                                toast.error('Invalid email');
                                break;
                            case 'auth/email-already-in-use':
                                emailInUseElement = document.getElementById('email');
                                if (emailInUseElement) {
                                    emailInUseElement.style.border = '1px solid red';
                                }
                                toast.error('Email already in use');
                                break;
                            default:
                                passwordElement = document.getElementById('password');
                                if (passwordElement) {
                                    passwordElement.style.border = '1px solid red';
                                }
                                toast.error('Ops, something went wrong, try again later!');
                                break;
                        }
                    });
            } else {
                throw new Error('object user is necessary to sign up');
            }
        }
        catch (error) {
            console.log(error);
        } finally {
            setLoadingAuth(false);
            }
        }

    async function signUpGoogle() {
        setLoadingAuth(true);
        await signInWithPopup(auth, provider)
            .then(async (value) => {

                if (value.user.displayName !== null) {

                    const [nome] = value.user.displayName.split(' ');



                    const uid = value.user.uid;
                    await setDoc(doc(db, 'users', uid), {
                        name: nome,
                        avatarUrl: value.user.photoURL,
                    })
                        .then(() => {
                            const data: User = {
                                uid: uid,
                                name: nome,
                                email: value.user.email ? value.user.email : 'error recovering email sign up google',
                                avatarUrl: value.user.photoURL,
                            }

                            storageUser(data);

                            navigate('/');
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }

            })
            .catch((error) => {
                toast.error('Something went wrong, try again later');
                console.log(error);

            })
            .finally(() => {
                setLoadingAuth(false);
            });
    }

    const logOut = useCallback(async (expired: boolean) => {
        setLoadingAuth(true);
        await signOut(auth)
            .then(() => {
                localStorage.removeItem('@ticketsPRO');
                setUser(null);
                !expired ? toast.error('You have been logged out') : toast.info('Session expired');
                navigate('/');
            })
            .catch((error) => {
                console.log(error.code);
            })
            .finally(() => {
                setLoadingAuth(false);
            });
    }, [navigate]);

    async function recoverPassword(user: Pick<User, 'email'>) {
        setLoadingAuth(true);
        try {
            if (!user.email) {
                toast.error('Email is required');
            }
            await sendPasswordResetEmail(auth, user.email)
                .then(() => {
                    toast.success('Password recovery email sent successfully!');
                    navigate('/signin');
                })
                .catch((error) => {
                    toast.info('Failed to recover password: ' + error);
                });
    
        } catch (error) {
            toast.error('Failed to recover password: ' + error);
        } finally {
            setLoadingAuth(false);
        }
    }
    

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = localStorage.getItem('@ticketsPRO');
            if (storageUser) {
                const parsedUser = JSON.parse(storageUser);
                const currentTime = new Date().getTime();

                if (parsedUser.expirationTime && currentTime > parsedUser.expirationTime) {
                    await signOut(auth)
                        .then(() => {
                            logOut(true);
                        });
                }

                setUser(parsedUser);
            }
            setLoading(false); // Done loading
        }

        loadStorageData();
    }, [loadingAuth, loading, logOut, navigate]);

    return (
        <AuthContext.Provider
            value={{
                signed: !!user, // !! coverte para boolean, se conter algum dado é convertido para true, assim é possível verificar se há um usuário logado
                user,
                loadingAuth,
                setLoadingAuth,
                logOut,
                signIn,
                signUp,
                recoverPassword,
                signUpGoogle,
                emailauth,
                setEmailauth,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>

    );
}
