import React, { useState, useEffect } from 'react';
import '../App.css';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { validateEmail } from '../utils/helpers'
import { Button } from '@mui/material';
import { Snackbar } from './Snackbar'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { signup } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const nav=useNavigate();
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loginFields, setLoginFields] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password1: '',
        password2: '',
        tos: false
    });
    const [snackbar, setSnackbar] = useState({
        severity: 'success',
        open: false,
        message: ''
    })
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const formValidated = () => {
        const { email, first_name, last_name, tos, password1, password2 } = loginFields;
        const isValid = email && first_name && last_name && tos && password1 === password2;
        return isValid;
    }


    return (
        <div className="App-login">
            <img className="App-logo" src="logo.png" />
            <FormControl sx={{ m: 1, width: 'calc(100% - 16px)' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-first_name">First name</InputLabel>
                <OutlinedInput
                    error={!loginFields.first_name && loginFields.first_name !== ''}
                    onBlur={ev => { setLoginFields({ ...loginFields, first_name: ev.target.value }) }}
                    id="outlined-adornment-first_name"
                    type="text"
                    label="First name"
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: 'calc(100% - 16px)' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-last_name">Last name</InputLabel>
                <OutlinedInput
                    error={!loginFields.last_name && loginFields.last_name !== ''}
                    onBlur={ev => { setLoginFields({ ...loginFields, last_name: ev.target.value }) }}
                    id="outlined-adornment-last_name"
                    type="text"
                    label="Last name"
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: 'calc(100% - 16px)' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                <OutlinedInput
                    error={!!loginFields.email && !validateEmail(loginFields.email)}
                    onBlur={ev => { setLoginFields({ ...loginFields, email: ev.target.value }) }}
                    id="outlined-adornment-email"
                    type="email"
                    label="Email"
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: 'calc(100% - 16px)' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password1">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password1"
                    type={showPassword1 ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword1}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword1 ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    onBlur={ev => { setLoginFields({ ...loginFields, password1: ev.target.value }) }}
                    label="Password"
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: 'calc(100% - 16px)' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password2">Validate password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password2"
                    type={showPassword2 ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword2 ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    onBlur={ev => { setLoginFields({ ...loginFields, password2: ev.target.value }) }}
                    label="Password"
                    error={loginFields.password1 !== loginFields.password2 && loginFields.password1 !== ''}
                />
            </FormControl>
            <FormGroup>
                <FormControlLabel style={{ color: "#333" }} control={<Checkbox onChange={(ev) => { setLoginFields({ ...loginFields, tos: ev.target.checked }) }} />} label="Label" />
            </FormGroup>
            <Button disabled={!formValidated()} onClick={async () => {
                const msg = await signup(loginFields);
                if (!msg.includes('exist')) {
                    // if user created - login
                    setSnackbar({
                        severity: 'success',
                        message: "WOWWWW",
                        open: true
                    })
                    // props.finishSignUp()
                    nav('/Questionnaire')
                } else {
                    // else show error message and do nothing
                    setSnackbar({
                        severity: 'error',
                        message: "טעות אח שלי",
                        open: true
                    })
                }

            }} variant="contained">Signup</Button>
            <Snackbar snackbar={snackbar}></Snackbar>
        </div>
    );
}

export default Signup;
