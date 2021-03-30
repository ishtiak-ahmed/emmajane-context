import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import Login from './Components/Login/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Review from './Components/Review/Review';
import Shipment from './Components/Shipment/Shipment'
import { createContext, useState } from 'react'
import PrivateRoute from './Components/Review/PrivateRoute/PrivateRoute';

export const UserContenxt = createContext()

function App() {
  const [loggedinUser, setLoggedinUser] = useState({})
  return (
    <UserContenxt.Provider value={[loggedinUser, setLoggedinUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/manage">
            <h1>Manage Inventory</h1>
          </PrivateRoute>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <PrivateRoute path='/shipment'>
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path='*'>
            <h1>Page not found, 404 error</h1>
            <h2>Try something else or go to <Link to="/">Home</Link></h2>
          </Route>
        </Switch>
      </Router>
    </UserContenxt.Provider>
  );
}

export default App;
