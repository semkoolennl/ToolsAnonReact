import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import SignUpForm from '../components/forms/SignUpForm';
import BasicAppBar from '../components/BasicAppBar';
import { Overlay } from '../components/common/.';
import { motion } from 'framer-motion';

export default function SignUp() {


  return (
    <>
      <BasicAppBar />
      <Overlay>
        <Container component="main" maxWidth="xs" sx={{zIndex: 3, marginTop: 8}}>
          <Toolbar />
          <SignUpForm />
        </Container>
      </Overlay>
    </>
  );
}