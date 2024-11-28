"use client"; // Ensure this is a client-side component

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Alert, AlertTitle, Button, ButtonGroup, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import style from "./deleteProduct.module.css";

/**
 * DeleteProduct Component
 *
 * This component renders a form displaying product details along with an option to delete the product.
 * It includes a confirmation dialog to prevent accidental deletions.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.product - The product object containing details like id, name, price, etc.
 *
 * @returns {JSX.Element} The rendered component
 */
const DeleteProduct = ({ product }) => {
    // State for controlling the dialog open/close state
    const [open, setOpen] = useState(false);
    // State for controlling the loading indicator during the delete process
    const [loading, setLoading] = useState(false);

    // Router instance for navigation
    const router = useRouter();

    /**
     * deleteHandlerFunction
     *
     * This function sends a DELETE request to the backend API to delete the product.
     * It then closes the confirmation dialog, navigates back to the product list, and refreshes the page.
     */
    const deleteHandlerFunction = async () => {
        try {
            setLoading(true); // Start loading state
            // Sending DELETE request to the backend API
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND_PRODUCTS_URL}/${product.id}`);
            setOpen(false);  // Close the dialog on success
            router.push("/admin/homeProductsClient");  // Navigate back to the product list
            router.refresh();  // Refresh the page to reflect changes
        } catch (error) {
            // Handle error case (can be improved with better error handling and UI feedback)
            console.log(error);
        } finally {
            setLoading(false);  // Stop loading state
        }
    };

    /**
     * handleClickOpen
     *
     * Opens the confirmation dialog when the delete button is clicked.
     */
    const handleClickOpen = () => {
        setOpen(true);
    };

    /**
     * handleClose
     *
     * Closes the confirmation dialog without deleting the product.
     */
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* Confirmation Dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete the product?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please confirm if you want to delete the product.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={deleteHandlerFunction} autoFocus disabled={loading}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Alert indicating the deletion action */}
            <Alert severity="error" className={style.alert}>
                <AlertTitle>Delete</AlertTitle>
                You are about to delete this product!
            </Alert>

            {/* Product details form, read-only */}
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="product-id"
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
                        id="product-name"
                        label="Name"
                        defaultValue={product.name}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="product-price"
                        label="Price"
                        defaultValue={product.price}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="product-category"
                        label="Category"
                        defaultValue={product.category}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="product-description"
                        label="Description"
                        defaultValue={product.description}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>

                {/* Buttons to cancel or trigger the delete confirmation */}
                <div className={style.buttonsArea}>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button href={'/admin/homeProductsClient'}>Cancel</Button>
                        <Button onClick={handleClickOpen} disabled={loading}>
                            Delete
                        </Button>
                    </ButtonGroup>
                </div>
            </Box>
        </>
    );
};

export default DeleteProduct;
