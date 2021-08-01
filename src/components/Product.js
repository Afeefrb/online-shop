import React from 'react';
import './Product.css';
import StarIcon from '@material-ui/icons/Star';
import { UseStateValue } from '../StateProvider';



const Product = ({id, title, image, price, rating}) => {
    
    const [{basket},dispatch] = UseStateValue();

    //# basket:[{id,title,image,price,rating}]

    console.log("basket: ", basket);
    

    const addtoBasket = () => {
        dispatch({
            type:"ADD_TO_BASKET",
            item:{
                id,
                title, 
                image,
                price,
                rating
            }
        })
    }

  
    return (
        <div className="product">
            <div className="product__info">

                <p className="product__text"> {title} </p>
 
                <p className="product__price">
                    <small>Rs. </small>
                    <strong> {price} </strong>
                </p>
                <div className="product__rating">

                    {Array(rating).fill().map((_,i) => (
                        <StarIcon />
                    )) }
                   
                </div>
            </div>

            <img className="product__img" src={image} alt="book1" />

            <button onClick={addtoBasket}>Add to Basket</button>
        
            
        </div>
    )
}

export default Product
