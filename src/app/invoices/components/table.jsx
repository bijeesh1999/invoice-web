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
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useDispatch, useSelector } from "react-redux";
import { handlePdf } from "./pdf";


export default function InvoiceList() {
  const invoices = useSelector((state) => state?.invoice.invoices);

  console.log({ invoices });

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
    <TableContainer component={Paper} elevation={1}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Invoice #</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Discount</TableCell>
            <TableCell align="right">discount(%)</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices?.map((invoice, index) => (
            <TableRow key={invoice._id}>
              <TableCell>{`#${index + 1}`}</TableCell>
              <TableCell>{invoice?.customerName}</TableCell>
              <TableCell>{invoice?.productName}</TableCell>
              <TableCell>{invoice?.quantity}</TableCell>

              <TableCell>
                <Chip
                  label={"pending"}
                  color={getStatusChipColor(invoice.status)}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                ${Number(invoice?.totalPrice).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                ${Number(invoice?.discountedPrice).toFixed(2)}
              </TableCell>
                            <TableCell align="center">
                {Number(invoice?.discountedPercent)}
              </TableCell>
              <TableCell align="center">
                <PictureAsPdfIcon className="pointer"
                onClick={()=>handlePdf(invoice)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
