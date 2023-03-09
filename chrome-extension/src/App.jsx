import { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

let isOpenSaucedMember = false;
async function handleLoad(){

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // console.log(tab)
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function:  insertButton,
  });
  
}


  function insertButton(){
   
 
  let url = window.location.href;
 
  let username = url.split('/').pop();
  // console.log(username)

  let doesButtonExists = document.body.querySelector(".openSaucedProfileButton");
  if(doesButtonExists){
    return;
  }
    
  fetch('https://api.opensauced.pizza/v1/users/' + username)
  .then(res => res.json())
  .then((data) => {
    // console.log(data);
    // if user exists in opensauced database then add a button on github profile page
    if(data.is_open_sauced_member){
      isOpenSaucedMember = true
      let openSaucedProfileButton = document.createElement('button');
      openSaucedProfileButton.innerHTML = 'View on OpenSauced';
      openSaucedProfileButton.className = 'openSaucedProfileButton';
      openSaucedProfileButton.style = 'width: 100%; background-color: orange; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 10px; cursor: pointer; font-size: 16px; font-weight: 500;';
      openSaucedProfileButton.onclick = function(){
        window.open('https://insights.opensauced.pizza/' + username);
      }

      document.body.querySelector(".vcard-username").appendChild(openSaucedProfileButton);
       

    }
  
  })
 
}
 
function App() { 
  useEffect(() => {
    handleLoad()
  }, [])
   return (
    <div className="App">
      <div className="App-header">
       <h3>Welcome to OpenSauced Craftwork Browser Extension</h3>
        <p>OpenSauced is a community of open source contributors </p>
{  isOpenSaucedMember && <p>Hurray, you are a OpenSauced Member</p>}
{  !isOpenSaucedMember &&  <p>You are not a OpenSauced Member. Why not become one ?</p>
  
  }
{  !isOpenSaucedMember && 

  <a href="https://insights.opensauced.pizza/"><button className="signup-btn">Sign Up</button></a>   }
      </div>
    </div>
  )
}

export default App
