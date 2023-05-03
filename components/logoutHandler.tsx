import { get } from "http";
import React from "react";
import { useCookies } from "react-cookie";

function LogOut() {

  function removeSpockRequestCookie() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      chrome.cookies.remove({
        url: currentTab.url,
        name: "spock_request_cookie"
      }, function (details) {
        console.log("Cookie removed:", details);
      });
    });
  }

  const handleLogOut = () => {
    removeSpockRequestCookie();
    console.log("Logged out");
  };

  return (
    <button onClick={handleLogOut}>
      Log Out
    </button>
  );
}

export default LogOut;
