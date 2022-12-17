import React from 'react';
import axios from 'axios'

export function requestBtnHandler(type, id) {
    
    var data = {
        type: type,
        id: id,
    } 

    axios.put('http://localhost:4000/request', data, {withCredentials: true})
    .then((res)=>{
        // console.log("res:", res)
        // if(res.status === 200){
        //     console.log("test");
        // }
        if(res.status === 500) {
            console.log("Server error");
            // setError("Server error");
        }
        window.location.reload(false);
    })
}