import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RestaurantMenu(){
    const location = useLocation();

    const id=location.state.hotel_id
    const hotelName=location.state.hotel_name
    const [arr,setArr]= useState([])

    useEffect(()=>{
        axios.post('http://localhost:8080/menus',{
            id:id
        })
            .then(response=> {
                setArr(response.data)
            })
    },[])

    function addToCart(id,name,price){
        axios.post('http://localhost:8080/order',{
            itemid:id,
            name:name,
            price:price
        }).then(response=>{
            toast.dismiss()
            if(response.data.code===200){
                toast.success("item added to cart")
            }else {
                toast.error("item not added")
            }
        })
    }
    return(
        <div>
            <h2>{hotelName}</h2>

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
                                    <td><button className="btn btn-warning" onClick={()=>addToCart(value.id,value.name, value.price)}>add</button></td>
                                    <ToastContainer
                                        position="bottom-right"
                                        autoClose={1000}
                                    />
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
