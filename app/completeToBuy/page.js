"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./completeToBuy.module.css";
import LayoutUser from "../layoutUser";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Grid,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import ContactMailIcon from "@mui/icons-material/ContactMail";

export default function Page() {
    const router = useRouter();
    const [cart, setCart] = useState([]);
    const [userDetails, setUserDetails] = useState({
        fullName: "",
        userName: "",
        phone: "",
        email: "",
        deliveryDate: "",
    });

    useEffect(() => {
        // Cargar los productos del carrito desde localStorage
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value,
        });
    };

    // Función para limpiar el carrito
    const clearCart = () => {
        localStorage.removeItem("cart"); // Elimina el carrito del localStorage
        setCart([]); // Actualiza el estado para reflejar que el carrito está vacío
    };

    const handleCompleteClick = async () => {
        const testData = {
            product: {
                idProduct: 2,
                category: {
                    idCategory: 2,
                    name: "Vanilla Cake",
                    description: "Classic vanilla sponge cake",
                },
                name: "Vanilla Buttercream Cake",
                description:
                    "Moist vanilla cake with rich buttercream frosting",
                price: 24.99,
                count: 20,
                image: "vanilla_buttercream_cake.png",
                createdAt: "2024-11-04T12:00:00",
                updatedAt: "2024-11-04T15:30:00",
            },
            user: {
                id: 2,
                firstName: "Rafael",
                lastName: "Cerdas",
                email: "rafael.cerdas@gmail.com",
                phoneNumber: "88889999",
                password: "12345",
                createDate: "2024-10-01T06:00:00.000+00:00",
                enabled: true,
                tokenExpired: false,
                roles: null,
            },
            status: {
                idStatus: 1,
                name: "Not delivered",
                description: "Not delivered...",
            },
            reservationDate: "2024-10-01T06:00:00.000+00:00",
            deliveryDate: "2024-10-03T06:00:00.000+00:00",
            deliveryStatus: false,
        };

        const token =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzZWN1cmUtYXBpIiwiYXVkIjoic2VjdXJlLWFwcCIsInN1YiI6InNvZmlhLnJ1YmllQGdtYWlsLmNvbSIsImV4cCI6MTczMjg1MTY1NH0._svVYXjh0vuz-RVir_EBzKDrBfu-t07PWZTobYsiLEpufqXYKGLEGxIvTghSxSWHcQlV8pvaUY3Wzqcp03IEHA";

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_BACKEND_ORDERS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(testData),
            });

            if (response.ok) {
                // Limpiar carrito al completar la compra
                clearCart();
                router.push("/purchaseCompleted");
            } else {
                console.error("Error al completar la orden");
            }
        } catch (error) {
            console.error("Error al enviar la orden:", error);
        }
    };

    return (
<LayoutUser>
        <Container maxWidth="false" className={styles.container}>
            <Box className={styles.logoContainer}>
                <img
                    src="/images/logo3.png"
                    alt="Logo"
                    className={styles.logo}
                />
            </Box>
            <Typography variant="h4" className={styles.title}>
                <strong>Complete to buy</strong>
            </Typography>
            <Box className={styles.formContainer}>
                <Box className={styles.formContent}>
                    <Box className={styles.formFields}>
                        <Typography variant="body1" className={styles.label}>
                            Full Name
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder="Enter full name"
                            className={styles.textField}
                            autoComplete="off"
                            name="fullName"
                            value={userDetails.fullName}
                            onChange={handleInputChange}
                        />
                        <br />
                        <Typography variant="body1" className={styles.label}>
                            User Name
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder="Enter user name"
                            className={styles.textField}
                            autoComplete="off"
                            name="userName"
                            value={userDetails.userName}
                            onChange={handleInputChange}
                        />
                        <br />
                        <Typography variant="body1" className={styles.label}>
                            Phone
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder="Enter phone number"
                            className={styles.textField}
                            autoComplete="off"
                            name="phone"
                            value={userDetails.phone}
                            onChange={handleInputChange}
                        />
                        <br />
                        <Typography variant="body1" className={styles.label}>
                            Email
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder="Enter email address"
                            className={styles.textField}
                            autoComplete="off"
                            name="email"
                            value={userDetails.email}
                            onChange={handleInputChange}
                        />
                        <br />
                        <Typography variant="body1" className={styles.label}>
                            Date to be delivered
                        </Typography>
                        <TextField
                            type="date"
                            variant="outlined"
                            fullWidth
                            className={styles.textField}
                            autoComplete="off"
                            name="deliveryDate"
                            value={userDetails.deliveryDate}
                            onChange={handleInputChange}
                        />
                        <br />
                    </Box>
                    <Box className={styles.productInfo}>
                        {cart.map((item, index) => (
                            <Box key={index} className={styles.productItem}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className={styles.productImage}
                                />
                                <Typography
                                    variant="body1"
                                    className={styles.productDetails}
                                >
                                    {item.name} x {item.quantity}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={styles.productDetails}
                                >
                                    Price: ${item.price}
                                </Typography>
                            </Box>
                        ))}
                        <Box className={styles.buttonGroup}>
                            <Button
                                variant="contained"
                                className={styles.blueButton}
                                onClick={() => {
                                    clearCart();
                                    router.push("/admin/homeProductsClient");
                                }}
                            >
                                Add more products
                            </Button>
                            <Button
                                variant="contained"
                                className={styles.redButton}
                                onClick={() => {
                                    clearCart();
                                    router.push("/admin/homeProductsClient");
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                className={styles.blueButton}
                                onClick={handleCompleteClick}
                            >
                                Complete
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className={styles.footer}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={styles.footerTitle}>
                            <LocationOnIcon sx={{ marginRight: '4px' }} /> Location
                        </Typography>
                        <Typography variant="body1" className={styles.footerText}>Barva</Typography>
                        <Typography variant="body1" className={styles.footerText}>Tibás</Typography>
                        <Typography variant="body1" className={styles.footerText}>Moravia</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={styles.footerTitle}>
                            <PaymentIcon sx={{ marginRight: '4px' }} /> Payment methods
                        </Typography>
                        <Typography variant="body1" className={styles.footerText}>AMEX</Typography>
                        <Typography variant="body1" className={styles.footerText}>Mastercard</Typography>
                        <Typography variant="body1" className={styles.footerText}>Visa</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={styles.footerTitle}>
                            <ContactMailIcon sx={{ marginRight: '4px' }} /> Contact
                        </Typography>
                        <Typography variant="body1" className={styles.footerText}>800-123-4567</Typography>
                        <Typography variant="body1" className={styles.footerText}>info@sweetdreams.com</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
</LayoutUser>
    );
}
