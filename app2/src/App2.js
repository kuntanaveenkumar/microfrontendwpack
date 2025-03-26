import React, { Suspense, useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-dom";
// import { sendMessage, listenMessage } from "mainapp/EventBus";
import eventBus from "mainapp/EventBus";
const App2 = () => {
  const [installations, setInstallations] = useState("")
  const [guideid, setGuideId] = useState("")
  const handleClick = () => {
    //sendMessage("USER_UPDATED", { name: "Alice", age: 25 });
    eventBus.emit("USER_UPDATED", { name: "Alice", age: 25 })
    console.log("emitted")
  };
  //  const handleDropdown = (e) => {
  //    sendMessage("DROPDOWN_CHANGED", e.target.value);
  //  }
  useEffect(() => {
    //  const subscription = listenMessage("GUIDE_ID", (data) => {
    //    setGuideId(data);
    //  });
    fetch(`http://localhost:4002/installations?guideid=${guideid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInstallations(data);
      })
      .catch((error) => console.error('Error fetching installations:', error));

    //  return () => {
    //    subscription.unsubscribe();

    //  }

  }, [guideid])
  return (
    <div>
      <h6 >App 2</h6>
      {/* <button onClick={handleClick}>Update User</button> */}
      {
        installations && installations.map((item) => {
          return <><div key={item.id}>{item.installation_name}<br /></div></>

        })
      }
      {/* <select name="dropDown" onChange={handleDropdown}>
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
       </select> */}
    </div>
  )
};

export default App2;
