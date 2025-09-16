"use client";
import { Provider } from "react-redux";
import { store } from "./store";

/**
 * Provider component with store props to be wrapped around the html body
 * @param {object} children - components wrapped inside this function 
 * @returns {component} Provider component with store props 
 */
export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
