import { BrowserRouter, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RoutesApp from './routes';
import AuthProvider from './contexts/auth.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';

export default function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent/>
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppContent(){
  const location = useLocation();
  const [showHeader, setShowHeader] = useState<boolean>(false);

  useEffect(()=>{
    const local = location.pathname;
    if(local!=='/' && local!=='/customers' && local!=='/profile'){
      setShowHeader(false);
    }else{
      setShowHeader(true);
    }
  }, [location]);

  return(
    <>
      {showHeader && <Header />}
      <ToastContainer autoClose={2500} />
      <RoutesApp />
    </>
  );
}
