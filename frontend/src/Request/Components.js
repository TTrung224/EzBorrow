import {useContext} from 'react'
import {AuthContext} from '../Context/loginSessionContext'
import CompoRequest from './CompoRequest';
// import UserComponents from './UserComponents';
import TechnicianComponents from './TechnicianComponents';

function Components(props) {
  const {authState} = useContext(AuthContext)
  console.log("list auth ==== ", authState);
    // console.log(auth.type);

  if(authState.user.type === "lecturer" || authState.user.type === "student") {
    // return <UserComponents/>
    return <CompoRequest/>
  } else if (authState.user.type === "technician") 
    return <TechnicianComponents/>
  else return <div>ERROR</div>
}

export default Components
