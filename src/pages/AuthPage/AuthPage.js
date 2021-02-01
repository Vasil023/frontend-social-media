import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hooks'
import { useMessage } from '../../hooks/message.hook'
import M from 'materialize-css'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: '', name: '', nickName: ''
  })
  
  useEffect(() => {
    let tabs = document.querySelectorAll(".tabs");
    M.Tabs.init(tabs);
  });

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

    const registerHandler = async () => {
      try {
        const data = await request ('/api/auth/register', 'POST', {...form})
        console.log(data)
        message(data.message)
      } catch(e) {}
    }

    const loginHandler = async () => {
      try {
        const data = await request ('/api/auth/login', 'POST', {...form})
        auth.login(data.token, data.userId)
      } catch(e) {}
    }
  return (
    <div className="row">
    <div className="col s12">
      <ul className="tabs">
        <li className="tab col s6"><a href="#login">Войти</a></li>

        <li className="tab col s6"><a href="#register">Регистрация</a></li>
      </ul>
    </div>

  <div id="login" className="col s6 offset-s3">
    <div className="card blue-grey darken-1">
      <div className="card-content white-text">
        <span className="card-title">Авторизация</span>
        <div>
          <div className="input-field">
            <input
            placeholder="Введите email"
            id="email"
            type="text"
            className="validate"
            name="email"
            onChange={changeHandler}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-field">
            <input
            placeholder="Введите пароль"
            id="password"
            type="password"
            className="validate"
            name="password"
            onChange={changeHandler}
            />
            <label htmlFor="password">Email</label>
          </div>
          <button
           className="btn yellow darken-4" 
           style={{marginRight: 10}}
           disabled={loading}
           onClick={loginHandler}
           >
             Вход
             </button>
          </div>
      </div>
    </div>
  </div>

  <div id="register" className="col s6 offset-s3">
  <div className="input-field">
      <input
      placeholder="Введите имя"
      id="rname"
      type="text"
      className="validate"
      name="name"
      onChange={changeHandler}
      />
      <label htmlFor="email">Введите имя</label>
    </div>

    <div className="input-field">
      <input
      placeholder="Введите Nick Name"
      id="rnickName"
      type="text"
      className="validate"
      name="nickName"
      onChange={changeHandler}
      />
      <label htmlFor="email">Введите Nick Name</label>
    </div>

    <div className="input-field">
      <input
      placeholder="Введите email"
      id="remail"
      type="text"
      className="validate"
      name="email"
      onChange={changeHandler}
      />
      <label htmlFor="email">Email</label>
    </div>

    <div className="input-field">
      <input
      placeholder="Введите пароль"
      id="rpassword"
      type="text"
      className="validate"
      name="password"
      onChange={changeHandler}
      />
      <label htmlFor="email">Введите пароль</label>
    </div>
      <button 
        className="btn grey lighten-1 black-text"
        disabled={loading}
        onClick={registerHandler}
        >
          Регистрация
      </button>
  </div>
  </div>
  )
}