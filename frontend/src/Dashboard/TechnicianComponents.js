import React from 'react'
import './TechnicianComponents.css'
import axios from 'axios'
import { useState, useEffect} from 'react'
import {FaEdit} from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import {FaPlus} from 'react-icons/fa';
import TechnicianComponentEdit from './TechnicianComponentEdit';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TechnicianComponentAdd from './TechnicianComponentCreate';

// function TechnicianComponentsAdd(){
//     return(
//         <div className='compo-item'>
//             <button className='full-width-button'>
//                 <FaPlus size={70} />
//             </button>
//         </div>

//     );
// }



function TechnicianComponents() {
    const img1 = 'http://mlab.vn/image/data/Bai%20viet%20ky%20thuat/Arduino/bai%202%20Nhung%20dieu%20co%20ban/ArduinoUnoR3.jpg'
    const [show, setShow] = useState(false);
    const [data, setData] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const authAxios = axios.create({
        baseURL: 'http://localhost:4500/',
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
            sessionStorage.setItem('sname', auth.first_name + ' ' + auth.last_name)
            sessionStorage.setItem('email', auth.email)
            console.log("auth===============", auth)
        }

        const lecturer = async () => {
            const response = await authAxios.get('/account/lecturers')
            console.log(response.data)
            const lecturer = response.data
            sessionStorage.setItem('lname', JSON.stringify(lecturer))
            console.log("lecturer===============", lecturer)
        }

        load();
        check();
        lecturer();
       
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

    function Items({ currentItems }) {
        return (
            currentItems.map((item, index) =>
                
                // console.log('Itemsdafasdfasd====',item)
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
                            <TechnicianComponentEdit id = {item._id}/>               
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
            <TechnicianComponentAdd/>
               
                
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
                {/* <TechnicianComponentsAdd/> */}
                { <><PaginatedItems itemsPerPage={4} /></>}
            </div>
        </div>
    )
}

export default TechnicianComponents