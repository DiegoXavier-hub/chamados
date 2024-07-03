import { Route, Routes } from "react-router-dom";
import Private from './Private';
import SignIn from '../pages/SignIn';
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Error from "../pages/Error";
import Profile from "../pages/Profile";
import RecoverPassword from "../pages/EsqueciSenha";

export default function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={ <Private> <Dashboard/> </Private> }/>
            <Route path="/signin" element={ <Private> <SignIn/> </Private> }/>
            <Route path="/signup" element={ <Private> <SignUp/> </Private> }/>
            <Route path="/customers" element={ <Private> <Customers/> </Private> }/>
            <Route path="/profile" element={ <Private> <Profile/> </Private> }/>
            <Route path="/recoverpassword" element={ <Private> <RecoverPassword/> </Private> }/>
            <Route path='*' element={ <Error/> }/>
        </Routes>
    );
}
