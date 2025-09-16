"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import customerSlice from "@/redux/slices/customer.slice"
import productSlice from "@/redux/slices/product.slice"
import invoiceSlice from "@/redux/slices/invoice.slice"
import { useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  customers:customerSlice,
  products:productSlice,
  invoice:invoiceSlice

});

export const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
