import {useContext, useEffect, useState} from 'react'
import {AuthContext} from '../Context/loginSessionContext'
// import CompoRequest from './CompoRequest';
import UserComponents from './UserComponents';
import TechnicianComponents from './TechnicianComponents';
import {cookie} from '../Context/serverURLContext'
import Cookies from 'js-cookie'

function Components(props) {

  // const [cookieState, setCookieState] = useState(cookie);

  useEffect(() =>  {
    if(cookie!==Cookies.get("token")){
      window.location.reload()
    }
  }, [])

  const {authState} = useContext(AuthContext)
  console.log("list auth ==== ", authState);
    // console.log(auth.type);

  if(authState.user.type === "lecturer" || authState.user.type === "student") {
    return <UserComponents/>
  } else if (authState.user.type === "technician") 
    return <TechnicianComponents/>
  else return <div>ERROR</div>
}

export default Components
