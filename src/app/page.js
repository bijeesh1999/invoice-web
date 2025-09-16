"use client";

import { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Badge,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Receipt as ReceiptIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const drawerWidth = 240;

export default function AdminLayout({ children }) {
  // Local state for sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon />, path: "/" },
    {
      id: "customers",
      label: "Customers",
      icon: <PeopleIcon />,
      path: "/Customers",
    },
    {
      id: "products",
      label: "Products",
      icon: <InventoryIcon />,
      path: "/products",
    },
    {
      id: "invoices",
      label: "Invoices",
      icon: <ReceiptIcon />,
      path: "/invoices",
    },
  ];

  const handleDrawerToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getActiveItem = () => {
    return (
      sidebarItems.find((item) => item.path === pathname)?.id || "dashboard"
    );
  };

  return (
    <Provider store={store}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: 1,
            width: `calc(100% - ${isSidebarOpen ? drawerWidth : 64}px)`,
            ml: isSidebarOpen ? `${drawerWidth}px` : "64px",
            boxShadow: 3,
            minHeight: 72,
            backgroundColor: "white",
            color: "black",
            transition: (theme) =>
              theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, borderColor: " rgba(15, 15, 15, 0.2)" }}
            />
            <Avatar sx={{ bgcolor: "secondary.main", mr: 1 }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle2">Admin User</Typography>
              <Typography variant="caption" color="text.secondary">
                admin@company.com
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Drawer Component */}
        <Drawer
          variant="permanent"
          open={isSidebarOpen}
          sx={{
            width: isSidebarOpen ? drawerWidth : 64,
            flexShrink: 0,
            whiteSpace: "nowrap",
            boxSizing: "border-box",
            "& .MuiDrawer-paper": {
              width: isSidebarOpen ? drawerWidth : 64,
              transition: (theme) =>
                theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              boxSizing: "border-box",
              overflowX: "hidden",
            },
          }}
        >
          <Toolbar
            sx={{
              // justifyContent: isSidebarOpen ? "flex-start" : "center",
              alignItems: "center",
              justifyContent: "space-between",
              py: 2,
            }}
          >
            {isSidebarOpen ? (
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: "flex", width:"100%", justifyContent:"space-between",alignItems:"center" }}
              >
                <h4 style={{margin:"0"}}>Admin Panel</h4>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              </Typography>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
          <Divider />
          <List component="nav">
            {sidebarItems.map((item) => (
              <ListItemButton
                key={item.id}
                selected={getActiveItem() === item.id}
                onClick={() => router.push(item.path)}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: isSidebarOpen ? "flex-start" : "center",
                  backgroundColor:
                    getActiveItem() === item.id ? "primary.main" : "inherit",
                  color: getActiveItem() === item.id ? "#817e7eff" : "inherit",
                  "&:hover": {
                    backgroundColor:
                      getActiveItem() === item.id
                        ? "primary.dark"
                        : "rgba(0,0,0,0.04)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isSidebarOpen ? 3 : "auto",
                    justifyContent: "center",
                    color:
                      getActiveItem() === item.id ? "#6b6767ff" : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {isSidebarOpen && <ListItemText primary={item.label} />}
              </ListItemButton>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            pt: 10,
            // ml: isSidebarOpen ? `${drawerWidth}px` : "64px",
            transition: (theme) =>
              theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
          }}
        >
          {children}
        </Box>
      </Box>
    </Provider>
  );
}
