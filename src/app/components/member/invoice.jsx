"use client";

import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton,
  MenuItem,
  Stack,
} from '@mui/material';
import { Add, Delete, Print } from '@mui/icons-material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './pdf';
// Mock product data
const products = [
  { id: 1, name: 'Wireless Mouse', price: 25.00 },
  { id: 2, name: 'Mechanical Keyboard', price: 75.50 },
  { id: 3, name: 'USB-C Hub', price: 40.00 },
  { id: 4, name: '27-inch Monitor', price: 250.00 },
  { id: 5, name: 'Webcam 1080p', price: 60.00 },
];

export default function InvoiceComponent() {
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: 'INV-001',
    date: new Date().toISOString().substring(0, 10),
    customerName: '',
  });

  const [items, setItems] = useState([
    { id: 1, productId: '', quantity: 1, price: 0, amount: 0 },
  ]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    const item = newItems[index];

    if (field === 'productId') {
      const selectedProduct = products.find(p => p.id === value);
      if (selectedProduct) {
        item.productId = value;
        item.price = selectedProduct.price;
        item.amount = selectedProduct.price * item.quantity;
      }
    } else if (field === 'quantity') {
      const newQuantity = parseInt(value, 10) || 1;
      item.quantity = newQuantity;
      item.amount = item.price * newQuantity;
    }

    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: items.length + 1, productId: '', quantity: 1, price: 0, amount: 0 },
    ]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const invoiceData = {
    ...invoiceDetails,
    items: items.map(item => ({
      ...item,
      productName: products.find(p => p.id === item.productId)?.name || '',
    })),
    subtotal,
    tax,
    total,
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Invoice
        </Typography>

        {/* Invoice Header Details */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Invoice Number"
              variant="outlined"
              value={invoiceDetails.invoiceNumber}
              onChange={(e) => setInvoiceDetails({ ...invoiceDetails, invoiceNumber: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              variant="outlined"
              value={invoiceDetails.date}
              onChange={(e) => setInvoiceDetails({ ...invoiceDetails, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Customer Name"
              variant="outlined"
              value={invoiceDetails.customerName}
              onChange={(e) => setInvoiceDetails({ ...invoiceDetails, customerName: e.target.value })}
            />
          </Grid>
        </Grid>

        {/* Invoice Items Table */}
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'grey.200' }}>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ width: '40%' }}>
                    <TextField
                      select
                      fullWidth
                      value={item.productId}
                      onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                    >
                      {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell sx={{ width: '20%' }}>
                    <TextField
                      fullWidth
                      type="number"
                      value={item.price.toFixed(2)}
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell sx={{ width: '15%' }}>
                    <TextField
                      fullWidth
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                  </TableCell>
                  <TableCell sx={{ width: '15%' }} align="right">
                    <Typography>
                      ${item.amount.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: '10%' }} align="center">
                    <IconButton color="error" onClick={() => handleRemoveItem(index)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="center" my={2}>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddItem}
          >
            Add Item
          </Button>
        </Box>

        {/* Totals */}
        <Grid container justifyContent="flex-end" mt={4}>
          <Grid item xs={12} sm={5}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Stack spacing={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">Subtotal:</Typography>
                  <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">Tax (8%):</Typography>
                  <Typography variant="body1">${tax.toFixed(2)}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" sx={{ borderTop: '1px solid #ddd', pt: 1 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">${total.toFixed(2)}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <PDFDownloadLink
            document={<InvoicePDF data={invoiceData} />}
            fileName={`invoice-${invoiceDetails.invoiceNumber}.pdf`}
          >
            {({ loading }) => (
              <Button
                variant="contained"
                startIcon={<Print />}
                disabled={loading || items.length === 0}
              >
                {loading ? 'Generating...' : 'Print / Export to PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        </Box>
      </Paper>
    </Container>
  );
}