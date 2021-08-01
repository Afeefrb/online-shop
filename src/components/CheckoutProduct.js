import React from 'react'
import './CheckoutProduct.css';
import StarIcon from '@material-ui/icons/Star';
import { UseStateValue } from '../StateProvider';

const CheckoutProduct = ({id, title, image, price, rating, hideButton}) => {
    const [{basket},dispatch] = UseStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id:id
        })
    }

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} />

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title"> {title} </p>
                <p className="checkoutProduct__price">
                    <small>Rs.</small>
                    <strong> {price} </strong>
                </p> 
                <div className="checkoutProduct__rating">
                    {Array(rating).fill().map((_,i) => (
                        <StarIcon />
                    ))}
                </div>
                {!hideButton && <button onClick={removeFromBasket}>Remove from Basket</button> }
                
              
            </div>
            {/* <hr className="style-four"></hr> */}


        </div>
    )
}

export default CheckoutProduct
