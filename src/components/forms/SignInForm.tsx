import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import Copyright from '../Copyright';
import { useApi, useAuth } from '../../context';
import { RouterLink } from '../common/.';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid')
      .max(255, 'Email must be at most 255 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(255, 'Password must be at most 255 characters'),
    remember: Yup.boolean(),
});

export default function SignInForm() {
    const { api }   = useApi();
    const { login } = useAuth();

    const {register, control, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(validationSchema)});
    const [errorState, setErrorState] = React.useState(false);

    const onSubmit = async (data: any) => {
        try {
            const remember = data.remember === true;
            console.log(data);
            login(data.email, data.password, remember);
        } catch (error) {
            setErrorState(true);
            setTimeout(() => {
                setErrorState(false);
            }, 1500);
            console.log(error);
        }
    };

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.paper',
        padding: 3,
        boxShadow: 10,
        borderRadius: 3,
        }}
    >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: '70px', height: '70px' }}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign in
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)} >
            <Typography component="h3" variant='h6' color='error' textAlign='center' sx={{ minHeight: '1.6em', p: 0 }}>
                { errorState ? '* Invalid Credentials' : ''}
            </Typography>
        <TextField
            variant='filled'
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register('email')}
        />
        <TextField
            variant='filled'
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
        />
        <FormControlLabel
            control={
                <Controller
                control={control}
                defaultValue={false}
              {...register('remember')}

                render={({ field: { onChange, value } }) => (
                    <Checkbox
                    color="primary"
                    onChange={(e) => onChange(e.target.checked)}
                    checked={value}

                    />
                )}
                />
            }
            label="Remember me"
            />
        <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Sign In
        </Button>
        <Grid container>
            <Grid item xs>
                <RouterLink variant="body2" to='#'>
                    Forgot password?
                </RouterLink>
            </Grid>
            <Grid item>
                <RouterLink to="/signup" >
                    Don't have an account? Sign Up
                </RouterLink>
            </Grid>
        </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
    </Box>
  );
}