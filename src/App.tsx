import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProviderWrapper from './context';
import AppBar from './components/AppBar';
import { SignIn, SignUp } from './pages';
import RouteWrapper from './components/RouteWrapper';
import { motion, AnimatePresence } from "framer-motion"
import RedirectsLayout from './pages/redirects/RedirectsLayout';

function Content() {
  const location = useLocation();


  return (
    <AnimatePresence>
      <Routes>
        <Route element={<RouteWrapper redirectTo='/signin' />} >
          <Route path="/redirects/*" element={<RedirectsLayout/>} />
          <Route path="/" element={<Navigate to='/redirects' />} />
        </Route>
        <Route element={<RouteWrapper redirectTo='/' reverse />} >
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ProviderWrapper>
      <CssBaseline />
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </ProviderWrapper>
  );
}
