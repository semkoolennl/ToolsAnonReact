import { Toolbar } from '@mui/material';
import Container from '@mui/material/Container';
import BasicAppBar from '../components/BasicAppBar';
import SignInForm from '../components/forms/SignInForm';
import { Overlay } from '../components/common/.';

export default function SignIn() {

  return (
    <>
      <BasicAppBar />
      <Overlay>
        <Container component="main" maxWidth="xs" sx={{zIndex: 3, marginTop: 8}} >
          <Toolbar />
          <SignInForm />
        </Container>
      </Overlay>
    </>
  );
}