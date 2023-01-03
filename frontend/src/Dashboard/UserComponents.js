import React from 'react'
import './UserComponents.css'
// import axios from 'axios'
import {axiosSetting} from '../Context/serverURLContext'
import {AuthContext} from '../Context/loginSessionContext'
import { useState, useEffect, useContext} from 'react'
import Cart from './Cart'
import {FaPlus} from 'react-icons/fa';
import ReactPaginate from 'react-paginate';


function UserComponents() {
  /**TEST CARTTTTTTT
   * NEEDDDDD TOOO CHANGEEEEE STRUCCCTTTTUREEEE
*/
    const currentItems = (sessionStorage.getItem('cart-items')) ? JSON.parse(sessionStorage.getItem('cart-items')) : []; 
    const [cartItems, setCartItems] = useState(currentItems);
    const [sum, setSum] = useState(((sessionStorage.getItem('cart-sum')) ? sessionStorage.getItem('cart-sum') : 0)*1);
    

    const {loadUser, loadLecturer, ignored} = useContext(AuthContext);


    //add quantity
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

    //desc quantity
    const onDesc = (Item) => {
        const exist = cartItems.find(x => x._id === Item._id);
        if(exist && exist.quantity !== 1) {
            setCartItems(cartItems.map(x => x._id === Item._id ? {...exist, quantity: exist.quantity - 1} : x));
            setSum(sum - 1);
        };
    }

    //rmv component from cart
    const onRemove = (Item) => {
        setCartItems(cartItems.filter((item) => item._id !== Item._id));
        if(sum > 0) {
            setSum(sum - Item.quantity)
        }
        // console.log("sum=",sum)
    }

    //rmv all component from cart
    const removeAll = () => {
        // console.log("clearing cart")
        setCartItems([]);
        if(sum > 0) {
            setSum(0)
        }
    }

    //this is for debugging
    useEffect(() =>{
        const sth = () => {
            console.log("this is dashboard");
        }
        sth()
    },[])

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

    useEffect(() => {
        const searchDiv = document.querySelector('.search .search-bar');
        searchDiv.classList.remove("hidden")

        const load = async () => {
            const response = await axiosSetting.get('/component');
            const data = await response.data;
            console.log(data);
            console.log("load")
            setData(data);
        };
        const lecturer = async () => {
            const response = await axiosSetting.get('/account/lecturers')
            console.log(response.data)
            const lecturer = response.data
            sessionStorage.setItem('lname', JSON.stringify(lecturer))
            console.log("lecturer===============", lecturer)
        }
        loadUser();
        // loadLecturer();
        load();
        lecturer();
       
        const searchInput = document.getElementById("search-input");
        searchInput.value = "";
        searchInput.placeholder = "name keyword"

        let timeout = null;
        const handleInputChange = (event) => {
            clearTimeout(timeout);

            timeout = setTimeout(async function(){
                if(searchInput.value !== ""){
                    const response = await axiosSetting.get('/component/search?name='+searchInput.value);
                    const data = await response.data;
                    console.log(data);
                    setData(data);
                }else{
                    load();
                }
            }, 200);
        }
        searchInput.addEventListener("keyup", handleInputChange)

        return () => {
            searchInput.removeEventListener('keyup', handleInputChange);
        };

    },[]);



    function Items({ currentItems }) {
        return (
            currentItems.map((item, index) =>
                // console.log('Itemsdafasdfasd====',item)
                <div className='compo-item'>
                    <div className='compo-img'>
                        <img src={item.img_src} alt={item.name}></img>
                    </div>
                    <div className='product-inf'>
                        <div className='product-name'>
                            <h3>{(item.name.length > 15)? (item.name.slice(0,15) + "..."): item.name}</h3>      
                        </div>                    
                        <p>{(item.description.length > 25) ? 
                            (item.description.slice(0,(item.description.slice(0,25)).lastIndexOf(" ")) + "...") : 
                            item.description}</p>
                        <div className='product-des'>
                            <h5>Available: {item.available_amount}</h5>
                            <button className='add-cart-btn' disabled={item.available_amount <= 0} onClick={() => onAdd(item)}>
                                <FaPlus/>                         
                            </button>                        
                        </div>
                    </div>
                </div>
            )
        );
      }

    // console.log('data2 ==== ', data)
      
    function PaginatedItems({ itemsPerPage }) {    
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;

        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const currentItems = data.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(data.length / itemsPerPage);
      
        const handlePageClick = (event) => {
          const newOffset = (event.selected * itemsPerPage) % data.length;
          console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
          );
          setItemOffset(newOffset);
        };
    
        return (
          <div className='cards-panigation'>
            <div className='cards'>
                <Items currentItems={currentItems} />
                {(data.length===0) && <p style={{textAlign: "center", width: "100%"}}>There are no matched equipment</p>}
            </div>
            <nav aria-label="Page navigation comments" className="pagination-container">
                <ReactPaginate
                    previousLabel="previous"
                    nextLabel="next"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageCount={pageCount}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName="pagination justify-content-center"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="page-active"
                    // eslint-disable-next-line no-unused-vars
                    hrefBuilder={(page, pageCount, selected) =>
                    page >= 1 && page <= pageCount ? `/page/${page}` : '#'
                    }
                    hrefAllControls
                    onClick={(clickEvent) => {
                    console.log('onClick', clickEvent);

                    }}
                />
            </nav>
          </div>
        );
    }

    return (
        <div className='dashboard'>
            <div className='compo-container'>
                { <><PaginatedItems itemsPerPage={10} /></>}
                <Cart cartItems={cartItems} onAdd={onAdd} onDesc={onDesc} onRemove={onRemove} sum={sum} removeAll={removeAll} />  
            </div>
        </div>
    )
}

export default UserComponents