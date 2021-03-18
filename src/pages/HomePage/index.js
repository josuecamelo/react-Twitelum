import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

class HomePage extends Component {
    constructor(){
        super()

        this.state = {
            novoTweet: '',
            tweets: []
        }

        this.alteraEstado = this.alteraEstado.bind(this)//so quando usa setState quando tem que usar o this
    }

    hasTwittes = () => {
        let retorno = this.state.tweets.map( (tweet, idx) => {
            return <Tweet conteudo={tweet} key={`Chave_${idx}`} />})

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

    adicionaTweet = (evento) => {
        evento.preventDefault();
        this.setState({
            tweets: [this.state.novoTweet, ...this.state.tweets], //adiciona ao que já existe
            novoTweet: ''
        });
    }

  render() {
    console.log(this.state)
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default HomePage;
