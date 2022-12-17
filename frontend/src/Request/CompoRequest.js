import React from 'react'
import './CompoRequest.css'
import axios from 'axios'
import { useState, useEffect} from 'react'
import Request from './Request'
import {FaPlus} from 'react-icons/fa';


function CompoRequest() {
    const img1 = 'http://mlab.vn/image/data/Bai%20viet%20ky%20thuat/Arduino/bai%202%20Nhung%20dieu%20co%20ban/ArduinoUnoR3.jpg'
    const itemList = [];
  /**TEST CARTTTTTTT
   * NEEDDDDD TOOO CHANGEEEEE STRUCCCTTTTUREEEE
*/
    const currentItems = (sessionStorage.getItem('cart-items')) ? JSON.parse(sessionStorage.getItem('cart-items')) : []; 
    const [cartItems, setCartItems] = useState(currentItems);
    const [sum, setSum] = useState(((sessionStorage.getItem('cart-sum')) ? sessionStorage.getItem('cart-sum') : 0)*1);
    // console.log("sum=",sum)
    // console.log('000000000000000000000000000000000000000',cartItems)
    const onAdd = (Item) => {
        const exist = cartItems.find(x => x._id === Item._id);
        if(exist) {
            setCartItems(cartItems.map(x => x._id === Item._id ? {...exist, quantity: exist.quantity + 1} : x));
            setSum(sum + 1)
        } else {
            setCartItems([...cartItems, {...Item, quantity: 1}]);
            setSum(sum + 1)
        }
    };

    const onDesc = (Item) => {
        const exist = cartItems.find(x => x._id === Item._id);
        if(exist && exist.quantity !== 1) {
            setCartItems(cartItems.map(x => x._id === Item._id ? {...exist, quantity: exist.quantity - 1} : x));
            setSum(sum - 1);
        };
    }

    const onRemove = (Item) => {
        setCartItems(cartItems.filter((item) => item._id !== Item._id));
        if(sum > 0) {
            setSum(sum - Item.quantity)
        }
        // console.log("sum=",sum)
    }

    const removeAll = () => {
        // console.log("clearing cart")
        setCartItems([]);
        if(sum > 0) {
            setSum(0)
        }
    }

    useEffect(() =>{
        const updateSessionStorage = (cartItems) => {
            sessionStorage.setItem('cart-items', JSON.stringify(cartItems));
        }
        
        updateSessionStorage(cartItems);
    },[cartItems])

    useEffect(() =>{
        const updateSessionStorage = (sum) => {
            // console.log("summmm", sum)
            sessionStorage.setItem('cart-sum', sum);
        }
        
        updateSessionStorage(sum);
    },[sum])

    //END TEST -------------------------------------------------!>
    const [data, setData] = useState([])
    const authAxios = axios.create({
        baseURL: 'http://localhost:4000/',
        withCredentials: true
    })

    useEffect(() => {
        const searchDiv = document.querySelector('.search .search-bar');
        searchDiv.classList.remove("hidden")

        const load = async () => {
            const response = await authAxios.get('/component');
            const data = await response.data;
            console.log(data);
            console.log("load")
            setData(data);
        };

        const check = async () => {
            const response = await authAxios.get('/account/getAccount')
            console.log(response.data)
            const auth = response.data
            sessionStorage.setItem('fname', auth.first_name)
            sessionStorage.setItem('lname', auth.last_name)
            sessionStorage.setItem('email', auth.email)
            console.log("auth===============", auth)
        }

        load();
        check();
       
        const searchInput = document.getElementById("search-input");
        searchInput.value = "";
        searchInput.placeholder = "name keyword"
        const handleInputChange = async (event) => {
            if(searchInput.value != ""){
                const response = await authAxios.get('/component/search?name='+searchInput.value);
                const data = await response.data;
                console.log(data);
                setData(data);
            }else{
                load();
            }
        }
        searchInput.addEventListener("keyup", handleInputChange)

        return () => {
            searchInput.removeEventListener('keyup', handleInputChange);
        };

    },[]);


    // console.log('data2 ==== ', data)
      
  
    return (
        <div className='compo-container'>
            <div className='cards'>
            {(data.length===0) && <p style={{textAlign: "center", width: "100%"}}>There are no matched equipment</p>}
            {data.map((item, index) => {
                // console.log('Itemsdafasdfasd====',item)
                    return (
                    <div className='compo-item'>
                        <div className='compo-img'>
                            <img src={img1} width="120"></img>
                        </div>
                        <div className='product-inf'>
                            <div className='product-name'>
                                <h3>{item.name}</h3>    
                            </div>                    
                            <p>{(item.description.length > 25) ? 
                                (item.description.slice(0,(item.description.slice(0,25)).lastIndexOf(" ")) + "...") : 
                                item.description}</p>
                            <div className='product-des'>
                                <h5>Available: {item.available_amount}</h5>
                                <button disabled={item.available_amount <= 0} onClick={() => onAdd(item)}>
                                    <FaPlus/>                         
                                </button>                        
                            </div>
                        </div>
                    </div>
                    )
            }
            )}
            </div>
            <Request cartItems={cartItems} onAdd={onAdd} onDesc={onDesc} onRemove={onRemove} sum={sum} removeAll={removeAll} />  
        </div>
        
    )
}

export default CompoRequest