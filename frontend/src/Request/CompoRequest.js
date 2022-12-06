import React from 'react'
import './CompoRequest.css'
import axios from 'axios'
import { useState, useEffect} from 'react'
import Request from './Request'


function CompoRequest() {
    const img1 = 'http://mlab.vn/image/data/Bai%20viet%20ky%20thuat/Arduino/bai%202%20Nhung%20dieu%20co%20ban/ArduinoUnoR3.jpg'
    const number = 1

    const [ data, setData] = useState([])

    const authAxios = axios.create({
        baseURL: 'http://localhost:4500/',
        withCredentials: true
    })

    useEffect(() => {
        const load = async () => {
            const response = await authAxios.get('/component');
            const data = await response.data;
            console.log(data);
            setData(data);
        };
            load();
    },[]);


    console.log('data2: ', data)

      
  
    return (
        <div className='compo-container'>
            {data.map((item) => 
                <div className='compo-item'>
                    <div className='compo-img'>
                        <img src={img1} width="120"></img>
                    </div>
                    <div className='product-inf'>
                        <div className='product-namee'>
                            <h3>{item.name}</h3>    
                        </div>                    
                        <p>{item.description}</p>
                        <div className='product-des'>
                            <h5>Available: {item.available_amount}</h5>  
                            <a href='#'> + </a>
                        </div>
                    </div>
                </div>
            )}
            <Request/>   
        </div>
        
    )
}

export default CompoRequest