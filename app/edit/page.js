"use client"; 

import React from 'react';
import styles from './edit.module.css';
import { Container, Box, Typography, TextField, Button, Grid, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useRouter } from 'next/navigation';

const categories = ["Cookies", "Cakes", "Pastries", "Slices", "Seasonal", "Bundles"];
const products = [
    { id: 1, name: "Cake 1", image: "/images/cake1.png" },
    { id: 2, name: "Cake 2", image: "/images/cake1.png" },
    { id: 3, name: "Cake 3", image: "/images/cake1.png" },
    { id: 4, name: "Cake 4", image: "/images/cake1.png" },
    { id: 5, name: "Cake 5", image: "/images/cake1.png" },
    { id: 6, name: "Cake 6", image: "/images/cake1.png" },
    { id: 7, name: "Cake 7", image: "/images/cake1.png" },
    { id: 8, name: "Cake 8", image: "/images/cake1.png" },
    { id: 9, name: "Cake 9", image: "/images/cake1.png" },
];

export default function Page() {
    const router = useRouter();

    const handleEditClick = (productId) => {
        router.push(`/editProduct?page=${productId}`);
    };

    return (
        <Container maxWidth="false" className={styles.container}>
            <br/>
            <Box className={styles.header}>
                <Typography variant="h4" className={styles.title}>
                    Edit a Product
                </Typography>
                <Box className={styles.searchBar}>
                    <TextField
                        variant="outlined"
                        placeholder="Search..."
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                        fullWidth
                    />
                </Box>
            </Box>

            <Box className={styles.filterButtons}>
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant="contained"
                        className={styles.filterButton}
                        sx={{ mr: 2 }} 
                    >
                        {category}
                    </Button>
                ))}
            </Box>
            <br/>

            <Grid container spacing={2} className={styles.productGrid}>
                {products.map((product) => (
                    <Grid item xs={4} key={product.id} className={styles.productItem}>
                        <Box className={styles.productContent}>
                            <img src={product.image} alt={product.name} className={styles.productImage} />
                            <Typography variant="body1" className={styles.productName}>
                                {product.name}
                            </Typography>
                            <Button
                                variant="contained"
                                className={styles.editButton}
                                onClick={() => handleEditClick(product.id)}
                            >
                                Edit
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>

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
                            alt="Icono personalizado" 
                            style={{ width: 200, height: 90, marginRight: '8px', transform: 'translateY(-2px)', marginTop: '1px' }} 
                        />
                        <Typography variant="body1" className={styles.footerText}>© 2024 Sweet Dreams Bakery, Inc. all rights reserved.</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

