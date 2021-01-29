import React, { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hooks'
import { useMessage } from '../../hooks/message.hook'

export const AuthPage = () => {
  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

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
        message(data.message)
      } catch(e) {}
    }

    const loginHandler = async () => {
      try {
        const data = await request ('/api/auth/login', 'POST', {...form})
        message(data.message)
      } catch(e) {}
    }
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Register</h1>
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
          </div>
        </div>
        <div className="card-action">
          <button
           className="btn yellow darken-4" 
           style={{marginRight: 10}}
           disabled={loading}
           onClick={loginHandler}
           >
             Вход
             </button>
          <button 
          className="btn grey lighten-1 black-text"
          disabled={loading}
          onClick={registerHandler}
          >
            Регистрация
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}