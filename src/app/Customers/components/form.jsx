"use client";
import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  DialogContent,
  DialogActions,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function CustomerForm({ formik, handleCloseDrawer }) {
  const [isEditing, setIsEditing] = useState(false);

  const loading = useSelector((state) => state?.customers.loading);

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Name *"
            variant="outlined"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Phone *"
            variant="outlined"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Discount"
            variant="outlined"
            name="discount"
            value={formik.values.discount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
            helperText={
              (formik.touched.discount && formik.errors.discount) ||
              "Enter discount percentage (e.g., 10%)"
            }
          />
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleCloseDrawer} color="inherit">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <Person />
            )
          }
        >
          {isEditing ? "Update" : "Add"} Member
        </Button>
      </DialogActions>
    </form>
  );
}
