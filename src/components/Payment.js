import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {UseStateValue} from '../StateProvider';
import CheckoutProduct from './CheckoutProduct';
import TestImage from "../images/letters.jpg";
import './Payment.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import axios from '../axios';
import firebase from 'firebase';
import { db } from '../firebase';


const Payment = () => {

    const history = useHistory();

    //useContest
    const [{basket,user}, dispatch] = UseStateValue();
    //# user => {displayName, email, uid}

    //Stripe useHooks
    const stripe = useStripe();
    const elements = useElements();

    //local state
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);

    const amount = getBasketTotal(basket) * 100;

    // useEffect(() => {
    //     //generate a special stripe secret and allows us to charge the customer

    //     const getClientSecret = async() => {
    //        const response = await axios({
    //            method:"POST",
    //            //stripe accepts payment in subunits (cents, paise)
    //            url:`/payments/create?total=${getBasketTotal(basket) * 100}`
    //        })
    //        setClientSecret(response.data.clientSecret);
    //     }
    //     getClientSecret();

    // }, [basket])

    useEffect(() => {
        if(basket.length === 0) { 
            history.push("/")
        }
      }, [basket])
  


    const handleStripeFormSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc()
        .set({
            basket:basket,
            amount: amount,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
            type:"EMPTY_CART"
        })
        history.replace("/orders")



        // const payload = await stripe.confirmCardPayment(clientSecret,
        //     {
        //         payment_method:{
        //             card: elements.getElement(CardElement)
        //         }
        //     })
        //     .then(({paymentIntent}) => {
        //         //payment confirmation

        //         db
        //             .collection("users")
        //             .doc(user?.uid)
        //             .collection("orders")
        //             .doc(paymentIntent.id)
        //             .set({
        //                 basket:basket,
        //                 amount: paymentIntent.amount,
        //                 created: paymentIntent.created
        //             })

        //         setSucceeded(true);
        //         setError(null);
        //         setProcessing(false);
        //         dispatch({
        //             type:"EMPTY_CART"
        //         })
        //         history.replace("/orders")
        //     }).catch(err => {
        //         console.log(err)
        //         setProcessing(false);
              
        //     })



    }

    const handleCardElementChange = event => {
        //Listen for changes in the card element
        //Display errors when the customer types card details
        setDisabled(event.empty);
        setError(event.error? event.error.message:"");
    }



    return (
        <div className="payment">
            <div className="payment__container">

                <Link to="/checkout">
                    <div className="payment__checkout__icon">
                        <div className="payment__backIcon">
                        <ArrowBackIosIcon /> 

                        </div>
                        <h2>
                            Back to Checkout ({basket?.length} items) 
                        </h2>

                    </div>

                    </Link>
           
                <div className="payment__section"> 
                
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                     
                    </div>
                    <div className="payment__address">
                            <p> <strong>Email: </strong>{user?.email} </p>
                            <p>Saidabad</p>
                            <p>Hyderbad,India</p>
                    </div>
                 </div>

               

                <div className="payment__section"> 
                    <div className="payment__title">
                        <h3>Review Your Items </h3>
                    </div>
                    <div className="payment__items">
                        {basket?.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                image={item.image}
                                rating={item.rating} />
                        ))}

                        {/* <CheckoutProduct 
                            id={"1"}
                            title={"Afeef is Good"}
                            price={999}
                            
                            image={TestImage}
                            rating={3} />
                            <hr className="style-four"></hr>
                            <CheckoutProduct 
                            id={"1"}
                            title={"Afeef is Good"}
                            price={999}
                            
                            image={TestImage}
                            rating={3} />
                            <hr className="style-four"></hr>
                            <CheckoutProduct 
                            id={"1"}
                            title={"Afeef is Good"}
                            price={999}
                            
                            image={TestImage}
                            rating={3} />
                            <hr className="style-four"></hr> */}
                    </div>
                </div>

                <div className="payment__section stripe">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">

                        <form onSubmit={handleStripeFormSubmit}>

                            <p className="payment__cardNo">Enter a Test Card No: 4242 4242 4242 4242 &nbsp;&nbsp; 04/24 &nbsp; 242 &nbsp;42424    </p>

                            <CardElement onChange={handleCardElementChange} />

                            <div className="payment__priceContainer">
                                <CurrencyFormat 
                                    renderText={(value) => (
                                        <>
                                        <h3>Order Total: {value} </h3>
                                        </>
                                    )}

                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSepartor={true}
                                    prefix={"Rs. "}
                                />
                            

                                {!user ? (
                                    <button type="submit" className="payment__signin">
                                       <Link to="/signin"> <span> {"Login to Purchase"} </span></Link>
                                    </button>
                                ):(
                                    <button  disabled={disabled || processing || succeeded }>
                                        <span> {processing? <p>Processing</p> : "Buy Now"} </span>
                                    </button>
                                )}

                            </div>
                                    {error && <div className="error">{error}</div>}
                            
                        </form>

                        

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment
