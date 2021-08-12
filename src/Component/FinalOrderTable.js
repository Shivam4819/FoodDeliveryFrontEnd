import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";

export default function FinalOrderTable(props){
    const location = useLocation();

    const [arr,setArr]= useState([])
    const total= location.state.total
    const tax= location.state.tax
    const delivery_charges= location.state.delivery
    useEffect(()=>{
        axios.get('http://localhost:8080/finalorder')
            .then(response=> {
                setArr(response.data)

            })
    },[])


    return(
        <div>
            <h2>Order</h2>

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
                                </tr>


                            )
                        })
                    }

                    </tbody>
                   <h5> Tax: {tax}<br/>
                        Delivery Charges:{delivery_charges}<br/>
                        Final Amount= {tax+total+delivery_charges} </h5><br/>
                </table>

            </div>
        </div>
    )
}
