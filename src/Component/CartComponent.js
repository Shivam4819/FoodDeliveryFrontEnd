import React, {useEffect, useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CartComponent(props){
    const [arr,setArr]= useState([])

    useEffect(()=>{
        axios.get('http://localhost:8080/cart',)
            .then(response=> {
                setArr(response.data)
            })
    },[])

    function deleteItem(id){
        axios.post('http://localhost:8080/delcart',{
            id:id
        }).then(response=>{
            if(response.data.code===200) {
                toast.success("item deleted from cart")
                axios.get('http://localhost:8080/cart')
                    .then(response=> {
                        setArr(response.data)
                    })
            }
            else {
                toast.error("item not deleted from cart")
            }
        })
    }

    function placeOrder(){
        axios.post('http://localhost:8080/placeOrder')
            .then(response=>{
                props.history.push("/order")
            })
    }

    return(
        <div>
            <h2>Cart</h2>

            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        arr.map(value => {
                            // console.log(value)
                            return (
                                <tr>
                                    <td>{value.name}</td>
                                    <td>{value.price}</td>
                                    <td><button className="btn btn-warning" onClick={()=>deleteItem(value.id)}>Delete</button></td>
                                    <ToastContainer
                                        position="bottom-right"
                                        autoClose={1000}
                                    />
                                </tr>


                            )
                        })
                    }

                    </tbody>
                    <button className="btn btn-warning" onClick={placeOrder}>Place Order</button>
                </table>

            </div>
        </div>
    )
}
