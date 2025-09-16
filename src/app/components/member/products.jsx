"use client";

import { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Box,
  InputAdornment,
} from '@mui/material';

import {
  Add,
  Edit,
  Delete,
  Close,
  Search,
  Inventory2,
  Image,
} from '@mui/icons-material';

const initialProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 99.99,
    category: 'Electronics',
    stock: 50,
    sku: 'WH001',
    status: 'active',
  },
  {
    id: 2,
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt in various colors',
    price: 19.99,
    category: 'Clothing',
    stock: 100,
    sku: 'CT002',
    status: 'active',
  },
  {
    id: 3,
    name: 'JavaScript Guide',
    description: 'Complete guide to modern JavaScript programming',
    price: 29.99,
    category: 'Books',
    stock: 0,
    sku: 'BK003',
    status: 'active',
  },
  {
    id: 4,
    name: 'Garden Tools Set',
    description: 'Essential tools for gardening enthusiasts',
    price: 79.99,
    category: 'Home & Garden',
    stock: 25,
    sku: 'GT004',
    status: 'inactive',
  },
  {
    id: 5,
    name: 'Basketball',
    description: 'Official size basketball for indoor and outdoor play',
    price: 24.99,
    category: 'Sports',
    stock: 15,
    sku: 'BB005',
    status: 'active',
  },
];

const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Other'];
const statuses = ['active', 'inactive', 'discontinued'];

export default function ProductManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    sku: '',
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Product name is required';
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) < 0) errors.price = 'Price must be a valid positive number';
    if (!formData.category) errors.category = 'Category is required';
    if (formData.stock === '' || isNaN(formData.stock) || parseInt(formData.stock) < 0) errors.stock = 'Stock must be a valid non-negative number';
    if (!formData.sku.trim()) errors.sku = 'SKU is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setIsEditing(false);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      sku: '',
      status: 'active',
    });
    setFormErrors({});
  };

  const handleEditProduct = (product) => {
    setIsDialogOpen(true);
    setIsEditing(true);
    setEditingId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      sku: product.sku,
      status: product.status,
    });
    setFormErrors({});
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      sku: '',
      status: 'active',
    });
    setFormErrors({});
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };

    if (isEditing) {
      setProducts(products.map((product) =>
        product.id === editingId ? { ...product, ...productData } : product
      ));
    } else {
      const newProduct = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        ...productData,
      };
      setProducts([...products, newProduct]);
      
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const getStatusChipColor = (status, stock) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'warning' };
    if (status === 'active') return { label: 'Active', color: 'success' };
    return { label: 'Inactive', color: 'error' };
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === 'active').length;
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
                ${totalValue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4">Products</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenDialog}
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
        <Grid container spacing={3}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card elevation={2}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: 150,
                        backgroundColor: 'grey.200',
                        borderRadius: 1,
                        mb: 2,
                      }}
                    >
                      <Image sx={{ fontSize: 48, color: 'grey.400' }} />
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {product.description || 'No description available'}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="h5" color="primary">
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Chip
                        label={getStatusChipColor(product.status, product.stock).label}
                        color={getStatusChipColor(product.status, product.stock).color}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Category:</strong> {product.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>SKU:</strong> {product.sku}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Stock:</strong> {product.stock} units
                    </Typography>
                  </CardContent>
                  <Box display="flex" justifyContent="flex-end" px={2} pb={2}>
                    <IconButton onClick={() => handleEditProduct(product)} color="primary" size="small">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(product.id)} color="error" size="small">
                      <Delete />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" variant="body1" color="text.secondary" mt={4}>
                {searchTerm ? 'No products found matching your search.' : 'No products found.'}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Dialog (Add/Edit Form) */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
            </Grid>
            {/* Price */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                error={!!formErrors.price}
                helperText={formErrors.price}
              />
            </Grid>
            {/* Category */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" error={!!formErrors.category}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.category && (
                  <Typography variant="caption" color="error" sx={{ ml: 1, mt: 0.5 }}>
                    {formErrors.category}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            {/* Stock */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock Quantity"
                variant="outlined"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                error={!!formErrors.stock}
                helperText={formErrors.stock}
              />
            </Grid>
            {/* SKU */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="SKU"
                variant="outlined"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                error={!!formErrors.sku}
                helperText={formErrors.sku}
              />
            </Grid>
            {/* Status */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  label="Status"
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<Inventory2 />}
          >
            {isEditing ? 'Save Changes' : 'Add Product'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}