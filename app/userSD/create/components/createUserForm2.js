"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import Box from "@mui/material/Box";
import { Button, ButtonGroup, TextField, Typography, Radio, FormControlLabel } from "@mui/material";
import style from "./createUserForm.module.css"; 

const CreateUserForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({});
    const { register, handleSubmit, formState, reset } = form;
    const { errors } = formState;

    const onSubmitFunction = async (data) => {
        const payload = {
            id: Date.now(), 
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            password: data.password,
            id_Rol: 1, 
        };

        try {
            setLoading(true);
            await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND_USERS_URL}`, payload);
            router.push("/admin/homeProductsClient");
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        reset(); 
        setLoading(false);
    }, [reset]);

    return (
        <Box sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}>
            <form onSubmit={handleSubmit(onSubmitFunction)} noValidate>
                <Typography variant="h4" component="h2" align="center">
                    <br/>
                    Sign up
                    <br/><br/>
                </Typography>
                <Typography style={{ marginLeft: '20px' }}><strong>Name:</strong> </Typography>
                <TextField
                    required
                    id="userName"
                    label="Name"
                    variant="outlined"
                    {...register('name', { required: 'Name is required' })}
                    helperText={errors?.name?.message}
                /><br/>
                <Typography style={{ marginLeft: '20px' }}><strong>Email:</strong> </Typography>
                <TextField
                    required
                    id="userEmail"
                    label="Email"
                    variant="outlined"
                    {...register('email', { required: 'Email is required' })}
                    helperText={errors?.email?.message}
                /><br/>
                <Typography style={{ marginLeft: '20px' }}><strong>Phone number:</strong> </Typography>
                <TextField
                    required
                    id="userPhoneNumber"
                    label="Phone Number"
                    variant="outlined"
                    {...register('phone_number', { required: 'Phone Number is required' })}
                    helperText={errors?.phone_number?.message}
                /><br/>
                <Typography style={{ marginLeft: '20px' }}><strong>Password:</strong> </Typography>
                <TextField
                    required
                    id="userPassword"
                    label="Password"
                    type="password"
                    variant="outlined"
                    {...register('password', { required: 'Password is required' })}
                    helperText={errors?.password?.message}
                /><br/>
                <div className={style.buttonsArea}>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button href={'/userClients'}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            Save
                        </Button>
                    </ButtonGroup>
                </div>
            </form>
        </Box>
    );
};

export default CreateUserForm;
