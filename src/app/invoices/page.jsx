"use client";
import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Drawer,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Close, Edit, Delete, Inventory2 } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { findAllCustomers } from "@/redux/slices/customer.slice";
import { findAllProductDetails } from "@/redux/slices/product.slice";
import InvoiceList from "./components/table";
import InvoiceForm from "./components/form";
import {
  createInvoiceData,
  findAllInvoices,
} from "@/redux/slices/invoice.slice";

const initialInvoices = [
  {
    id: 1,
    customer: "John Doe",
    date: "2024-05-15",
    status: "Paid",
    total: 119.98,
    items: [
      { product: "Wireless Headphones", quantity: 1, price: 99.99 },
      { product: "Cotton T-Shirt", quantity: 1, price: 19.99 },
    ],
  },
  {
    id: 2,
    customer: "Jane Smith",
    date: "2024-05-14",
    status: "Pending",
    total: 29.99,
    items: [{ product: "JavaScript Guide", quantity: 1, price: 29.99 }],
  },
];

const validationSchema = yup.object({
  customerId: yup.string().required("Customer is required"),
  productId: yup.string().required("Product is required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1")
    .integer("Quantity must be a whole number"),
});

export default function Invoice() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    customerId: "",
    productId: "",
    customerName: "",
    productName: "",
    totalPrice: 0,
    discountedPercent: 10,
    discountedPrice: 0,
    quantity: "",
  });

  const dispatch = useDispatch();

    const status = useSelector((state) => state?.invoice.status);

    console.log({status});
    
  

  // In the component where you initialize Formik (e.g., your parent page component)
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true, // This is crucial for re-initializing when data loads
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(createInvoiceData(values));
      console.log({ values });
      handleCloseDrawer();
      resetForm();
    },
  });

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
    formik.resetForm();
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  React.useEffect(() => {
    dispatch(findAllCustomers());
    dispatch(findAllProductDetails());
    dispatch(findAllInvoices());
  }, []);

  React.useEffect(() => {
    if (status === "created"|| status === "deleted") {
      dispatch(findAllInvoices());
    }
  }, [status]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4">Invoices</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenDrawer}
          >
            Create Invoice
          </Button>
        </Box>
        <InvoiceList />
      </Paper>

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
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Typography variant="h6">Create New Invoice</Typography>
          <IconButton onClick={handleCloseDrawer}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <InvoiceForm
          formik={formik}
          handleOpenDrawer={handleOpenDrawer}
          handleCloseDrawer={handleCloseDrawer}
        />
      </Drawer>
    </Container>
  );
}
