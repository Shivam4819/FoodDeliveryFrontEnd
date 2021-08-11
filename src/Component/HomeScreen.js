import React,{useState,useEffect} from "react";
import axios from "axios";

export default function HomeScreen(props){
    const [arr,setArr]= useState([])


    function menu(id,name){
        console.log(id,name)
        props.history.push({
            pathname: '/menu',
            state: { hotel_id: id ,
                     hotel_name: name}
        })
    }
    useEffect(()=>{
        axios.get('http://localhost:8080/get')
            .then(response=> {
                setArr(response.data)
            })
    },[])



    return(
        <div>
            <h2>List of Restaurant</h2>

            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        arr.map(value => {
                            // console.log(value)
                            return (
                                <tr>
                                    <td>{value.name}</td>
                                    <td>{value.phone}</td>
                                    <td>{value.address}</td>
                                    <td><button className="btn btn-warning" onClick={()=>menu(value.id,value.name)}>View Menu</button></td>
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
