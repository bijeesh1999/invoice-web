"use client";
import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Drawer,
  IconButton,
  Chip,
  Box,
  InputAdornment,
  Divider,
} from "@mui/material";

import {
  Add,
  Edit,
  Delete,
  Close,
  Search,
  Inventory2,
  Image,
} from "@mui/icons-material";

import { useFormik } from "formik";
import * as yup from "yup";
import ProductTable from "./components/list";
import ProductForm from "./components/form";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../services/product.service";
import {
  createProductData,
  findAllProductDetails,
} from "@/redux/slices/product.slice";

const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 99.99,
    category: "Electronics",
    stock: 50,
    sku: "WH001",
    status: "active",
  },
  {
    id: 2,
    name: "Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt in various colors",
    price: 19.99,
    category: "Clothing",
    stock: 100,
    sku: "CT002",
    status: "active",
  },
  {
    id: 3,
    name: "JavaScript Guide",
    description: "Complete guide to modern JavaScript programming",
    price: 29.99,
    category: "Books",
    stock: 0,
    sku: "BK003",
    status: "inactive", // Changed status to 'inactive' to demonstrate chip color
  },
  {
    id: 4,
    name: "Garden Tools Set",
    description: "Essential tools for gardening enthusiasts",
    price: 79.99,
    category: "Home & Garden",
    stock: 25,
    sku: "GT004",
    status: "inactive",
  },
  {
    id: 5,
    name: "Basketball",
    description: "Official size basketball for indoor and outdoor play",
    price: 24.99,
    category: "Sports",
    stock: 15,
    sku: "BB005",
    status: "active",
  },
];

// Validation schema using Yup
const validationSchema = yup.object({
  name: yup.string().trim().required("Product name is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  description: yup.string(),
});

export default function Products() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      status: "active",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const productData = {
        ...values,
        price: parseFloat(values.price),
      };

      if (isEditing) {
      } else {
        dispatch(createProductData(productData));
      }
      handleCloseDrawer();
      resetForm();
    },
  });

  React.useEffect(() => {
    if (status === "created" || status === "deleted") {
      dispatch(findAllProductDetails());
      handleCloseDrawer();
    }
  }, [status]);

  const handleOpenAddDrawer = () => {
    setIsDrawerOpen(true);
    setIsEditing(false);
    setEditingId(null);
    formik.resetForm();
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setIsEditing(false);
    setEditingId(null);
    formik.resetForm();
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = products.length || 0;
  const activeProducts = products.filter((p) => p.status === "active").length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Stats Cards */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Total Products
              </Typography>
              <Typography variant="h4" color="primary">
                {totalProducts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" color="success.main" gutterBottom>
                Active Products
              </Typography>
              <Typography variant="h4" color="success.main">
                {activeProducts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" color="warning.main" gutterBottom>
                Out of Stock
              </Typography>
              <Typography variant="h4" color="warning.main">
                {outOfStock}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" color="secondary" gutterBottom>
                Total Value
              </Typography>
              <Typography variant="h4" color="secondary">
                ${Number(totalValue).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* --- */}

      {/* Main Content */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4">Products</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenAddDrawer}
          >
            Add Product
          </Button>
        </Box>

        {/* Search Field */}
        <Box mb={4}>
          <TextField
            fullWidth
            label="Search Products"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Products Grid */}
        <ProductTable products={filteredProducts} searchTerm={searchTerm} />
      </Paper>

      {/* Drawer (Add/Edit Form) */}

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 500 },
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="h6">
            {isEditing ? "Edit Product" : "Add New Product"}
          </Typography>
          <IconButton onClick={handleCloseDrawer}>
            <Close />
          </IconButton>
        </Box>
        <ProductForm
          formik={formik}
          handleCloseDrawer={handleCloseDrawer}
          handleOpenDrawer={handleOpenAddDrawer}
          isDrawerOpen={isDrawerOpen}
          isEditing={isEditing}
        />
      </Drawer>
    </Container>
  );
}
