import React from 'react'
import './CompoRequest.css'

function CompoRequest() {
    const img1 = 'http://mlab.vn/image/data/Bai%20viet%20ky%20thuat/Arduino/bai%202%20Nhung%20dieu%20co%20ban/ArduinoUnoR3.jpg'
    const number = 1
    
    return (
        <div className='compo-container'>
            <div className='compo-item'>
                <img src={img1} width='100'></img>
                <div>
                    <h4>Arduino</h4>
                    <p>Lorem Ipum</p>
                    <p>Number: {number}</p>
                </div>
            </div>
            <div className='compo-item'>
                <img src={img1} width='100'></img>
                <div>
                    <h4>Arduino</h4>
                    <p>Lorem Ipum</p>
                    <p>Number: {number}</p>
                </div>
            </div>
        </div>
    )
}

export default CompoRequest