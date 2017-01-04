import {apiUrl} from '@config/api'

export const Auth = {

  signup(account) {
        const url = apiUrl + 'auth/emailRegister'
        const registerAccount = fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)

        })
        .then((response) => {
          return response
        })
        .then((jsonString) => jsonString.json())
        .then((response) => {
            return response
        })
        return registerAccount
  },

  signin(account) {

    const url = apiUrl + 'auth/emailLogin'

    const loginAccount = fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(account)
    })
    .then((jsonString) => jsonString.json())
    .then((response) => {
      return response
    })

    return loginAccount

    },
}
