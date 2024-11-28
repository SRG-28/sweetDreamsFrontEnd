'use client';

import ContactMailIcon from '@mui/icons-material/ContactMail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import LayoutUser from '../LayoutUser';
import styles from './logOutUser.module.css';
export default function LogoutPage() {
    const router = useRouter();
    //const { user } = useContext(AuthContext);

    const handleLogout = () => {
        router.push('/admin/homeProductsClient');
    };

    const handleCancel = () => {
        router.push('/request')
    };
    //const LayoutComponent = user?.role === 'admin' ? LayoutAdmin : LayoutUser;
    return (
        <LayoutUser>
        <Container maxWidth="false" className={styles.container}>
            <br/><br/>
            <Box className={styles.logoContainer}>
                <img src="/images/logo3.png" alt="Logo" className={styles.logo} />
            </Box>
            <br/>
            <Typography variant="h4" className={styles.title}>
                    Logout
                </Typography>
                <br/><br/>
            <Box className={styles.confirmationContainer}>
                <Typography variant="h5" className={styles.question}>
                    Are you sure you want to log out?
                </Typography>
                <br/>
                <Box className={styles.buttonGroup}>
                    <Button variant="contained" className={styles.confirmButton} onClick={handleLogout}>
                        Confirm
                    </Button>
                    <Button variant="outlined" className={styles.cancelButton} onClick={handleCancel}>
                        Cancel
                    </Button>
                </Box>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
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
        </LayoutUser>
    );
}
