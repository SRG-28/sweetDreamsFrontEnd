"use client";

import { useEffect, useState } from 'react';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import LayoutUser from '../layoutUser.js';
//import styles from './homeProductsClient.css';

const categories = ["All", "Cookies", "Cakes", "Pastries", "Slices", "Seasonal", "Bundles"];

export default function HomeProductsClient() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_BACKEND_PRODUCTS_URL, { cache: "no-store" });
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Failed to fetch products from API');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(product => product.category === selectedCategory);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching data
    }

    return (
        <LayoutUser>
            <Container className={styles.container}>
                {/* Header */}
                <Box className={styles.header}>
                    <Typography variant="h5" className={styles.title}>
                        Welcome to Sweet Dreams
                    </Typography>
                </Box>

                {/* Filter Buttons */}
                <Box className={styles.filterButtons}>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "contained" : "outlined"}
                            onClick={() => setSelectedCategory(category)}
                            className={styles.filterButton}
                        >
                            {category}
                        </Button>
                    ))}
                </Box>

                {/* Product Grid */}
                <Grid container spacing={3} className={styles.productGrid}>
                    {filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card className={styles.productItem}>
                                <CardMedia
                                    component="img"
                                    alt={product.name}
                                    image={product.image}
                                    className={styles.productImage}
                                />
                                <CardContent>
                                    <Typography variant="h6" className={styles.productName}>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link href={`/homeProductsUser/${product.id}`} passHref>
                                        <Button size="small" className={styles.editButton}>
                                            View Details
                                        </Button>
                                    </Link>
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
                                <CreditCardIcon sx={{ marginRight: '4px' }} /> Payment methods
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
