import {
  createCustomer,
  deleteCustomer,
  findCustomers,
} from "@/app/services/customer.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  customer: {},
  totalCount: "",
  status: "idle",
  error: null,
  isLoading: false,
};

// action for create Customer //
export const createCustomerData = createAsyncThunk(
  "customer/create",
  async ({ name, email, phone, discount }) => {
    const res = await createCustomer({ name, email, phone, discount });
    return res.data;
  }
);

// action for getting all customers
export const findAllCustomers = createAsyncThunk(
  "customer/findAll",
  async () => {
    const res = await findCustomers();
    return res.data;
  }
);

// delete customers
export const deleteCustomerData = createAsyncThunk(
  "customer/delete",
  async (id) => {
    const res = await deleteCustomer(id);
    return res.data;
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // customer create
      .addCase(createCustomerData.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(createCustomerData.fulfilled, (state, action) => {
        state.status = "created";
        state.customer = action.payload;
        state.isLoading = false;
      })
      .addCase(createCustomerData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(findAllCustomers.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(findAllCustomers.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.customers = action.payload.users;
        state.isLoading = false;
      })
      .addCase(findAllCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(deleteCustomerData.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(deleteCustomerData.fulfilled, (state, action) => {
        state.status = "deleted";
        state.isLoading = false;
      })
      .addCase(deleteCustomerData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const {} = customerSlice.actions;

export default customerSlice.reducer;
