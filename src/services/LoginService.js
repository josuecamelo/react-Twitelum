export const LoginService = {
    fazerLogin({ login, senha }) {
      const URL = "https://twitelum-api.herokuapp.com/login"
      const objeto = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ login, senha })
      }
  
      return fetch(URL, objeto)
        .then(async (responseDoServer) => {
          if (!responseDoServer.ok) {
            const respostaDeErroDoServidor = await responseDoServer.json();
            const errorObj = Error(respostaDeErroDoServidor.message)
            errorObj.status = responseDoServer.status
            throw errorObj
          }
          return responseDoServer.json()
        })
        .then((dadosDoServidorEmObj => {
          const token = dadosDoServidorEmObj.token
          if (token) {
            localStorage.setItem("TOKEN", token)
            return
          } else {
            throw new Error("Token not found")
          }
        }))
    }
  }