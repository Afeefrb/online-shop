import React, {useState} from 'react';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import { getBasketTotal } from '../reducer';
import { UseStateValue } from '../StateProvider';
import './Subtotal.css';


const Subtotal = () => {

    const history = useHistory();

    const [{basket}, action] = UseStateValue();
     //# basket:[{id,title,image,price,rating}] 

    const [coupon, setCoupon] = useState("");
    
    

    //  console.log("basket.price: ",basket?.price);

    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText={(value) => (
                    <>
                        <p class="subtotal__text">

                            {`Subtotal(${basket? (basket.length) : "0"} 
                            ${basket?.length === 1 ? "item":"items"})`}  

                            &nbsp;&nbsp;

                        <strong>{value}</strong>

                        </p>

                        <small className="subtotal__gift__coupon">
                            <div>
                            <input type="checkbox" />
                            &nbsp; This order contain's a gift
                            </div>

                            <div>
                                Enter the coupon code
                             
                                
                                <input
                                  style={{textTransform:"uppercase"}}
                                  maxLength="7"
                                  size="7"
                                  type="text" 
                                  value={coupon}
                                  onChange={(e) => setCoupon(e.target.value)} />
                            </div>
                         </small>

                        <button onClick={e => history.push("/payment")}>Proceed to Payment</button>

                    </>
                )}

                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSepartor={true}
                prefix={"Rs. "}
            />
        </div>
    )
}

export default Subtotal
