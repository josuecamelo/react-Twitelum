const TWEETS_URL = "https://twitelum-api.herokuapp.com/tweets/";

export const TweetService = {
    carrega: () => {
        return fetch(`${TWEETS_URL}?X-AUTH-TOKEN=${localStorage.getItem("TOKEN")}`)
          .then(response => response.json())
    },

    remove: (idDoTweet) => {
        return fetch( `${TWEETS_URL}${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, { method: 'DELETE' })
        .then((data) => data.json())
    },

    adiciona(conteudo) {
        const URL = `${TWEETS_URL}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`
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

    like(idDoTweet) {
        const URL = `${TWEETS_URL}${idDoTweet}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`
        return fetch(URL, { method: 'POST' })
          .then(response => response.json())
    },
  }