import React, {useEffect} from 'react';
import './Checkout.css';
import Ad from '../images/special-offer-banner.png'
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { UseStateValue } from '../StateProvider';
import TestImage from "../images/letters.jpg";
import { useHistory } from 'react-router-dom';

const Checkout = () => {

    const history = useHistory();

    const [{basket},dispatch] = UseStateValue();
    //#  basket:[{id,title,image,price,rating}]

    useEffect(() => {
        if(basket.length === 0) {
            history.push("/")
        }
      }, [basket])
  


    return (
        <div className="checkout">
            <div className="checkout__left">

                <img className="checkout__ad" src={Ad} alt="ad"/>

                <div >
                     <h2 className="checkout__title">Your Shopping Cart</h2>
                    {basket?.map(item => (
                        <>
                            <CheckoutProduct 
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            
                            image={item.image}
                            rating={item.rating} />
                            <hr className="style-four"></hr>
                        </>
                  
                    ))}
{/* 
                        <CheckoutProduct 
                            id={"1"}
                            title={"Afeef is Good"}
                            price={999}
                            
                            image={TestImage}
                            rating={3} />
                            <hr className="style-four"></hr> 

                     */}

                   
     
                </div>

            </div>

            
            <div className="checkout__right">
                <Subtotal />
            </div>

        </div>
    )
}

export default Checkout
