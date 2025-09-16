"use client";

import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Inventory2 } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { findAllCustomers } from "@/redux/slices/customer.slice";
import { findAllProductDetails } from "@/redux/slices/product.slice";

const validationSchema = yup.object({
  customerId: yup.number().required("Customer is required"),
  productId: yup.number().required("Product is required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1")
    .integer("Quantity must be a whole number"),
});

export default function InvoiceForm({
  formik,
  handleOpenDrawer,
  handleCloseDrawer,
}) {
  const customers = useSelector((state) => state?.customers.customers);
  const products = useSelector((state) => state.products.products);

  const dispatch = useDispatch();

  //   const handleDeleteInvoice = (id) => {
  //     if (window.confirm("Are you sure you want to delete this invoice?")) {
  //       setInvoices(invoices.filter((invoice) => invoice.id !== id));
  //     }
  //   };

  const getStatusChipColor = (status) => {
    switch (status) {
      case "Paid":
        return "success";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="customer-label">Customer</InputLabel>
            <Select
              labelId="customer-label"
              id="customerId"
              name="customerId"
              label="Customer"
              value={formik.values.customerId || ""}
              onChange={(event) => {
                formik?.setFieldValue("customerId", event.target.value);
                const selectedCustomer = customers?.find(
                  (customer) => customer._id === event.target.value
                );
                if (selectedCustomer) {
                  formik.setFieldValue("customerName", selectedCustomer?.name);
                  formik.setFieldValue(
                    "discountedPercent",
                    selectedCustomer?.discount || 10
                  );
                }
              }}
              error={
                formik.touched.customerId && Boolean(formik.errors.customerId)
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {customers?.map((customer) => (
                <MenuItem key={customer._id} value={customer._id}>
                  {customer.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.customerId && formik.errors.customerId && (
              <Typography variant="caption" color="error">
                {formik.errors.customerId}
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="product-label">Product</InputLabel>
            <Select
              labelId="product-label"
              id="productId"
              name="productId"
              label="Product"
              value={formik.values.productId}
              onChange={(event) => {
                formik.setFieldValue("productId", event.target.value || "");
                const selectedProduct = products?.find(
                  (product) => product?._id === event.target.value
                );
                if (selectedProduct) {
                  formik.setFieldValue("productName", selectedProduct.name);
                  const quantity = formik.values.quantity || 1;
                  const price = selectedProduct?.price || 0;
                  const discountPercent =
                    Number(formik.values.discountPercent) || 10;

                  const totalPrice = price * quantity;
                  const discountedPrice =
                    totalPrice - totalPrice * (discountPercent / 100);

                  formik.setFieldValue("totalPrice", totalPrice);
                  formik.setFieldValue("discountedPrice", discountedPrice);
                }
              }}
              error={
                formik.touched.productId && Boolean(formik.errors.productId)
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {products.map((product) => (
                <MenuItem key={product._id} value={product._id}>
                  {product.name} (${Number(product?.price)?.toFixed(2)})
                </MenuItem>
              ))}
            </Select>
            {formik.touched.productId && formik.errors.productId && (
              <Typography variant="caption" color="error">
                {formik.errors.productId}
              </Typography>
            )}
          </FormControl>
          <TextField
            fullWidth
            id="quantity"
            name="quantity"
            label="Quantity"
            type="number"
            variant="outlined"
            value={formik.values.quantity}
            onChange={(e) => {
              formik.setFieldValue("quantity", Number(e.target.value));
              formik.setFieldValue(
                "totalPrice",
                formik?.values?.totalPrice * Number(e.target.value)
              );
              formik.setFieldValue(
                "discountedPrice",
                formik?.values?.discountedPrice * Number(e.target.value)
              );
            }}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
        </Grid>
        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={handleCloseDrawer} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" startIcon={<Inventory2 />}>
            Create Invoice
          </Button>
        </Box>
      </form>
    </Box>
  );
}
