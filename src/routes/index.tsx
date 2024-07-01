import { Route, Routes } from "react-router-dom";
import Private from './Private';
import SignIn from '../pages/SignIn';
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

export default function RoutesApp(){
    return(
        <Routes>
            <Route path="/signin" element={ <Private> <SignIn/> </Private> }/>
            <Route path="/signup" element={ <Private> <SignUp/> </Private> }/>
            <Route path="/" element={ <Private> <Dashboard/> </Private> }/>
        </Routes>
    );
}
