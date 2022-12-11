import React from 'react';
import axios from 'axios'

export function requestBtnHandler(type, id) {
    // const [error, setError] = React.useState("")

    var data = {
        type: type,
        id: id,
    } 

    axios.put('http://localhost:4500/request', data, {withCredentials: true})
    .then((res)=>{
        console.log("res:", res)
        if(res.status === 200){
            console.log("test")
            navigate("/dashboard", {replace: true});
        }
        if(res.status === 500) {
            console.log("Server error")
            setError("Server error")
        }
    })
}