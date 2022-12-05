import React from 'react'
import './CompoRequest.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie';

function CompoRequest() {
    const img1 = 'http://mlab.vn/image/data/Bai%20viet%20ky%20thuat/Arduino/bai%202%20Nhung%20dieu%20co%20ban/ArduinoUnoR3.jpg'
    const number = 1
    const [token, setToken] = useState()
    const [cookies] = useCookies(['cookie-name']);
    useEffect(() => {
        const auth = localStorage.getItem('token');
        const myCookie = cookies.token;
        if (auth) 
        {
            setToken(auth);
        }

        const authAxios = axios.create({
            baseURL: 'http://localhost:4000/component/',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${auth}`,
                //Cookie: {myCookie}
            }
        }) 
    
        const load = () => {
            console.log('token:' + auth)
            console.log('cookies: ' + myCookie)
            authAxios.get()
            .then(res => console.log(res))
        }
    
        load();
    }, []);


    return (
        <div className='compo-container'>
            <div className='compo-item'>
                <div className='compo-img'>
                    <img src={img1} width="70%"></img>
                </div>
                
                <div className='product-inf'>
                    <div className='product-namee'>
                        <h3>Arduino</h3>    
                    </div>                    
                    <p>Lorem Ipum</p>
                    <div className='product-des'>
                        <h5>Available: {number}</h5>  
                        <a href='#'> + </a>
                    </div>
                    
                </div>
        

            </div>
            <div className='compo-item'>
                <div className='compo-img'>
                    <img src={img1} width="70%"></img>
                </div>
                
                <div className='product-inf'>
                    <div className='product-namee'>
                        <h3>Arduino</h3>    
                    </div>                   
                        <p>Lorem Ipum</p>
                    <div className='product-des'>
                        <h5>Available: {number}</h5>  
                        <a href='#'> + </a>
                    </div>
                    
                </div>
        

            </div>

            <div className='compo-item'>
                <div className='compo-img'>
                    <img src={img1} width="70%"></img>
                </div>
                
                <div className='product-inf'>
                    <div className='product-namee'>
                        <h3>Arduino</h3>    
                    </div>                   
                        <p>Lorem Ipum</p>
                    <div className='product-des'>
                        <h5>Available: {number}</h5>  
                        <a href='#'> + </a>
                    </div>
                    
                </div>
        

            </div>
        </div>
    )
}

export default CompoRequest