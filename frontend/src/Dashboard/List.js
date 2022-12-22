import {useState, useContext, useEffect} from 'react'
import './List.css'
import {AuthContext} from '../Context/loginSessionContext'
import TechnicianList from './TechicianList';
import TeacherList from './LecturerList';
import StudentList from './StudentList';

function List(props) {
  const {authState} = useContext(AuthContext)
  console.log("list auth ==== ", authState);
    // console.log(auth.type);

  if(authState.user.type === "lecturer") {
    return <TeacherList/>
  } else if (authState.user.type === "student"){
    return <StudentList/>
  } else if (authState.user.type === "technician") return <TechnicianList/>
  else return <div>ERROR</div>
}

export default List
