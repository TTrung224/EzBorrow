// import React from 'react';
import {axiosSetting} from '../Context/serverURLContext'


export function requestBtnHandler(type, id) {
    
    var data = {
        type: type,
        id: id,
    } 

    axiosSetting.put('request', data, {withCredentials: true})
    .then((res)=>{
        // console.log("res:", res)
        // if(res.status === 200){
        //     console.log("test");
        // }
        if(res.status === 500) {
            console.log("Server error");
        }
        window.location.reload(false);
    })
}