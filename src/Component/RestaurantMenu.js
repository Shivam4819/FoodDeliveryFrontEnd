import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RestaurantMenu(props){
    const location = useLocation();

    const[itemArray, setItemArray] = useState([]);
    const id=location.state.hotel_id
    const hotelName=location.state.hotel_name
    const [arr,setArr]= useState([])
    const [total,setTotal]=useState(0)
    useEffect(()=>{
        axios.post('http://localhost:8080/menus',{
            id:id
        })
            .then(response=> {
                setArr(response.data)
            })
    },[])

    function cart(){
        props.history.push({
            pathname: '/cart',
            state: {
                itemArray: itemArray,
                total: total
            }
        })
    }

    function addToCart(id,name,price){
        const item = {
            id: id,
            name: name,
            price: price
        }
        itemArray.push(item)
        toast.success("item added to cart")
        setTotal(total+price)
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
                    Total: {total}<br/>
                    <button className="btn btn-warning" onClick={cart}>Cart</button>

                    </tbody>
                </table>
            </div>
        </div>
    )
}
