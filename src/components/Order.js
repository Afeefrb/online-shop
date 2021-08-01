import React from 'react';
import './Order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

const Order = ({order}) => {

    //# order ==> {id, 
    //# data:{amount, basket: {title, price, image, rating}, created}}

    return (
        <div className="order">
            <div className="order__time__id"> 
                <h3>Order</h3>
                <p>{moment.unix(order.data.timestamp).format("MMMM Do YYYY, h:mma")}</p>
                <p className="order__id">
                <small> [{order.id}]</small>
            </p>
            </div>
            
           
            {order.data.basket?.map(item => (
                <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                    image={item.image}
                    hideButton />
            ))}

            <CurrencyFormat 
                renderText={(value) => (
                <h3 className="order__total"> Order Total: {value}</h3>
                )} 
                value={order.data.amount / 100}
                thousandSeparator = {true}
                decimalScale={2}
                displayType={"text"}
                prefix={"Rs."}

                />

        </div>
    )
}

export default Order
