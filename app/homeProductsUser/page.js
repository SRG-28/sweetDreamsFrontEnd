"use client";

import { useEffect, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, Container, Typography, TextField, Modal, Box as MuiBox } from "@mui/material";
import LayoutUser from "../layoutUser.js";
import styles from "./homeProductsClient.css";
import Grid from "@mui/material/Grid";

const categories = ["All", "Cookies", "Cakes", "Pastries", "Slices", "Seasonal", "Bundles"];

export default function HomeProductsClient() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzZWN1cmUtYXBpIiwiYXVkIjoic2VjdXJlLWFwcCIsInN1YiI6InNvZmlhLnJ1YmllQGdtYWlsLmNvbSIsImV4cCI6MTczMjg2NTc1OX0.BPa4qGcEDoBJptUpAbVlJFVK7wX_haZ299aJzkTDZLfMfLHZSmzjBhVg00tpzaPaOkyK2mOL11BW-n9z5GW__w";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://sweet-dreams-app-v01-526d0a7b9b94.herokuapp.com/v1/product",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products from API");
          setError("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category.name === selectedCategory);

  const deleteProduct = async (idProduct) => {
    try {
      const response = await fetch(
        `https://sweet-dreams-app-v01-526d0a7b9b94.herokuapp.com/v1/product/${idProduct}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setProducts(products.filter((product) => product.idProduct !== idProduct));
      } else {
        console.error(`Failed to delete product with id ${idProduct}`);
      }
    } catch (error) {
      console.error(`Error deleting product with id ${idProduct}:`, error);
    }
  };

  const handleOpenEditModal = (product) => {
    setEditProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditProduct(null);
  };

  const handleSaveProduct = async () => {
    try {
      const response = await fetch(
        `https://sweet-dreams-app-v01-526d0a7b9b94.herokuapp.com/v1/product`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editProduct),
        }
      );
      if (response.ok) {
        setProducts(products.map((product) =>
          product.idProduct === editProduct.idProduct ? editProduct : product
        ));
        handleCloseModal();
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <LayoutUser>
      <Container className={styles.container}>
        <Box className={styles.header}>
          <br />
          <br />
          <Typography variant="h4" component="h2" align="center">
            Welcome to Sweet Dreams Administrator
          </Typography>
          <br />
        </Box>

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

        <Grid container spacing={3} className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.idProduct}>
              <br />
              <Card className={styles.productItem}>
                <CardContent>
                  <Typography variant="h6" className={styles.productName}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    In stock: {product.count}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {product.category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Image: {product.image}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleOpenEditModal(product)} className={styles.editButton}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => deleteProduct(product.idProduct)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Modal for editing product */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <MuiBox
            className={styles.modalBox}
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '20px',
              width: '80%',
              maxWidth: '500px',
            }}
          >
            <Typography variant="h6">Edit Product</Typography>
            <TextField
              label="Name"
              value={editProduct?.name || ""}
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Description"
              value={editProduct?.description || ""}
              onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              fullWidth
            />
            <TextField
              label="Price"
              value={editProduct?.price || ""}
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
              fullWidth
            />
            <TextField
              label="Stock"
              value={editProduct?.count || ""}
              onChange={(e) => setEditProduct({ ...editProduct, count: e.target.value })}
              fullWidth
            />
            <Button onClick={handleSaveProduct}>Save</Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </MuiBox>
        </Modal>
      </Container>
    </LayoutUser>
  );
}
