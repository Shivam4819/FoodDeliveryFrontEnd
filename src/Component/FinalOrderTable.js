import React, {useEffect, useState} from "react";
import axios from "axios";

export default function FinalOrderTable(props){
    const [arr,setArr]= useState([])
    const final=0;
    useEffect(()=>{
        axios.get('http://localhost:8080/finalorder')
            .then(response=> {console.log(response)
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
                </table>

            </div>
        </div>
    )
}
