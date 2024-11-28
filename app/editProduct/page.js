"use client"; 

import React from 'react';
import styles from './editProduct.module.css';
import { Container, Box, TextField, Checkbox, FormGroup, FormControlLabel, Button, Typography, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; 
import PaymentIcon from '@mui/icons-material/Payment'; 
import ContactMailIcon from '@mui/icons-material/ContactMail'; 

const categories = ["Cookies", "Cakes", "Pastries", "Slices", "Seasonal", "Bundles"];

export default function Page() {
    return (
        <Container maxWidth="false" className={styles.container}>
            <Box className={styles.formContainer}>
                <br/>
                <Typography variant="h4" className={styles.title}>
                    Edit a Product
                </Typography>
                <br/>
                <Typography variant="body1" className={styles.label}>Product Name</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Cake 2"
                    className={styles.textField}
                />
                <br/>
                <Typography variant="body1" className={styles.label}>Product Details</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Chocolate cake for 18 people"
                    className={styles.textField}
                />
                <br/>
                <Typography variant="body1" className={styles.label}>Price</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="$15"
                    className={styles.textField}
                />
                <br/>
                <Typography variant="h6" gutterBottom className={styles.label}>
                    Categories:
                </Typography>
                <FormGroup row>
                    {categories.map((category) => (
                        <FormControlLabel
                            control={<Checkbox name={category} />}
                            label={category}
                            key={category}
                        />
                    ))}
                </FormGroup>
                <br/>
                <Typography variant="body1" className={styles.label}>Photo</Typography>
                <img 
                            src="/images/cake1.png" 
                            alt="Icono personalizado" 
                            style={{ width: 200, height: 150, marginRight: '8px', transform: 'translateY(-2px)', marginTop: '1px' }} 
                        />
                <br/>
                <Button variant="outlined" component="label" className={styles.uploadButton}>
                    Upload Photo
                    <input type="file" hidden />
                </Button>
                <br/>
                <Button variant="contained" className={styles.addButton}>
                    Save changes
                </Button>
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
