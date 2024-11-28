"use client";
import React from "react";
import { Box, Button, ButtonGroup, TextField, Typography } from "@mui/material";
import style from "./productDetails.module.css";
/**
 * ProductDetails Component - Displays the details of a single product.
 * This component uses Material-UI components for styling and layout.
 * @param {Object} props - The props object containing the product data.
 * @param {Object} props.product - The product object with its details (id, name, category, price, etc.).
 * @returns {JSX.Element} - The JSX for rendering the product details form.
 */
const ProductDetails = ({ product }) => {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' }, 
            }}
            noValidate
            autoComplete="off"
        >
            {/* Título */}
            <div>
                <br /><br/>
                <Typography variant="h4" component="h2" align="center">
                    Product Detail
                </Typography>
                <br />
            </div>

            {}
            <div>
                <TextField
                    id="product-id"
                    label="Product ID"
                    defaultValue={product.idProduct} // Muestra el ID del producto
                    InputProps={{
                        readOnly: true, // Hace que el campo sea de solo lectura
                    }}
                    variant="outlined"
                />
            </div>

            {/* Nombre del Producto - Campo de solo lectura */}
            <div>
                <TextField
                    id="product-name"
                    label="Name"
                    defaultValue={product.name} // Muestra el nombre del producto
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
            </div>

            {/* Precio del Producto - Campo de solo lectura */}
            <div>
                <TextField
                    id="product-price"
                    label="Price"
                    defaultValue={product.price} // Muestra el precio del producto
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
            </div>

            {/* Categoría del Producto - Campo de solo lectura */}
            <div>
                <TextField
                    id="product-category"
                    label="Category"
                    defaultValue={product.category.name} // Muestra el nombre de la categoría del producto
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
            </div>

            {/* Descripción del Producto - Campo de solo lectura */}
            <div>
                <TextField
                    id="product-description"
                    label="Description"
                    defaultValue={product.description} // Muestra la descripción del producto
                    multiline
                    rows={4}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
            </div>

            {/* Mostrar la imagen como texto */}
            <div>
                <TextField
                    id="product-image"
                    label="Image"
                    defaultValue={product.image} // Muestra el nombre del archivo de imagen
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
            </div>

            {/* Grupo de Botones - Cancelar, Editar, Eliminar */}
            <div>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    {/* Botón Cancelar - Navega de regreso a la lista de productos */}
                    <Button href="/homeProductsUser">Cancel</Button>

                    {/* Botón Editar - Para futura funcionalidad de editar detalles del producto */}
                    <Button href={`/homeProductsUser/edit/${product.idProduct}`}>Edit</Button>

                    {/* Botón Eliminar - Para futura funcionalidad de eliminar el producto */}
                    <Button href={`/homeProductsUser/delete/${product.idProduct}`}>Delete</Button>
                </ButtonGroup>
            </div>
        </Box>
    );
};

export default ProductDetails;