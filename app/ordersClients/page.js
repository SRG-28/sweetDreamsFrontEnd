"use client";
import LayoutUser from "../layoutUser.js";
import { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@mui/material';
import styles from './ordersClients.module.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import axios from 'axios';

export default function OrdersClients() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzZWN1cmUtYXBpIiwiYXVkIjoic2VjdXJlLWFwcCIsInN1YiI6InNvZmlhLnJ1YmllQGdtYWlsLmNvbSIsImV4cCI6MTczMjg2NTc1OX0.BPa4qGcEDoBJptUpAbVlJFVK7wX_haZ299aJzkTDZLfMfLHZSmzjBhVg00tpzaPaOkyK2mOL11BW-n9z5GW__w"; 

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://sweet-dreams-app-v01-526d0a7b9b94.herokuapp.com/v1/order', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <LayoutUser>
        <Container className={styles.container}>
            {/* Header */}
            <Box className={styles.header}>
                <Typography variant="h4" component="h2" align="center">
                    <strong>Administrator</strong>
                    <strong> List of Orders</strong>
                </Typography>
            </Box>

            {/* Orders Grid */}
            <Grid container spacing={3} className={styles.orderGrid}>
                {orders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} key={order.idOrder}>
                        <Card className={styles.orderItem}>
                            <CardContent>
                                <Typography variant="h6" className={styles.orderId}>
                                    Order ID: {order.idOrder}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Product Name: {order.product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Product Description: {order.product.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${order.product.price.toFixed(2)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    User: {order.user.firstName} {order.user.lastName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Reservation Date: {new Date(order.reservationDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Delivery Status: {order.deliveryStatus ? "Delivered" : "Pending"}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    className={styles.viewButton}
                                    disabled={order.deliveryStatus} 
                                >
                                    {order.deliveryStatus ? "Delivered" : "Pending"}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Footer */}
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
                        <Typography variant="body1" className={styles.footerText}>Visa</Typography>
                        <Typography variant="body1" className={styles.footerText}>Mastercard</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={styles.footerTitle}>
                            <ContactMailIcon sx={{ marginRight: '4px' }} /> Contact us
                        </Typography>
                        <Typography variant="body1" className={styles.footerText}>sweetDreamsCR</Typography>
                        <Typography variant="body1" className={styles.footerText}>sweetDreams17</Typography>
                        <Typography variant="body1" className={styles.footerText}>sweetDreams_TikTok</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <img 
                            src="/images/logo2.png" 
                            alt="Sweet Dreams Logo" 
                            style={{ width: 200, height: 90, marginRight: '8px', transform: 'translateY(-2px)', marginTop: '1px' }} 
                        />
                        <Typography variant="body1" className={styles.footerText}>
                            © 2024 Sweet Dreams Bakery, Inc. all rights reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </LayoutUser>
    );
}
