import Dashboard from "views/Dashboard.js";
import UserPage from "views/UserPage.js";
import Inventory from "views/Inventory.js";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "business_chart-bar-32",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/inventory",
    name: "Inventory",
    icon: "shopping_box",
    component: <Inventory />,
    layout: "/admin",
  },
  
  {
    path: "/user-page",
    name: "Admin Profile",
    icon: "users_single-02",
    component: <UserPage />,
    layout: "/admin",
  } 
];
export default dashRoutes;
