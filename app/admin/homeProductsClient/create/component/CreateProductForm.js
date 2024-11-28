"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import Box from "@mui/material/Box";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import style from "./createProductForm.module.css";

const CreateProductForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({});
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzZWN1cmUtYXBpIiwiYXVkIjoic2VjdXJlLWFwcCIsInN1YiI6InNvZmlhLnJ1YmllQGdtYWlsLmNvbSIsImV4cCI6MTczMjg2NTc1OX0.BPa4qGcEDoBJptUpAbVlJFVK7wX_haZ299aJzkTDZLfMfLHZSmzjBhVg00tpzaPaOkyK2mOL11BW-n9z5GW__w"; // Token válido

    const onSubmitFunction = async (data) => {
        const payload = {
            ...data,
            category: {
                idCategory: 2,
                name: "Chocolate Cake",
                description: "Rich and moist chocolate sponge cake",
            },
            image: "imagen7.png", // Imagen predeterminada
            createdAt: new Date().toISOString(), // Fecha de creación actual
            updatedAt: new Date().toISOString(), // Fecha de actualización actual
        };

        try {
            setLoading(true);
            await axios.post(
                "https://sweet-dreams-app-v01-526d0a7b9b94.herokuapp.com/v1/product",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            router.push("/admin/homeProductsClient");
            router.refresh();
        } catch (error) {
            console.error("Error al crear el producto:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
        >
            <form onSubmit={handleSubmit(onSubmitFunction)} noValidate>
                <div>
                    <br />
                    <Typography variant="h4" component="h2" align="center">
                        Create Product
                    </Typography>
                    <br />
                    <TextField
                        required
                        id="productName"
                        label="Name"
                        variant="outlined"
                        {...register("name", {
                            required: "Name is required",
                        })}
                        helperText={errors?.name?.message}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="productDescription"
                        label="Description"
                        variant="outlined"
                        {...register("description", {
                            required: "Description is required",
                        })}
                        helperText={errors?.description?.message}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="productPrice"
                        label="Price"
                        type="number"
                        variant="outlined"
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 0, message: "Price must be positive" },
                        })}
                        helperText={errors?.price?.message}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="productCount"
                        label="Count"
                        type="number"
                        variant="outlined"
                        {...register("count", {
                            required: "Count is required",
                            min: { value: 0, message: "Count must be positive" },
                        })}
                        helperText={errors?.count?.message}
                    />
                </div>
                <div className={style.buttonsArea}>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button href={"/admin/homeProductsClient"}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            Create
                        </Button>
                    </ButtonGroup>
                </div>
            </form>
        </Box>
    );
};

export default CreateProductForm;
