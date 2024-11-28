"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import style from "./editUserForm.module.css";

const EditUserForm = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({});
    const { register, handleSubmit, formState, setValue } = form;
    const { errors } = formState;

    const onSubmitFunction = async (data) => {
        try {
            setLoading(true);
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BACKEND_USERS_URL}/${user.id}`,
                { ...data, password: data.password } 
            );
            router.push("/admin/homeProductsClient");
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setValue("name", user.name);
        setValue("email", user.email);
        setValue("phone_number", user.phone_number);
    }, [user, setValue]);

    return (
        <Box sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}>
            <Typography variant="h4" component="h2" align="center">
                <br /><br /> Edit User<br />
            </Typography>
            <form onSubmit={handleSubmit(onSubmitFunction)} noValidate>
                <div>
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>Name</Typography>
                    <TextField
                        required
                        id="userName"
                        defaultValue={user.name}
                        variant="outlined"
                        {...register('name', { required: 'Name is required' })}
                        helperText={errors?.name?.message}
                    />
                </div>
                <div>
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>Email</Typography>
                    <TextField
                        required
                        id="userEmail"
                        defaultValue={user.email}
                        variant="outlined"
                        {...register('email', { required: 'Email is required' })}
                        helperText={errors?.email?.message}
                    />
                </div>
                <div>
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>Phone Number</Typography>
                    <TextField
                        required
                        id="userPhoneNumber"
                        defaultValue={user.phone_number}
                        variant="outlined"
                        {...register('phone_number', { required: 'Phone Number is required' })}
                        helperText={errors?.phone_number?.message}
                    />
                </div>
                <div>
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>Password</Typography>
                    <TextField
                        required
                        id="userPassword"
                        label="New Password"
                        type="password"
                        variant="outlined"
                        {...register('password', { required: 'Password is required' })}
                        helperText={errors?.password?.message}
                    />
                </div>
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

export default EditUserForm;
