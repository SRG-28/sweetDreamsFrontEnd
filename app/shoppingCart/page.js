"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container, Box, Typography, Button, Grid, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import clsx from "clsx";
import LayoutUser from "../layoutUser";

export default function ProductPage() {
    const [count, setCount] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const searchParams = useSearchParams();
    const productId = searchParams.get("idProduct");
    const router = useRouter();

    const filters = ["Cookies", "Cakes", "Pastries", "Slices", "Seasonal", "Bundles"];

    useEffect(() => {
        if (!productId) {
            setError("No product ID provided.");
            setLoading(false);
            return;
        }

        // Timeout de 2 segundos antes de realizar la solicitud
        const timeoutId = setTimeout(() => {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_BACKEND_PRODUCTS_URL}/${productId}`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setProduct(data);
                    } else {
                        setError("Error fetching product details.");
                    }
                } catch (error) {
                    setError("An error occurred while fetching the product.");
                    console.error("Error:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProduct();
        }, 2000); // 2 segundos de delay

        return () => clearTimeout(timeoutId); // Limpiar el timeout cuando se desmonte el componente
    }, [productId]);

    const handleIncrease = () => setCount(count + 1);

    const handleDecrease = () => count > 1 && setCount(count - 1);

    const handleFilterClick = (filter) =>
        setSelectedFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((item) => item !== filter)
                : [...prev, filter]
        );

    const handleAddToCartClick = () => router.push("/completeToBuy");

    if (loading) {
        return (
            <Typography variant="h6" style={{ textAlign: "center", marginTop: "2rem" }}>
                Loading product details...
            </Typography>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" color="error" style={{ textAlign: "center", marginTop: "2rem" }}>
                {error}
            </Typography>
        );
    }

    if (!product) {
        return (
            <Typography variant="h6" style={{ textAlign: "center", marginTop: "2rem" }}>
                Product not found.
            </Typography>
        );
    }

    return (
        <LayoutUser>
        <Container
            maxWidth="false"
            className={styles.container}
            style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
            <Grid container>
                <Grid item xs={10} className={styles.mainContent}>
                    <Box className={styles.products}>
                        {filters.map((filter) => (
                            <Button
                                key={filter}
                                className={clsx(styles.productButton, {
                                    [styles.activeButton]: selectedFilters.includes(filter),
                                })}
                                onClick={() => handleFilterClick(filter)}
                            >
                                {filter}
                            </Button>
                        ))}
                    </Box>
                    <Grid container>
                        <Grid item xs={6} className={styles.productImageContainer}>
                            <img
                                src={product.image || "/images/default-product.png"}
                                alt={product.name || "Product Image"}
                                className={styles.productImage}
                            />
                        </Grid>
                        <Grid item xs={6} className={styles.productDescription}>
                            <Typography variant="h4" className={styles.productName}>
                                {product.name || "Unnamed Product"}
                            </Typography>
                            <Typography variant="h6" className={styles.productPrice}>
                                ${product.price?.toFixed(2) || "N/A"}
                            </Typography>
                            <Typography variant="body1" className={styles.productDetails}>
                                {product.description || "No description available."}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box className={styles.productControls}>
                        <Typography variant="h6">Count</Typography>
                        <Box className={styles.counter}>
                            <IconButton onClick={handleDecrease}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography variant="h6" className={styles.countText}>
                                {count}
                            </Typography>
                            <IconButton onClick={handleIncrease}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Button
                            variant="contained"
                            className={styles.addToCartButton}
                            onClick={handleAddToCartClick}
                        >
                            Add to cart
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Box className={styles.footer} style={{ marginTop: "auto" }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={styles.footerTitle}>
                            <LocationOnIcon sx={{ marginRight: "4px" }} /> Location
                        </Typography>
                        <Typography variant="body1" className={styles.footerText}>Barva</Typography>
                        <Typography variant="body1" className={styles.footerText}>Tibás</Typography>
                        <Typography variant="body1" className={styles.footerText}>Moravia</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={styles.footerTitle}>
                            <PaymentIcon sx={{ marginRight: "4px" }} /> Payment methods
                        </Typography>
                        <Typography variant="body1" className={styles.footerText}>AMEX</Typography>
                        <Typography variant="body1" className={styles.footerText}>Visa</Typography>
                        <Typography variant="body1" className={styles.footerText}>Mastercard</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={styles.footerTitle}>
                            <ContactMailIcon sx={{ marginRight: "4px" }} /> Contact us
                        </Typography>
                        <Typography variant="body1" className={styles.footerText}>
                            sweetDreamsCR
                        </Typography>
                        <Typography variant="body1" className={styles.footerText}>
                            sweetDreams17
                        </Typography>
                        <Typography variant="body1" className={styles.footerText}>
                            sweetDreams_TikTok
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <img
                            src="/images/logo2.png"
                            alt="Logo"
                            style={{
                                width: 200,
                                height: 90,
                                marginRight: "8px",
                                transform: "translateY(-2px)",
                                marginTop: "1px",
                            }}
                        />
                        <Typography variant="body1" className={styles.footerText}>
                            © 2024 Sweet Dreams Bakery, Inc. All rights reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </LayoutUser>
    );
}
