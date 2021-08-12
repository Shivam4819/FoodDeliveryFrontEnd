import React, {useEffect, useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLocation} from "react-router-dom";

export default function CartComponent(props){

    const location = useLocation();
    const [itemArray, setItemArray] = useState([])
    const [total,setTotal]=useState(0)
    const [tax,setTax]= useState(0)
    const [delivery_charges, Setdelivery]=useState(0)

    useEffect(()=>{
        if (location.state.itemArray!==undefined) {
            const array = location.state.itemArray
            const total= location.state.total
            setTax(total*18/100)
            Setdelivery(total*10/100)
            setTotal(total)
            if (array.length > 0)
                setItemArray(location.state.itemArray);
        }
    },[])

    function deleteItem(id){
        for (let i = 0; i < itemArray.length; i++) {
            let obj = itemArray[i];

            if (obj.id === id) {
                itemArray.splice(i, 1);
                setTotal(total-obj.price)
                setTax(total*18/100)
                Setdelivery(total*10/100)
            }
        }

        if (itemArray.length >0){
            console.log("If:", itemArray)
            setItemArray(itemArray);
        }
        else {
            console.log("Else:", itemArray)
            setItemArray([])
        }
        console.log("itemArray:", itemArray)
        toast.success("item deleted from cart")
    }

    function placeOrder(){
        axios.post('http://localhost:8080/placeOrder',{
            itemArray: itemArray
        }).then(response=>{
            toast.dismiss()
            if(response.data.id===200){
                toast.success("Order Placed!!")
                props.history.push({
                    pathname: '/order',
                    state: {
                        tax: tax,
                        delivery: delivery_charges,
                        total:total
                    }
                })
            }else {
                toast.error("Error while placing order!!")
            }
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
                        itemArray.map(value => {
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
                    Tax: {tax}<br/>
                    Delivery Charges:{delivery_charges}<br/>
                    Total: {total}<br/>
                    Final Amount= {tax+total+delivery_charges}<br/>
                    {
                        itemArray.length>0 ?
                            <button className="btn btn-warning" onClick={placeOrder}>Place Order</button>
                        :<></>
                    }

                </table>

            </div>
        </div>
    )
}
