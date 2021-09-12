import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//component section
import Navbar from "./component/navbar/Navbar";
import TopDrawer from "./section/topDrawer/TopDrawer";
import Footer from "./component/footer/Footer";

//screens
import HomeScreen from "./screens/homeScreen/HomeScreen";
import SkinScreen from "./screens/skincareScreen/SkinScreen";
import BodyScreen from "./screens/bodyhairScreen/BodyScreen";
import ProductScreen from "./screens/productScreen/ProductScreen";
import CartScreen from "./screens/cartScreen/CartScreen";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import RegisterScreen from "./screens/registerScreen/RegisterScreen";
import ShippingScreen from "./screens/shippingScreen/ShippingScreen";
import PaymentScreen from "./screens/paymentScreen/PaymentScreen";
import PlaceOrderScreen from "./screens/placeOrderScreen/PlaceOrderScreen";
import OrderScreen from "./screens/orderScreen/OrderScreen";
import OrderHistoryScreen from "./screens/orderHistoryScreen/OrderHistoryScreen";
import ProfileScreen from "./screens/profileScreen/ProfileScreen";
import PrivateRoute from "./component/PrivateRoute";
import AdminRoute from "./component/AdminRoute";
import ProductListScreen from "./screens/productListScreen/ProductListScreen";
import CreateProductScreen from "./screens/createProductScreen/CreateProductScreen";
import EditProductScreen from "./screens/editProductScreen/EditProductScreen";
import AllOrderScreen from "./screens/allOrderScreen/AllOrderScreen";
import UserListScreen from "./screens/userListScreen/UserListScreen";
import EditUserScreen from "./screens/editUserScreen/EditUserScreen";
import AllProductScreen from "./screens/allProductScreen/AllProductScreen";

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <Navbar click={() => setSideToggle(!sideToggle)} />
      <TopDrawer show={sideToggle} click={() => setSideToggle(false)} />

      <main>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/search/skin" component={SkinScreen} />
          <Route exact path="/search/body" component={BodyScreen} />
          <Route exact path="/allproducts" component={AllProductScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/shipping" component={ShippingScreen} />
          <Route exact path="/payment" component={PaymentScreen} />
          <Route exact path="/placeorder" component={PlaceOrderScreen} />
          <Route exact path="/order/:id" component={OrderScreen} />
          <Route exact path="/orderhistory" component={OrderHistoryScreen} />
          <PrivateRoute exact path="/profile" component={ProfileScreen} />
          <AdminRoute exact path="/productlist" component={ProductListScreen} />
          <AdminRoute
            exact
            path="/createproduct"
            component={CreateProductScreen}
          />
          <AdminRoute
            exact
            path="/product/:id/edit"
            component={EditProductScreen}
          />
          <AdminRoute exact path="/allorders" component={AllOrderScreen} />
          <AdminRoute exact path="/userlist" component={UserListScreen} />
          <AdminRoute exact path="/user/:id/edit" component={EditUserScreen} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
