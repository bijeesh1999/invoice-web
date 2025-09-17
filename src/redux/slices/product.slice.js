import {
  createProduct,
  deleteProduct,
  findAllProducts,
} from "@/app/services/product.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: {},
  totalCount: "",
  status: "idle",
  error: null,
  loading: false,
};

// action for create Product //
export const createProductData = createAsyncThunk(
  "product/create",
  async (productData) => {
    const res = await createProduct({
      name: productData?.name,
      price: productData?.price,
      description: productData?.description,
    });
    return res;
  }
);

// action for getting all Products
export const findAllProductDetails = createAsyncThunk(
  "product/findAll",
  async () => {
    const res = await findAllProducts();
    return res.data;
  }
);

// delete product
export const deleteProductData = createAsyncThunk(
  "product/delete",
  async (id) => {
    const res = await deleteProduct(id);
    return res.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // product create
      .addCase(createProductData.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createProductData.fulfilled, (state, action) => {
        state.status = "created";

        state.product = action.payload;
        state.loading = false;
      })
      .addCase(createProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(findAllProductDetails.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(findAllProductDetails.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(findAllProductDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteProductData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductData.fulfilled, (state, action) => {
        state.status = "deleted";
      })
      .addCase(deleteProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
