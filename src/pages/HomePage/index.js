import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Helmet from 'react-helmet'
import { Modal } from "../../components/Modal";

class HomePage extends Component {
    constructor(){
        super()

        this.state = {
            novoTweet: '',
            tweets: [],
            tweetAtivoNoModal: {},
        }

        this.alteraEstado = this.alteraEstado.bind(this)//so quando usa setState quando tem que usar o this
    }

    componentDidMount() {
        fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
        .then(response => response.json())
        .then((tweets) => {
            this.setState({
                tweets
            })
        })
    }

    hasTwittes = () => {
        let retorno = this.state.tweets.map( (tweet) => {
            //return <Tweet conteudo={tweet.conteudo} usuario={tweet.usuario} key={tweet._id} />})
            return <Tweet
            key={tweet._id}
            id={tweet._id}
            texto={tweet.conteudo}
            usuario={tweet.usuario}
            likeado={tweet.likeado}
            totalLikes={tweet.totalLikes}
            removivel={tweet.removivel}
            onClickNaAreaDeConteudo={() => this.abreModal(tweet)}
            removeHandler={() => this.removeTweet(tweet._id)} />
        })

        if(this.state.tweets.length === 0){
            retorno =  <article>
                <p>Você ainda não efetuou nenhum twitte, que tal twitter algo!</p>
            </article>
        }

        return retorno;
    }

    ehValido(){
        return this.state.novoTweet.length > 0 && this.state.novoTweet.length <= 140
    }

    alteraEstado(evento) {
        console.log('Entramos no alterarEstado')
        const novoTexto = evento.target.value
        console.log(novoTexto)

        console.log(this.ehValido())

        this.setState({
            novoTweet: novoTexto
        })
    }

    /*adicionaTweet = (evento) => {
        evento.preventDefault();
        this.setState({
            tweets: [this.state.novoTweet, ...this.state.tweets], //adiciona ao que já existe
            novoTweet: ''
        });
    }*/

    adicionaTweet = (infosDoEvento) => {
        infosDoEvento.preventDefault()
        if(this.state.novoTweet.length > 0) {
            fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
                method: 'POST',
                headers: {
                'Content-type': 'application/json'
                },
                body: JSON.stringify({ conteudo: this.state.novoTweet })
            })
            .then((respostaDoServer) => {
                return respostaDoServer.json()
            })
            .then((tweetVindoDoServidor) => {
                console.log(tweetVindoDoServidor)
                this.setState({
                    tweets: [tweetVindoDoServidor, ...this.state.tweets]
                })
            })
        }
    }

    removeTweet(idTweetQueVaiSerRemovido) {
        console.log(idTweetQueVaiSerRemovido)
        fetch(`https://twitelum-api.herokuapp.com/tweets/${idTweetQueVaiSerRemovido}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, { method: 'DELETE',})
            .then((data) => data.json())
            .then((response) => {
                console.log(response)
                const listaDeTweetsAtualizada = this.state.tweets.filter( (tweet) => tweet._id !== idTweetQueVaiSerRemovido )
                
                this.setState({
                    tweets: listaDeTweetsAtualizada
                })
            })
    }

    abreModal = tweetQueVaiProModal => {
        this.setState({
            tweetAtivoNoModal: tweetQueVaiProModal
        },() => {
            console.log(this.state.tweetAtivoNoModal);
        });
    };

    fechaModal = () => this.setState({ tweetAtivoNoModal: {} });

    renderTweets = (tweets) => {
        if (tweets.length > 0) {
          return tweets.map((tweetInfo) => {
            return <Tweet
              texto={tweetInfo.conteudo}
              key={tweetInfo._id}
              usuario={tweetInfo.usuario}
              id={tweetInfo._id}
              likeado={tweetInfo.likeado}
              totalLikes={tweetInfo.totalLikes}
              removivel={tweetInfo.removivel}
              removeHandler={(event) => this.removeTweet(tweetInfo._id)}
              onClickNaAreaDeConteudo={() => this.abreModal(tweetInfo._id)}
              likeHandler={() => this.likeHandler(tweetInfo._id)}
            />
          })
        }
        else {
          return <h3>Crie um novo tweet!</h3>
        }
      }

  render() {
    console.log(this.state)
    return (
      <Fragment>
        <Helmet>
          <title>
            Twitelum - ({`${this.state.tweets.length}`})
          </title>
        </Helmet>
        <Cabecalho>
            <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form onSubmit={this.adicionaTweet} className="novoTweet">
                        <div className="novoTweet__editorArea">
                            <span className={`novoTweet__status ${this.state.novoTweet.length > 140? 'novoTweet__status--invalido': ''}`}>
                                {this.state.novoTweet.length}/140
                            </span>
                            <textarea value={this.state.novoTweet} onChange={this.alteraEstado} className="novoTweet__editor" placeholder="O que está acontecendo?"></textarea>
                        </div>
                        <button disabled={!this.ehValido()} type="submit" className="novoTweet__envia">Tweetar</button>
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                        {
                            this.hasTwittes()
                        }
                    </div>
                </Widget>
            </Dashboard>
        </div>

        <Modal
          isAberto={Boolean(this.state.tweetAtivoNoModal._id)}
          onFechando={this.fechaModal}
        >
          {() => (
            this.renderTweets([this.state.tweetAtivoNoModal])
          )}
        </Modal>
      </Fragment>
    );
  }
}

export default HomePage;
