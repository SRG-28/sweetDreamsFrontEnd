"use client";

import React, { useEffect, useState } from "react";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LayoutUser from "../../layoutUser.js";
import styles from "./homeProductsClient.css";
import axiosInstance from "@/components/utils/axiosInstance";
import PaymentIcon from "@mui/icons-material/Payment"; // Asegúrate de tener tu axiosInstance correctamente importado

const categories = [
    "All",
    "Cookies",
    "Cakes",
    "Pastries",
    "Slices",
    "Seasonal",
    "Bundles",
];

export default function HomeProductsClient() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]); // Estado para el carrito
    const router = useRouter(); // Para redirigir a la vista del carrito

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Usando axiosInstance para hacer la solicitud GET
                const response = await axiosInstance.get(
                    process.env.NEXT_PUBLIC_API_BACKEND_PRODUCTS_URL
                );

                // Si la solicitud es exitosa, establecemos los productos
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false); // Al terminar, cambiamos el estado de carga
            }
        };

        fetchProducts(); // Llamada a la función para obtener los productos
    }, []); // Esta función solo se ejecuta una vez cuando el componente se monta

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                (product) =>
                    product.category && product.category.name === selectedCategory
            );

    // Función para agregar productos al carrito
    const addToCart = (product) => {
        setCart((prevCart) => {
            const productInCart = prevCart.find((item) => item.id === product.idProduct);
            if (productInCart) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Redirigir a la vista del carrito con los datos
    const handleViewCart = () => {
        // Serializamos los datos del carrito y los pasamos en la query
        const cartWithIds = cart.map(({ id, name, price, quantity }) => ({
            id,
            name,
            price,
            quantity,
        }));

        const queryParams = new URLSearchParams({ cart: JSON.stringify(cartWithIds) });

        router.push(`/shoppingCart?${queryParams.toString()}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <LayoutUser>
            <Container
                className={styles.container}
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Header */}
                <Box className={styles.header}>
                    <br />
                    <br />
                    <Typography variant="h4" component="h2" align="center">
                        Welcome to Sweet Dreams
                    </Typography>
                    <br />
                </Box>

                {/* Filter Buttons */}
                <Box className={styles.filterButtons}>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={
                                selectedCategory === category ? "contained" : "outlined"
                            }
                            onClick={() => setSelectedCategory(category)}
                            className={styles.filterButton}
                        >
                            {category}
                        </Button>
                    ))}
                </Box>

                {/* Product Grid */}
                <Grid
                    container
                    spacing={3}
                    className={styles.productGrid}
                    sx={{ flexGrow: 1 }}
                >
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={`${product.id}-${index}`}
                            >
                                <br />
                                <Card className={styles.productItem}>
                                    <CardMedia
                                        component="img"
                                        alt={product.name}
                                        image={`/images/${product.image}`}
                                        className={styles.productImage}
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            className={styles.productName}
                                        >
                                            ID: {product.idProduct}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            className={styles.productName}
                                        >
                                            Nombre: {product.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Precio: ${product.price}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Descripción: {product.description}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Categoría:{" "}
                                            {product.category?.name || "Sin categoría"}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() => addToCart(product)}
                                            className={styles.addToCartButton}
                                        >
                                            Add to Cart
                                        </Button>
                                        <Link
                                            href={{
                                                pathname: "/userCartView",
                                                query: {
                                                    id: product.idProduct, // Solo el ID
                                                },
                                            }}
                                            passHref
                                        >
                                            <Button
                                                size="small"
                                                className={styles.viewDetailsButton}
                                            >
                                                View Details
                                            </Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography
                            variant="h6"
                            align="center"
                            sx={{ width: "100%", marginTop: "20px" }}
                        >
                            No hay productos disponibles en esta categoría.
                        </Typography>
                    )}
                </Grid>

                {/* Footer */}
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
