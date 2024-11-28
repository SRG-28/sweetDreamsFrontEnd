import ContactMailIcon from '@mui/icons-material/ContactMail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Container, Grid, IconButton, TextField, Typography } from '@mui/material';
import styles from './order.module.css';
const orders = [
    { id: 1, userName: "User 1", image: "/images/cake1.png", total: "$15" },
    { id: 2, userName: "User 2", image: "/images/cake1.png", total: "$15" },
    { id: 3, userName: "User 3", image: "/images/cake1.png", total: "$15" },
    { id: 4, userName: "User 4", image: "/images/cake1.png", total: "$15" },
    { id: 5, userName: "User 5", image: "/images/cake1.png", total: "$15" },
    { id: 6, userName: "User 6", image: "/images/cake1.png", total: "$15" },
];

export default function Page() {
    return (
        <Container maxWidth="false" className={styles.container}>
            <br/>
            <Typography variant="h4" className={styles.title}>
                Orders
            </Typography>
            <br/>
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

            <Grid container spacing={4} className={styles.orderGrid}>
                {orders.map((order) => (
                    <Grid item xs={12} sm={8} md={6} lg={4} key={order.id}>
                        <div className={styles.orderItem}>
                            <img src={order.image} alt={order.userName} className={styles.orderImage} />
                            <Typography variant="body1" className={styles.deliveryDateTitle}>
                                Delivery date
                            </Typography>
                            <Typography variant="body1" className={styles.deliveryDate}>
                                12/09/2024 4pm
                            </Typography>
                            <Typography variant="body1" className={styles.productsTitle}>
                                List of products
                            </Typography>
                            <Typography variant="body1" className={styles.productList}>
                                1. Cake 4 <br />
                                2. Cake 8
                            </Typography>
                            <Typography variant="body1" className={styles.totalPriceTitle}>
                                Total
                            </Typography>
                            <Typography variant="body1" className={styles.totalPrice}>
                                {order.total}
                            </Typography>
                            <Typography variant="body1" className={styles.productsTitle}>
                                Client: <br />
                                Juan Torres Wilson <br />
                                8367-5640
                            </Typography>
                            <Button variant="contained" className={styles.deliveredButton}>
                                Delivered
                            </Button>
                        </div>
                    </Grid>
                ))}
            </Grid>
            <br/>
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






