import {useContext, useEffect} from 'react'
import {AuthContext} from '../Context/loginSessionContext'
// import CompoRequest from './CompoRequest';
import UserComponents from './UserComponents';
import TechnicianComponents from './TechnicianComponents';
import {cookie} from './serverURLContext'

function Components(props) {

  const [cookieState, setCookieState] = useState(cookie);

  useEffect(() =>  {
    if(cookieState==undefined){
      setCookieState("set");
      window.location.reload(false);
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
