"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton,
  Chip,
  Avatar,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  deleteCustomerData,
  findAllCustomers,
} from "@/redux/slices/customer.slice";

export default function CustomerList(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      dispatch(deleteCustomerData(id));
    }
  };

  React.useEffect(() => {
    dispatch(findAllCustomers());
  }, []);

  return (
    <TableContainer component={Paper} elevation={1}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "grey.100" }}>
            <TableCell sx={{ minWidth: 200 }}>Customer</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.customers.length > 0 ? (
            (props?.customers || [])
              ?.slice()
              ?.reverse()
              ?.map((member) => (
                <TableRow key={member._id} hover sx={{ cursor: "pointer" }}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {member.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body1">{member.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {member.email || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{member.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    {member.discount ? (
                      <Chip
                        label={member.discount}
                        color="success"
                        size="small"
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No discount
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {/* <IconButton
                    color="primary"
                    onClick={() => handleOpenDrawer(member)}
                  >
                    <Edit />
                  </IconButton> */}
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(member._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  {searchTerm
                    ? "No members found matching your search."
                    : "No members found."}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
