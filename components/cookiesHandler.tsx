import React, { useState, useEffect } from "react";

function DisplayCookie() {
  const [cookieValue, setCookieValue] = useState("");

  useEffect(() => {
    const cookie = document.cookie.split(";").find((cookie) => {
      return cookie.trim().startsWith("spock_request=");
    });

    if (cookie) {
      const value = cookie.split("=")[1];
      setCookieValue(value);
    }
  }, []);

  return <div>{cookieValue}</div>;
}

export default DisplayCookie;
