import {useState, useEffect} from 'react';

import './style.css'
import List from './List';
import Form from './Form';

function Contacts() {
  const [contacts, setContacts] = useState([
    {
      fullname: "Furkan",
      phone_number: 1234,
    },
    {
      fullname: "Fatma",
      phone_number: 5678,
    },
    {
      fullname: "Ali",
      phone_number: 9514,
    },{
      fullname:"Fatih",
      phone_number:532
    }
  ]);

  useEffect(() => {
    console.log(contacts);
  },[contacts])

  return (
      <div id='container'>
        <h1>Contacts</h1>
          <List contacts = {contacts}/>
          <Form addContact = {setContacts} contacts = {contacts}/>
      </div>
  )
}

export default Contacts;