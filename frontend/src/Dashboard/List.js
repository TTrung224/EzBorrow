import React from 'react'
import './List.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useState, useEffect} from 'react'
import { FaEnvelopeSquare } from 'react-icons/fa';
import TechnicianList from './TechicianList';
import TeacherList from './LecturerList';
import StudentList from './StudentList';

function List(props) {
    console.log("this is general list");
    const {auth} = props;
    console.log("list auth ==== ", auth);
    // console.log(auth.type);

  if(auth.type === "lecturer") {
    return <TeacherList/>
  } else if (auth.type === "student"){
    return <StudentList/>
  } else if (auth.type === "technician") return <TechnicianList/>
  else return <div>ERROR</div>
}

export default List
