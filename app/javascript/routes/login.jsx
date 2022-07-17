import { Button, Card, CardContent, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PageTemplate from "../components/Appbar/Page";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { isRequired, isValidEmail, validate } from "../Plugins/Validation";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const [valid, setValid] = useState({
        email: true,
        password: true
    })
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    }
    const handleChange = (key) => (e) => {
        setValues({ ...values, [key]: e.target.value })
    }
    const onSubmit = () => {
        setValid({
            email: validate([isValidEmail, isRequired], values.email),
            password: validate([isRequired], values.password)
        });
        console.log("HALO");
    }
    useEffect(() => {
        return () => {
            axios.post("/api/v1/login", {
                email: "testing",
                password: "AHAHAAH"
            })
                .then((res) => {
                    console.log(res);
                })
        };
    }, []);
    return (
        <>
            <PageTemplate>
                <Grid container>
                    <Grid item xs={6} className="center">
                        <Card sx={{ width: 400 }} raised>
                            <CardContent sx={{
                                textAlign: 'center'
                            }}>
                                < Typography variant="h4" align="center" sx={{ mb: 4 }}>
                                    Login as user
                                </Typography>
                                <TextField id="email"
                                    label="Email"
                                    variant="outlined"
                                    sx={{ mb: 2, width: "100%" }}
                                    error={!valid.email}
                                    helperText={!valid.email ? 'Please check your email!' : ''}
                                    onChange={handleChange('email')} />
                                <FormControl sx={{ mb: 2, width: "100%" }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        error={!valid.password}
                                    />
                                    <FormHelperText id="password-helper-text" error={!valid.password}>{!valid.password ? 'Please input your password!' : ''}</FormHelperText>
                                </FormControl>
                                <Typography sx={{ mb: 2 }}>Not a user? <Link to="/register">Sign up now!</Link></Typography>
                                <Button variant="contained" onClick={onSubmit}>Submit</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} className="center">
                        <img src="/images/login-register.png" alt="Login Picture" width="100%" />
                    </Grid>
                </Grid>
            </PageTemplate >
        </>
    )
}