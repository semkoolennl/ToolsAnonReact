import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField, { FilledTextFieldProps, TextFieldProps, TextFieldVariants } from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';

import Copyright from '../Copyright';
import BasicAppBar from '../BasicAppBar';
import { Divider, FilledInput, FormControl, FormHelperText, FormLabel, IconButton, Input, InputLabel, List, Modal, Stack, Switch, SxProps, Table, TableBody, TableCell, Toolbar, Tooltip } from '@mui/material';
import { RedirectLink } from '../../apiclient/toolsanon/types';
import { useApi, useAuth } from '../../context';
import { RouterLink } from '../common';
import { useForm, Controller, useWatch, RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RedirectLinkRequest } from '../../apiclient/toolsanon/endpoints/redirectLinkEndpoint';
import moment from 'moment-timezone';
import { stat } from 'fs';
import { Close } from '@mui/icons-material';
import RedirectLinkButtonGroup from '../common/RedirectLinkButtonGroup';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import AnimatedModal from '../common/AnimatedModal';
import ModalFormContainer from './ModalFormContainer';

import { updateRedirectLink, updateRedirectLinkStatus } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';


const item = {
  hidden: {
    y: 20,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  },
}

// slug cannot have any spaces
const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(30, 'Name must be at most 30 characters'),
    url: Yup.string()
      .required('URL is required')
      .url('URL must be a valid URL')
      .max(255, 'URL must be at most 255 characters'),
    slug: Yup.string()
      .max(30, 'Slug must be at most 30 characters')
      .test(
        'no-spaces',
        'Slug cannot have any spaces',
        value => !value || !/\s/.test(value)
      ),
    description: Yup.string()
      .max(255, 'Description must be at most 255 characters'),
    is_enabled: Yup.boolean(),
});

interface RedirectLinkFormProps {
    link: RedirectLink,
}

function Metadata({label, value}: {label: string, value: string}) {
  return (
    <>
      <Grid item xs={2}>
        {label}:
      </Grid>
      <Grid item xs={10}>
        {value}
      </Grid>
    </>
  )
}

const convertDate = (date: string) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

const getNormalUrl = (link: RedirectLink) => `${window.location.origin}/r/id/${link.id}`;
const getSlugUrl   = (user_id: number, slug?: string) => `${window.location.origin}/r/slug/${user_id}/${slug}`;

function FormHeader({link, is_enabled, control, register}: {link: RedirectLink, is_enabled: boolean|undefined, control: any, register: UseFormRegisterReturn}) {
  const dispatch = useDispatch();


  return (
    <Stack direction='row' alignItems='baseline' justifyContent='sapce-around' sx={{mb: 2}}>
        <Chip label={link.clicks + " redirects"} variant='outlined' color='info' sx={{ borderRadius: 10 }}/>

        <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center" sx={{flexGrow: 1}}>
            {link.id === '' ? 'Create' : 'Update'} Redirect Link
        </Typography>

        <FormControlLabel
          label={is_enabled ? ' Enabled' : 'Disabled'}
          sx={{
            color: is_enabled ? 'success.main' : 'error.main',
            width: '100px'
          }}
          control={
            <Controller
                control={control}
                {...register}
                render={({ field: { onChange, value } }) => (
                <Switch
                  color={value ? 'success' : 'error'}
                  onChange={(e) => {
                    onChange(e.target.checked)
                  }}
                  checked={value}
                />
              )}
            />
          }
        />
      </Stack>
  )
};

function DividerWithText({children, sx}: {children: React.ReactNode, sx?: SxProps<any>}) {
  return (
    <Divider sx={sx}>
      <Typography variant="body2" color="grey">{children}</Typography>
    </Divider>
  )
}

function CustomTextField({register, control, topLabel, ...rest}: {register: UseFormRegisterReturn, control: any, topLabel?: string} & TextFieldProps) {
  return (
    <>
      {topLabel && (
        <FormHelperText sx={{pt: 1.5}}>{topLabel}</FormHelperText>
      )}
      <TextField
        autoComplete='off'
        variant='filled'
        margin="dense"
        required
        fullWidth
        {...register}
        {...rest}
      />
    </>
  )
}

export default function RedirectLinkForm({ object }: {object: RedirectLink}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register, control, handleSubmit, reset, watch, trigger, formState: { errors } } = useForm({
        values: {
            name: object.name,
            url: object.url,
            slug: object.slug,
            description: object.description,
            is_enabled: object.is_enabled,
        },
        resolver: yupResolver(validationSchema),
        mode: 'onSubmit',
    });

    const is_enabled = watch('is_enabled');
    const slug       = watch('slug');

    const onSubmit = async (data: any) => {
        console.log('Form data: ', data);
        try {
            const request: RedirectLinkRequest = Object.assign({}, object, data);
            dispatch<ThunkDispatch>(updateRedirectLink(object.id, request));
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => {
      navigate('/redirects');
    }

    return (
      <ModalFormContainer handleClose={handleClose}>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)} >

          <FormHeader link={object} is_enabled={is_enabled} control={control} register={register('is_enabled')} />

          <motion.div variants={item}>
            <DividerWithText sx={{ mt: 1 }}>General</DividerWithText>
            <CustomTextField
              id="name"
              label='Name'
              topLabel="The name to associate with this link"
              register={register('name')}
              control={control}
              error={errors.name ? true : false}
              helperText={errors.name?.message}
            />
            <CustomTextField
              id="url"
              label='URL'
              topLabel="The URL to redirect to"
              register={register('url')}
              control={control}
              error={errors.url ? true : false}
              helperText={errors.url?.message}
            />
            <CustomTextField
              id="slug"
              label='Slug'
              topLabel="Optional slug to use for this link instead of the ID"
              register={register('slug')}
              control={control}
              error={errors.slug ? true : false}
              helperText={errors.slug?.message}
            />
          </motion.div>

          <motion.div variants={item}>
            <DividerWithText sx={{ mt: 3 }}>Redirect urls</DividerWithText>
            <RedirectLinkButtonGroup redirectUrl={getNormalUrl(object)} tooltip='Test out redirect url' />
            {(slug == '' || slug == undefined) ? '' : (
              <RedirectLinkButtonGroup redirectUrl={getSlugUrl(object.user_id, slug)} tooltip='Test out redirect url' />
            )}
          </motion.div>


          <motion.div variants={item}>
            <DividerWithText sx={{ mt: 1}}>Description</DividerWithText>
            <CustomTextField
              hiddenLabel
              multiline
              rows={4}
              defaultValue={object.description}
              id="description"
              register={register('description')}
              control={control}
              error={errors.description ? true : false}
              helperText={errors.description?.message}
            />
          </motion.div>

          <motion.div variants={item}>
            <DividerWithText sx={{ my: 1}}>Metadata</DividerWithText>
            <Grid container spacing={0}>
              <Metadata label='ID' value={object.id} />
              <Metadata label='Created at' value={convertDate(object.created_at)} />
              <Metadata label='Updated at' value={convertDate(object.updated_at)} />
            </Grid>
          </motion.div>

          <motion.div variants={item}>
            <Button
                fullWidth
                type="submit"
                variant="contained"
                size='large'
                sx={{
                    mt: 3,
                    borderRadius: 2,
                    boxShadow: 10,
                }}
            >
                {object.id === '' ? 'Create' : 'Update'}
            </Button>
          </motion.div>
          </Box>
      </ModalFormContainer>
    )
}