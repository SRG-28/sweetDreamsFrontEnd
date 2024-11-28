"use client";
import React, { useState, useEffect } from 'react';
import LayoutUser from "./layoutUser.js";
import styles from './add.module.css';
import { Container, Box, Typography, Grid, Fab, Tooltip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ChatIcon from '@mui/icons-material/Chat';

const images = [
    'cake1.png',
    'cookie.png',
    'pie.png',
];

export default function Page() {
    const [hovered, setHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;  // Return null while the component is not yet mounted
    }

    return (
        <LayoutUser>
            <Container maxWidth="false" className={styles.container}>
                <Box className={styles.bodyContainer}>
                    <Typography variant="h3" className={styles.title}>
                        <strong>Welcome to Sweet Dreams CR</strong>
                    </Typography>

                    <Typography variant="body1" className={styles.description}>
                        <strong><br />History <br /></strong> Sweet Dreams Bakery was founded in 1990 by the Gómez family. It began
                        as a small home-based operation that quickly became known for its delicious cakes and cookies.
                        Over the years, the bakery expanded and now has multiple locations across the city. Our mission
                        is to bring happiness to our customers with every bite, using only the freshest ingredients.
                    </Typography>

                    <Typography variant="body1" className={styles.description}>
                        <strong><br />Mission<br /></strong> To provide the community with delicious, high-quality baked goods while
                        maintaining our family values. <br />
                        <strong><br />Vision<br /></strong> To become the leading bakery in the region, known for our excellent
                        service and commitment to customer satisfaction.
                    </Typography>
                    <br />

                    <Typography variant="h5" className={styles.sectionTitle}>
                        <strong>Our Products</strong>
                    </Typography>
                    <Grid container spacing={2}>
                        {images.map((image, index) => (
                            <Grid item xs={4} key={index}>
                                <img
                                    src={`/images/${image}`}
                                    alt={`Product ${index + 1}`}
                                    className={styles.productImage}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <br />
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

                {/* Floating Button for Telegram */}
                <Tooltip title="Chatea con nosotros" arrow>
                    <Fab
                        color="primary"
                        aria-label="Chat"
                        className={`${styles.floatingButton} ${hovered ? styles.floatingButtonHover : ''}`}
                        onClick={() => window.open('https://web.telegram.org/a/#8178748445', '_blank')}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <ChatIcon />
                    </Fab>
                </Tooltip>
            </Container>
        </LayoutUser>
    );
}
