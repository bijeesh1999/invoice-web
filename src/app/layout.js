import { ThemeProvider } from "@mui/material/styles";
import AdminLayout from "./page";
import theme from "../../theme";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export const metadata = { 
  title: "Admin Panel",
  description:
    "A professional admin dashboard built with Next.js and Material UI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <AdminLayout>{children}</AdminLayout>
        {/* This is the key fix */}
      </body>
    </html>
  );
}
