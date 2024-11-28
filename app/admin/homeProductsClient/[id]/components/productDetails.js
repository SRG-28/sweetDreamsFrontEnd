"use client";
import React from "react";
import { Box, Button, ButtonGroup, TextField, Typography } from "@mui/material";
import style from "./productDetails.module.css";
// Si decides usar estilos de módulo, asegúrate de que la ruta sea correcta

/**
 * TaskDetails Component - Displays the details of a single task in a read-only form.
 * This component uses Material-UI components for styling and layout.
 * @param {Object} props - The props object containing the task data.
 * @param {Object} props.task - The task object with its details (id, title, notes, etc.).
 * @returns {JSX.Element} - The JSX for rendering the task details form.
 */
const ProductDetails = ({ product }) => {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' }, // Estilos en línea para los campos de texto
            }}
            noValidate
            autoComplete="off"
        >
            {/* ID del Producto - Campo de solo lectura */}
            <div>
            <br /><br/>
                <Typography variant="h4" component="h2" align="center">
                    Product Detail
                </Typography>
                <br />
                <TextField
                    id="product-id"
                    label="Product ID"
                    defaultValue={product.id} // Muestra el ID del producto
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
                    defaultValue={product.category} // Muestra la categoría del producto
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

            {/* Grupo de Botones - Cancelar, Editar, Eliminar */}
            <div>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    {/* Botón Cancelar - Navega de regreso a la lista de productos */}
                    <Button href="/admin/homeProductsClient">Cancel</Button>

                    {/* Botón Editar - Para futura funcionalidad de editar detalles del producto */}
                    <Button href={`/admin/homeProductsClient/edit/${product.id}`}>Edit</Button>

                    {/* Botón Eliminar - Para futura funcionalidad de eliminar el producto */}
                    <Button href={`/admin/homeProductsClient/delete/${product.id}`}>Delete</Button>
                </ButtonGroup>
            </div>
        </Box>
    );
};

export default ProductDetails;
