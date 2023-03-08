import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'


// Chrome extenstion to insert a button on page

function insertButton(){
  const btn = document.createElement('button')
 
}

let isOpenSaucedMember = false

async function handleClick(){

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab)
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: insertButton,
  });
}
function App() { 
useEffect (() => {
  fetch('https://api.opensauced.pizza/v1/users/heysujal')
  .then(res => res.json())
  .then(data => console.log(data))

 

}, [])



  return (
    <div className="App">
      <header className="App-header">
       <h3>Welcome to OpenSauced Craftwork Browser Extension</h3>
        <p>OpenSauced is a community of open source contributors </p>
{  isOpenSaucedMember && <p>Hurray, you are a OpenSauced Member</p>}
{  !isOpenSaucedMember &&  <p>You are a OpenSauced Member. Why not become one ?</p>
  
  }
{  !isOpenSaucedMember &&   <a href="https://insights.opensauced.pizza/"><button onClick={handleClick} className="signup-btn">Sign Up</button></a> }
   
 
      </header>
  

    </div>
  )
}

export default App
