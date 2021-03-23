import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import { LoginService } from '../../services/LoginService'
import Widget from '../../components/Widget'
import { NotificacaoContext } from '../../contexts/NotificacaoContext'

import './loginPage.css'
import { FormManager } from '../../components/FormManager'

const InputFormField = ({ id, label, type, errors, touched, values, onChange, onBlur }) => {
    const isTouched = Boolean(touched[id]);
    const hasErrors = Boolean(errors[id]);
    return (
        <div className="loginPage__inputWrap">
            <label className="loginPage__label" htmlFor={id}>
                {label}
            </label>
            <input
                className="loginPage__input"
                type={type}
                id={id}
                name={id}
                value={values[id]}
                onChange={onChange}
                onBlur={onBlur}
            />
            <p style={{ color: "red" }}>{isTouched && hasErrors && errors[id]}</p>
        </div>
    );
};

class LoginPage extends Component {
    static contextType = NotificacaoContext;

    constructor() {
        super()
        this.state = {
            values: {
                inputLogin: "",
                inputSenha: ""
            },
            errors: {}
        }
    }

    onFormFieldChange = ({ target }) => {
        const value = target.value;
        const name = target.name;
        const values = { ...this.state.values, [name]: value }
        this.setState({ values }, () => {
            this.formValidations();
        })
    }

    formValidations = () => {
        const { inputLogin, inputSenha } = this.state.values
        const errors = {}

        if (!inputLogin) errors.inputLogin = "Esse campo é obrigatório"
        if (!inputSenha) errors.inputSenha = "Esse campo é obrigatório"

        this.setState({ errors })
    };

    fazLogin = (evento, values) => {
        evento.preventDefault()

        const dadosDeLogin = {
            login: values.inputLogin,
            senha: values.inputSenha
        }

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
                            <FormManager
                                initialValues={{ inputLogin: "", inputSenha: "" }}
                                onFormValidation={values => {
                                    const errors = {};

                                    if (!values.inputLogin)
                                        errors.inputLogin = "Esse campo é obrigatório";

                                    if (!values.inputSenha)
                                        errors.inputSenha = "Esse campo é obrigatório";

                                    return errors;
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    onFormFieldChange,
                                    onFormFieldBlur
                                }) => (
                                        <form
                                            className="loginPage__form"
                                            action="/"
                                            onSubmit={(event) => this.fazLogin(event, values)}>
                                            <InputFormField
                                                id="inputLogin"
                                                label="Login: "
                                                type="text"
                                                onChange={onFormFieldChange}
                                                onBlur={onFormFieldBlur}
                                                values={values}
                                                errors={errors}
                                                touched={touched}
                                            />

                                            <InputFormField
                                                id="inputSenha"
                                                label="Senha: "
                                                type="password"
                                                onChange={onFormFieldChange}
                                                onBlur={onFormFieldBlur}
                                                values={values}
                                                errors={errors}
                                                touched={touched}
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
                                    )}
                            </FormManager>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default LoginPage