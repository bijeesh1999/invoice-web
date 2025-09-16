"use client";
import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Box,
} from "@mui/material";

import { Edit, Delete, Image } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { findAllProductDetails } from "@/redux/slices/product.slice";

export default function ProductTable(props) {
  const getStatusChipColor = (status, stock) => {
    if (stock === 0) return { label: "Out of Stock", color: "warning" };
    if (status === "active") return { label: "Active", color: "success" };
    return { label: "Inactive", color: "error" };
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(findAllProductDetails());
  }, []);

  return (
    <Grid container spacing={3}>
      {props?.products?.length > 0 ? (
        props?.products?.map((product,index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={2}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: 150,
                    backgroundColor: "grey.200",
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  <Image sx={{ fontSize: 48, color: "grey.400" }} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {product.description || "No description available"}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="h5" color="primary">
                    ${Number(product?.price)?.toFixed(2)}
                  </Typography>
                  <Chip
                    label={
                      getStatusChipColor(product.status, product.stock).label
                    }
                    color={
                      getStatusChipColor(product.status, product.stock).color
                    }
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
                <IconButton
                  onClick={() => handleEditProduct(product)}
                  color="primary"
                  size="small"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(product.id)}
                  color="error"
                  size="small"
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="body1"
            color="text.secondary"
            mt={4}
          >
            {props?.searchTerm
              ? "No products found matching your search."
              : "No products found."}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
