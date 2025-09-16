"use client";
import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
  Drawer,
  DialogTitle,
  Divider,
} from "@mui/material";
import { Add, Edit, Delete, Close, Search, Person } from "@mui/icons-material";
import CustomerList from "./components/list";
import CustomerForm from "./components/form";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  createCustomerData,
  findAllCustomers,
} from "@/redux/slices/customer.slice";
import { useSelector } from "react-redux";

// Sample members data
const initialMembers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "+1-555-0123",
    discount: "10%",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1-555-0124",
    discount: "15%",
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike@example.com",
    phone: "+1-555-0125",
    discount: "5%",
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@example.com",
    phone: "+1-555-0126",
    discount: "20%",
  },
  {
    id: 5,
    name: "James Brown",
    email: "james@example.com",
    phone: "+1-555-0127",
    discount: "12%",
  },
];

// Yup validation schema
const validationSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: yup.string().email("Please enter a valid email address"),
  phone: yup
    .string()
    .trim()
    .required("Phone is required")
    .matches(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
  discount: yup
    .string()
    .matches(
      /^(\d{1,3})%?$/,
      "Discount must be a number followed by % (e.g., 10%)"
    )
    .test(
      "is-valid-discount",
      "Discount must be between 0% and 100%",
      (value) => {
        if (!value) return true;
        const numValue = parseFloat(value.replace("%", ""));
        return numValue >= 0 && numValue <= 100;
      }
    ),
});

export default function Members() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");

  const customers = useSelector((state) => state?.customers.customers);
  const status = useSelector((state) => state?.customers.status);

  const dispatch = useDispatch();

  const handleOpenDrawer = (member = null) => {
    setIsEditing(!!member);
    formik.resetForm({ values: member || formik.initialValues });
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    formik.resetForm();
  };

  const filteredCustomers =
    customers &&
    customers?.length &&
    customers?.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      discount: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (isEditing) {
        setMembers(
          members.map((member) =>
            member.id === formik.initialValues.id
              ? { ...member, ...values }
              : member
          )
        );
      } else {
        dispatch(createCustomerData(values));
      }
      setIsDrawerOpen(false);
      resetForm();
    },
  });

  React.useEffect(() => {
    if (status === "created") {
      dispatch(findAllCustomers());
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
          <Box>
            <Typography variant="h4" component="h1">
              Customers
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Manage your customers and their information
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDrawer()}
          >
            Add Customer
          </Button>
        </Box>

        {/* Search Field */}
        <Box mb={4}>
          <TextField
            fullWidth
            label="Search Customers"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: "action.active", mr: 1 }} />,
            }}
          />
        </Box>

        {/* Members Table */}
        <CustomerList customers={filteredCustomers} />
      </Paper>

      {/* Drawer for Add/Edit Form */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{ sx: { width: { xs: "100%", sm: 450 } } }}
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              {isEditing ? "Edit Member" : "Add New Member"}
            </Typography>
            <IconButton onClick={handleCloseDrawer}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />
        <CustomerForm
          formik={formik}
          handleOpenDrawer={handleOpenDrawer}
          handleCloseDrawer={handleCloseDrawer}
        />
      </Drawer>
    </Container>
  );
}
