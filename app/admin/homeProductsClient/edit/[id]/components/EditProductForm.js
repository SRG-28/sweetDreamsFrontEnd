"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import style from "./editProductForm.module.css";

const EditProductForm = ({ product }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const form = useForm({});
    const { register, handleSubmit, formState, reset, setValue } = form;
    const { errors } = formState;

    const onSubmitFunction = async (data) => {
        console.log(data);
        try {
            setLoading(true);
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BACKEND_PRODUCTS_URL}/${product.id}`,
                data
            );
            router.push("/admin/homeProductsClient"); // Cambiar a la ruta correspondiente para los productos
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Establecer los valores del formulario al cargar
        setValue("id", product.id);
        setValue("name", product.name);
        setValue("description", product.description);
        setValue("price", product.price);
        setLoading(false);
    }, [product, setValue]);

    return (
        <>
            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
            > 
             <br /><br/>
                <Typography variant="h4" component="h2" align="center">
                    Edit Product
                </Typography>
                <br />
                <form onSubmit={handleSubmit(onSubmitFunction)} noValidate>
                    <div>
                    <br/>
                        <TextField
                            id="productId"
                            label="Product Id"
                            defaultValue={product.id}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            id="productName"
                            label="Name"
                            defaultValue={product.title}
                            variant="outlined"
                            {...register('name', {
                                required: 'Name is required',
                            })}
                            helperText={errors?.name?.message}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            id="productDescription"
                            label="Description"
                            defaultValue={product.description}
                            variant="outlined"
                            {...register('description', {
                                required: 'Description is required',
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
                            defaultValue={product.price}
                            variant="outlined"
                            {...register('price', {
                                required: 'Price is required',
                                min: { value: 0, message: 'Price must be positive' }
                            })}
                            helperText={errors?.price?.message}
                        />
                    </div>
                    <div className={style.buttonsArea}>
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button href={'/admin/homeProductsClient'}>Cancel</Button>
                            <Button
                                type="submit"
                                disabled={loading}
                            >
                                Save
                            </Button>
                        </ButtonGroup>
                    </div>
                </form>
            </Box>
        </>
    );
};

export default EditProductForm;
