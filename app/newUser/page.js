import React from 'react';
import styles from './newUser.module.css';
import { Container, Box, TextField, Button, Typography, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; 
import PaymentIcon from '@mui/icons-material/Payment'; 
import ContactMailIcon from '@mui/icons-material/ContactMail'; 

export default function Page() {
    return (
        <Container maxWidth="false" className={styles.container}>
            <Box className={styles.logoContainer}>
                <img src="/images/logo3.png" alt="Logo" className={styles.logo} />
            </Box>
            <Typography variant="h4" className={styles.title}>
                Create a new administrator
            </Typography>
            <Box className={styles.formContainer}>
                <Typography variant="body1" className={styles.label}>Full Name</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Enter full name"
                    className={styles.textField}
                    autoComplete="off"
                /><br/>
                <Typography variant="body1" className={styles.label}>User Name</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Enter user name"
                    className={styles.textField}
                    autoComplete="off"
                /><br/>
                <Typography variant="body1" className={styles.label}>Phone</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Enter phone number"
                    className={styles.textField}
                    autoComplete="off"
                /><br/>
                <Typography variant="body1" className={styles.label}>Email</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Enter email address"
                    className={styles.textField}
                    autoComplete="off"
                /><br/>
                <Typography variant="body1" className={styles.label}>Password</Typography>
                <TextField
                    type="password"
                    variant="outlined"
                    fullWidth
                    placeholder="Enter password"
                    className={styles.textField}
                    autoComplete="off"
                /><br/>
                <Typography variant="body1" className={styles.label}>Confirm Password</Typography>
                <TextField
                    type="password"
                    variant="outlined"
                    fullWidth
                    placeholder="Confirm password"
                    className={styles.textField}
                    autoComplete="off"
                /><br/>
                <Button variant="contained" className={styles.addButton}>
                    Add a new administrator
                </Button><br/>
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
