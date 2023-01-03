import React from 'react'
import { AuthContext } from '../Context/loginSessionContext';
import './TechnicianComponents.css'
import { useState, useEffect, useContext, useRef} from 'react'
// import {FaEdit} from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
// import {FaPlus} from 'react-icons/fa';
import TechnicianComponentEdit from './TechnicianComponentEdit';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import TechnicianComponentAdd from './TechnicianComponentCreate';
import {axiosSetting} from '../Context/serverURLContext'


function TechnicianComponents() {
    // const [show, setShow] = useState(false);
    const [data, setData] = useState([])
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const childRef = useRef();

    const {loadUser, loadLecturer} = useContext(AuthContext);

    useEffect(() => {
        const searchDiv = document.querySelector('.search .search-bar');
        searchDiv.classList.remove("hidden")

        const load = async () => {
            const response = await axiosSetting.get('/component');
            const data = await response.data;
            setData(data);
        };


        load();
       
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
        // loadUser();
        // loadLecturer();
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
                            <h3>{item.name}</h3>    
                        </div>                    
                        <p>{(item.description.length > 25) ? 
                            (item.description.slice(0,(item.description.slice(0,25)).lastIndexOf(" ")) + "...") : 
                            item.description}</p>
                        <div className='product-des'>
                            <h5>Available: {item.available_amount}</h5>
                            <TechnicianComponentEdit id = {item._id} ref={childRef}/>               
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
                    childRef.current.reload();   
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
                { <><PaginatedItems itemsPerPage={10} /></>}
            </div>
        </div>
    )
}

export default TechnicianComponents