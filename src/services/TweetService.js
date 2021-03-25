export const TweetService = {
  adiciona(conteudo) {
    const URL = `https://twitelum-api-alessandro.herokuapp.com//tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`
    const objeto = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ conteudo })
    }
    return fetch(URL, objeto)
      .then((respostaDoServer) => {
        return respostaDoServer.json()
      })
  },

  busca() {
    const URL = `https://twitelum-api-alessandro.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`
    return fetch(URL)
      .then(response => response.json())
  },

  like(idDoTweet) {
    const URL = `http://twitelum-api.herokuapp.com/tweets/${idDoTweet}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`
    return fetch(URL, { method: 'POST' })
      .then(response => response.json())
  },

  remove(idDoTweet) {
    const URL = `https://twitelum-api-alessandro.herokuapp.com//tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`
    return fetch(URL, { method: 'DELETE' })
    .then((data) => data.json())
  }
}