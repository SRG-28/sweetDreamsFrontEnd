"use client";
import LayoutUser from "../layoutUser.js";
import React, { useEffect, useState } from 'react';
import styles from './purchaseCompleted.module.css';
import { Container, Box, Button, Typography, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useRouter } from 'next/navigation'; // Importa useRouter para manejar la navegación
import axios from 'axios';

export default function Page() {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // Inicializa el router
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzZWN1cmUtYXBpIiwiYXVkIjoic2VjdXJlLWFwcCIsInN1YiI6InNvZmlhLnJ1YmllQGdtYWlsLmNvbSIsImV4cCI6MTczMjg2NTc1OX0.BPa4qGcEDoBJptUpAbVlJFVK7wX_haZ299aJzkTDZLfMfLHZSmzjBhVg00tpzaPaOkyK2mOL11BW-n9z5GW__w"; // Reemplaza con tu token real

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_API_BACKEND_ORDERS_URL_GET, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrder(response.data);
            } catch (error) {
                console.error("Error al obtener la orden:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [token]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (!order) {
        return <Typography>No se encontró la orden.</Typography>;
    }

    return (
<LayoutUser>
        <Container maxWidth="false" className={styles.container}>
            <Box className={styles.logoContainer}>
                <img src="/images/logo3.png" alt="Logo" className={styles.logo} />
            </Box>
            <Typography variant="h4" className={styles.title}>
                Complete your purchase
            </Typography>
            <Box className={styles.content}>
                <Box className={styles.productInfo}>
                    <img src={order.product.image || "/images/default_product.png"} alt="Product" className={styles.productImage} />
                    <Typography variant="h6" className={styles.productDetails}>
                        Product Name: {order.product.name || "Unknown Product"}
                    </Typography>
                    <Typography variant="h6" className={styles.productDetails}>
                        Price: ${order.product.price || "0.00"}
                    </Typography>
                    <Typography variant="h4" className={styles.completedMessage}>
                        Purchase Completed!
                    </Typography>
                </Box>
                <Box className={styles.completeButtonContainer}>
                    <Button
                        variant="contained"
                        className={styles.completeButton}
                        onClick={() => router.push('/admin/homeProductsClient')} // Navega a homeProductsClient al hacer clic
                    >
                        Complete
                    </Button>
                </Box>
            </Box>
            <Box className={styles.footer}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={styles.footerTitle}>
                            <LocationOnIcon sx={{ marginRight: '4px' }} /> Location
                        </Typography>
                        <Typography variant="body1" className={styles.footerText}>{order.user.address || "Unknown"}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={styles.footerTitle}>
                            <PaymentIcon sx={{ marginRight: '4px' }} /> Payment methods
                        </Typography>
                        <Typography variant="body1" className={styles.footerText}>{order.paymentMethod || "Unknown"}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={styles.footerTitle}>
                            <ContactMailIcon sx={{ marginRight: '4px' }} /> Contact us
                        </Typography>
                        <Typography variant="body1" className={styles.footerText}>{order.user.email || "Unknown"}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <img
                            src="/images/logo2.png"
                            alt="Icono personalizado"
                            style={{ width: 200, height: 90, marginRight: '8px', transform: 'translateY(-2px)', marginTop: '1px' }}
                        />
                        <Typography variant="body1" className={styles.footerText}>© 2024 Sweet Dreams Bakery, Inc. all rights reserved.</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
</LayoutUser>
    );
}
