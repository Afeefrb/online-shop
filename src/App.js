import React, {useEffect} from 'react';
import Header from "./components/Header";
import Home from "./components/Home";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Checkout from "./components/Checkout";
import Signin from "./components/Signin";
import {auth} from './firebase'
import { UseStateValue } from './StateProvider';
import Payment from './components/Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './components/Orders';


const promise = loadStripe("pk_test_Ap5U8bx9d32rPdTv2Jme5vey001l0sH5Xg");

function App() {

  const [{},dispatch] = UseStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log(authUser);
      //# authUser => {displayName, email, photoURL, refreshToken}

      if(authUser) {
        dispatch({
          type:"SET_USER",
          user: authUser
        })
      } else {
        console.log("User is logged out");
        dispatch({
          type:"SET_USER",
          user: null
        })
      }
    })
   
  }, [])

  return (
    <Router>

      <div className="app">
          
           <Header />

           <Switch>

            <Route path="/checkout" component={Checkout} />
            <Route path="/signin" component={Signin} />

            <Route path="/payment">

                <Elements stripe={promise}>
                    <Payment />
                </Elements>
            </Route>

            <Route path="/orders" component={Orders} />
            
            <Route path="/"  component={Home} />
         


           </Switch>


      </div>

    </Router>
   
  );
}

export default App;
