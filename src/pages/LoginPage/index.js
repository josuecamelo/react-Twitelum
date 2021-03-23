import React, { Component, Fragment } from 'react'

import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'
import { NotificacaoContext } from '../../contexts/NotificacaoContext'
import { LoginService } from '../../services/LoginService'

import './loginPage.css'

const InputFormField = ({ id, label, errors, values, onChange }) => {
    return (
        <div className="loginPage__inputWrap">
            <label className="loginPage__label" htmlFor={id}>
                {label}
            </label>
            <input
                className="loginPage__input"
                type="text"
                id={id}
                name={id}
                value={values[id]}
                onChange={onChange}
            />
            <p style={{ color: "red" }}>{errors[id] && errors[id]}</p>
        </div>
    );
};

class LoginPage extends Component {
    static contextType = NotificacaoContext
    constructor(){
        super();
        
        this.state = {
            values: {
                inputLogin: "",
                inputSenha: ""
            },
            errors: {}
        };
    }
    
   
    formValidations = () => {
        const { inputLogin, inputSenha } = this.state.values;
        const errors = {};
        if (!inputLogin) errors.inputLogin = "Esse campo é obrigatório";
        if (!inputSenha) errors.inputSenha = "Esse campo é obrigatório";
        this.setState({ errors });
    }

    onFormFieldChange = ({ target }) => {
        const value = target.value;
        const name = target.name;
        const values = { ...this.state.values, [name]: value };
        this.setState({ values }, () => {
            this.formValidations();
        });
    };

    fazerLogin = (evento) => {
        evento.preventDefault()
        //this.context.setMsg("Seja bem vindo ao Twitellum");
        //this.props.history.push('/')

        const dadosDeLogin = {
            login: this.state.values.inputLogin,
            senha: this.state.values.inputSenha
        };

        /*const URL = "https://twitelum-api.herokuapp.com/login"
        const objeto = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosDeLogin)
        }*/

        /*return fetch(URL, objeto)
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
            }))*/

        /*fetch(URL, objeto)
            .then(async (responseDoServer) => {
                if(!responseDoServer.ok){
                    const respostaDeErroDoServidor = await responseDoServer.json();
                    const errorObj = Error(respostaDeErroDoServidor.message)
                    errorObj.status = responseDoServer.status
                    throw errorObj
                }
                return responseDoServer.json()
            })
            .then( (dadosDoServidorEmObj =>{
                const token = dadosDoServidorEmObj.token
                if(token){
                    localStorage.setItem("TOKEN",token)
                    this.props.history.push('/')
                    this.context.setMsg("Bem vindo a Twitelum!!!");
                }
            }))
            .catch( (err) =>{
                console.error(`Erro ${err.status}.`,err.message)
                this.context.setMsg(err.message);
            })   */ 

            LoginService.fazerLogin(dadosDeLogin)
                .then(() => {
                    this.props.history.push('/')
                    this.context.setMsg("Bem vindo a Twitelum!!!");
                })
                .catch((err) => {
                    console.error(`Erro ${err.status}.`, err.message)
                    this.context.setMsg(err.message);
                })
    }

    render() {
        return (
            <Fragment>
                <Cabecalho />
                <div className="loginPage">
                    <div className="container">
                        <Widget>
                            <h2 className="loginPage__title">Seja bem vindo!</h2>
                            <form className="loginPage__form" action="/" onSubmit={this.fazerLogin}>
                            <InputFormField
                                id="inputLogin"
                                label="Login: "
                                onChange={this.onFormFieldChange}
                                values={this.state.values}
                                errors={this.state.errors}
                            />
                                                            
                            <InputFormField
                                id="inputSenha"
                                label="Senha: "
                                onChange={this.onFormFieldChange}
                                values={this.state.values}
                                errors={this.state.errors}
                            />

                                {/* <div className="loginPage__errorBox">
                                    Mensagem de erro!
                                </div> */}
                                <div className="loginPage__inputWrap">
                                    <button className="loginPage__btnLogin" type="submit">
                                        Logar
                                    </button>
                                </div>
                            </form>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default LoginPage