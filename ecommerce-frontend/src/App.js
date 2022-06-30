import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Header } from "./Components/Header";
import Product from "./Components/Product";
import Home from "./Components/Home";
import ProductDetails from "./Components/ProductDetails";
import NavCart from "./Components/NavCart";
import Cart from "./Components/Cart";
import SignIn from "./Components/SignIn";
import WishList from "./Components/WishList";
import Compare from "./Components/Compare";
import Shipping from "./Components/Shipping";
import Registration from "./Components/Registration";
import PlaceOrder from "./Components/PlaceOrder";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Payment from "./Components/Payment";
import Order from "./Components/Order.jsx";
import Dashboard from "./Components/Dashboard";
import Vandor from "./Components/Vandor";
import VartualCard from "./Components/VartualCard";
import ShowOwnerPro from "./Components/ShowOwnerPro";
import CreateCatagory from "./Components/CreateCatagory";
import Affiliate from "./Components/Affiliate";
import GetAffiliate from "./Components/GetAffiliate";
import AdminDashboard from "./Components/AdminDashboard";
import AdminUserList from "./Components/AdminUserList";
import AdminProduct from "./Components/AdminProduct";
import RoleManagement from "./Components/RoleManagement";
import AdminSignIn from "./Components/AdminSignIn";



function App() {
  return (
    <>
    <BrowserRouter>
    <ToastContainer
      position="bottom-left"
      limit={1}
      autoClose={3000}
    />
    <Header/>
    <Cart/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/product" element={<Product />}/>  
        <Route path="/product/:slug" element={<ProductDetails />}/>    
        <Route path="/navCart" element={<NavCart />}/>    
        <Route path="/signin" element={<SignIn />}/>    
        <Route path="/signup" element={<Registration />}/>    
        <Route path="/wishList" element={<WishList />}/>    
        <Route path="/compare" element={<Compare />}/>    
        <Route path="/shipping" element={<Shipping />}/>    
        <Route path="/payment" element={<Payment />}/>    
        <Route path="/placeholder" element={<PlaceOrder />}/>    
        <Route path="/orders/:id" element={<Order />}/>    
        <Route path="/dashboard" element={<Dashboard />}/>    
        <Route path="/vandor" element={<Vandor />}/>    
        <Route path="/vartualCard" element={<VartualCard />}/>    
        <Route path="/showPro" element={<ShowOwnerPro />}/>    
        <Route path="/createCatagory" element={<CreateCatagory />}/>       
        <Route path="/affiliate" element={<Affiliate />}/>       
        <Route path="/getAffiliate" element={<GetAffiliate />}/>       
        <Route path="/admin" element={<AdminDashboard />}/>       
        <Route path="/adminuserlist" element={<AdminUserList />}/>       
        <Route path="/adminproduct" element={<AdminProduct />}/>       
        <Route path="/rolemanagement" element={<RoleManagement />}/>       
        <Route path="/adminsignin" element={<AdminSignIn />}/>       
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
