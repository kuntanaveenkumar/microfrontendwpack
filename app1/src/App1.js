import React, { Suspense, useState, useEffect } from "react";
// import { listenMessage,sendMessage } from "mainapp/EventBus";
import ThreeScene from './ThreeScene';
import eventBus from "mainapp/EventBus";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Guides from './Guides'; 
const App1 = () => {
  const [user, setUser] = useState(null);
   const [guides, setGuides] = useState(null);
   const [guideid, setGuideid] = useState("");
   const [dropdown, setDropdown] = useState(null);
   const handleClick=(id)=>
   {
     setGuideid(id)   
     //sendMessage("GUIDE_ID", id);
   }
   eventBus.on('USER_UPDATED', (data) => {
    console.log("received")
    console.log(data)
    setUser(data);
  });
 
 useEffect(() => {
   fetch("http://localhost:4001/guides")
     .then((response) => response.json())
     .then((data) => {
       console.log(data);
       setGuides(data);
     })
     .catch((error) => console.error('Error fetching guides:', error));  

  //  const subscription = listenMessage("USER_UPDATED", (data) => {
  //    setUser(data);
  //  });
 
  //  const dropdownsubscription = listenMessage("DROPDOWN_CHANGED", (data) => {
  //    alert(data)
  //    setDropdown(data);
  //  });
 
  //  return () => {
  //    subscription.unsubscribe();
  //    dropdownsubscription.unsubscribe();
 
  //  }
 
 }, []);
 return (
   <div>
     <div >
       <h6>App1</h6>
       {
         guides && guides.map((item) => {
           return <div onClick={() => handleClick(item.id)} key={item.id}>{item.name}<br /></div>           
         })
       }
      
      </div>
    
    {/* <div>User: {user ? `${user.name}, ${user.age}` : "No user data"}</div>
     <div>Dropdown: {dropdown ? `${dropdown}` : "No user data"}</div> */}
   </div>)
};

export default App1;
