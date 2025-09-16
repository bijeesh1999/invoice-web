"use client";

import { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Drawer,
  IconButton,
  Box,
  Divider,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { Close, Inventory2 } from "@mui/icons-material";

export default function ProductForm({
  formik,
  handleCloseDrawer,
  isEditing,
}) {    
  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Grid container spacing={2}>
          {/* Name */}
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Product Name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          {/* Price */}
          <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            variant="outlined"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          {/* Description */}
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleCloseDrawer} color="inherit">
          Cancel
        </Button>
        <Button  type="submit" variant="contained"  startIcon={<Inventory2 />}>
          {isEditing ? "Save Changes" : "Add Product"}
        </Button>
      </DialogActions>
    </form>
  );
}
