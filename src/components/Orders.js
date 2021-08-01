import React, {useState,useEffect} from 'react'
import './Orders.css';
import { db } from '../firebase';
import { UseStateValue } from '../StateProvider'; 
import Order from './Order';
import { useHistory } from 'react-router-dom';

const Orders = () => {

    const history = useHistory();

    const [{basket,user},dispatch] = UseStateValue();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user) {
            db
            .collection("users")
            .doc(user?.uid)
            .collection("orders")
            .orderBy("timestamp","desc")
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id:doc.id,
                    data:doc.data()
                })))
            ))

        } else {
            setOrders([])
            history.push("/")
        }
       
    }, [user])

  

    return (
        <div className="orders">
            <h1> {user? "Your orders" : ""} </h1> 

            <div className="orders__order">
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders
