import { useEffect, useState } from "react";
import React from "react";
import { sendMessage, listenMessage } from "mainapp/EventBus";
const installations = () => {
  const [installations, setInstallations] = useState("")
  const [guideid, setGuideId] = useState("")
  const handleClick = () => {
    sendMessage("USER_UPDATED", { name: "Alice", age: 25 });
  };
  const handleDropdown = (e) => {
    sendMessage("DROPDOWN_CHANGED", e.target.value);
  }
  useEffect(() => {
    const subscription = listenMessage("GUIDE_ID", (data) => {
      setGuideId(data);
    });
    fetch(`http://localhost:4000/installations?guideid=${guideid}`)
      .then((response) => response.json())
      .then((data) => {
        setInstallations(data);
      })
      .catch((error) => console.error('Error fetching installations:', error));
    return () => {
      subscription.unsubscribe();
    }
  }, [guideid])

  return (
    <div>
      <h6 >App 2</h6>
      <button onClick={handleClick}>Update User</button>
      {
        installations && installations.map((item) => {
          return <><br />{item.installation_name}<br /></>

        })
      }
      <select name="dropDown" onChange={handleDropdown}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>
  )
}

export default installations;

