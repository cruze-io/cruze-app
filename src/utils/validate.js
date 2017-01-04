/**
 * validate.js - Validation of schemas
 * Validate:
 * Email
 * Username
 * Password
 * Phone number
 */

export const EMAIL = (email) => {
  const RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (email && email.length && RE.test(email));    
};

export const PASSWORD = (password) => (password && password.length > 5);

export const PHONE_NUMBER = (phoneNumber) => {
  const RE = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
  return (phoneNumber && phoneNumber.length && RE.test(phoneNumber));  
};

export const FULL_NAME = (fullName) => {
  const lowerCaseFullName = fullName ? fullName.toLowerCase() : "";
  console.log(lowerCaseFullName);
  const RE = /^[a-z\.0-9 ]+$/;
  return (lowerCaseFullName && lowerCaseFullName.length && RE.test(lowerCaseFullName));  
};

export const USERNAME = (username) => {
  // const url = 'http://192.168.0.102:3000/api/account/validateUsername';
  const url = 'https://intense-fjord-18642.herokuapp.com/api/account/validateUsername';
  const data = { username: username };
  const RE = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
  if (RE.test(username)) {
    const validatingUsername = fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((jsonString) => jsonString.json())
    .then((response) => {
      return response.isValid
    });
    return validatingUsername; 
  } else {
    return false;
  }
};

export const Validate = {
    email: EMAIL,
    password: PASSWORD,
    phone: PHONE_NUMBER,
    fullName: FULL_NAME,
    username: USERNAME,
}