import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';

import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Copyright from '../Copyright';
import { useApi, useAuth } from '../../context/.';
import { yupResolver } from '@hookform/resolvers/yup';
import { RouterLink } from '../common/.';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(6, 'Name must be at least 6 characters')
    .max(50, 'Name must be at most 30 characters'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required')
    .max(50, 'Email must be at most 50 characters'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
    .matches(/^(.*[A-Z].*)$/, 'Password must contain at least 1 uppercase letter')
    .matches(/^(.*[!@#$%^&*()\-_=+{};:,<.>].*)$/, 'Password must contain at least 1 special character'),
  acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
});

export default function SignUp() {
  const { api }              = useApi();
  const { setUser }          = useAuth();
   const {register, control, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(validationSchema)});

  const onSubmit = async (data: any) => {
    const response = api.auth.register(data);
    setUser((await response).user);
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
            Sign up
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                autoComplete="user"
                variant='filled'
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                {...register('name')}
                error={errors.name ? true : false}
                helperText={errors.name?.message}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant='filled'
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register('email')}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant='filled'
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register('password')}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                control={
                    <Controller
                    control={control}
                    name="acceptTerms"
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => (
                        <Checkbox
                        color="primary"
                        onChange={(e) => onChange(e.target.checked)}
                        checked={value}
                        />
                    )}
                    />
                }
                label={<>I agree to the <Link component={RouterLink} to="#">Terms and Conditions</Link>.</>}
                />
                <FormLabel component="legend" error >
                {errors.acceptTerms ? '* ' + errors.acceptTerms.message + '' : ''}
                </FormLabel>
            </Grid>
            </Grid>
            <Button onClick={handleSubmit(onSubmit)}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
            <Grid item>
                <RouterLink variant="body2" to="/signin">
                Already have an account? Sign in
                </RouterLink>
            </Grid>
            </Grid>
        </Box>
        <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}