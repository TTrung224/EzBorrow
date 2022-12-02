import React from 'react'
import './CompoRequest.css'

function CompoRequest() {
    const img1 = 'http://mlab.vn/image/data/Bai%20viet%20ky%20thuat/Arduino/bai%202%20Nhung%20dieu%20co%20ban/ArduinoUnoR3.jpg'
    const number = 1
    
    return (
        <div className='compo-container'>
            <div className='compo-item'>
                <div className='compo-img'>
                    <img src={img1} width="120"></img>
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
                    <img src={img1} width="120"></img>
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

            {/* <div className='compo-item'>
                <div className='compo-img'>
                    <img src={img1} width="120"></img>
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
        

            </div> */}
        </div>
    )
}

export default CompoRequest