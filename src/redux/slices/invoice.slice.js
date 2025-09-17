import { create, deleteInvoice, findAll } from "@/app/services/invoice.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
  invoice: {},
  totalCount: "",
  status: "idle",
  error: null,
  loading: false,
};

// action for create Customer //
export const createInvoiceData = createAsyncThunk(
  "invoice/create",
  async (invoiceData) => {
    const res = await create(invoiceData);
    return res.data;
  }
);

// action for getting all customers
export const findAllInvoices = createAsyncThunk("invoice/findAll", async () => {
  const res = await findAll();
  console.log({ res: res.data });

  return res.data;
});

// delete invoice
export const deleteInvoiceData = createAsyncThunk(
  "invoice/delete",
  async (id) => {
    const res = await deleteInvoice(id);
    return res.data;
  }
);

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // customer create
      .addCase(createInvoiceData.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createInvoiceData.fulfilled, (state, action) => {
        state.status = "created";
        state.invoice = action.payload;
        state.loading = false;
      })
      .addCase(createInvoiceData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(findAllInvoices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(findAllInvoices.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log({ payload: action.payload });
        state.invoices = action.payload.invoices;
      })
      .addCase(findAllInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteInvoiceData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteInvoiceData.fulfilled, (state, action) => {
        state.status = "deleted";
      })
      .addCase(deleteInvoiceData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = invoiceSlice.actions;

export default invoiceSlice.reducer;
