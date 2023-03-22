import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


let isOpenSaucedMember = false;
async function handleLoad() {

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: insertButton,
  });

} 
function insertButton() {


  let url = window.location.href;

  let username = url.split('/').pop();


  let doesButtonExists = document.body.querySelector(".openSaucedProfileButton");
  if (doesButtonExists) {
    return;
  }

  fetch('https://api.opensauced.pizza/v1/users/' + username)
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      // if user exists in opensauced database then add a button on github profile page
      if (data.is_open_sauced_member) {
        isOpenSaucedMember = true
        let openSaucedProfileButton = document.createElement('button');
        let interests = document.createElement('p');
        interests.innerHTML = `<strong> Interests </strong>: ${data.interests}`;
        openSaucedProfileButton.innerHTML = 'View on OpenSauced';
        openSaucedProfileButton.className = 'openSaucedProfileButton';
        openSaucedProfileButton.style = 'width: 100%; background: linear-gradient(-60deg, #ff5858 0%, #f09819 100%); color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 10px; cursor: pointer; font-size: 16px; font-weight: 500;';
        openSaucedProfileButton.onclick = function () {
          window.open('https://insights.opensauced.pizza/' + username);
        }

        document.body.querySelector(".vcard-username").appendChild(openSaucedProfileButton);
        document.body.querySelector(".js-profile-editable-area .user-profile-bio").appendChild(interests);

      }else{
        let openSaucedInviteButton = document.createElement('button');
        openSaucedInviteButton.innerHTML = `Invite @${username} to OpenSauced`;
        openSaucedInviteButton.className = 'openSaucedInviteButton';
        openSaucedInviteButton.style = 'width: 100%; background: linear-gradient(-60deg, #ff5858 0%, #f09819 100%); color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 10px; cursor: pointer; font-size: 16px; font-weight: 500;';
        openSaucedInviteButton.onclick = function () {
          window.open('https://insights.opensauced.pizza/' + username);
        }

        document.body.querySelector(".vcard-username").appendChild(openSaucedInviteButton);
       
      }

    })

}
handleLoad();
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
