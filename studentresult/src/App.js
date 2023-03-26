import React, { useState, useEffect } from 'react'

import './App.css'

import Tables from './Tables'


function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)

  //To display initial table with all no
   const [items, setItems] = useState([])

  useEffect(() => {
    fetch('http://localhost:3002/student/')
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result)
          console.log(result)
        },
        (error) => {
          setError(error)
        }
      )
  }, [])

  // User Login info
  const database = [
    {
      username: 'user1',
      password: 'pass1',
    },
    {
      username: 'user2',
      password: 'pass2',
    },
  ]

  const errors = {
    uname: 'invalid username',
    pass: 'invalid password',
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault()

    var { uname, pass } = document.forms[0]

    // Find user login info
    const userData = database.find((user) => user.username === uname.value)

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: 'pass', message: errors.pass })
      } else {
        setIsSubmitted(true)
      }
    } else {
      // Username not found
      setErrorMessages({ name: 'uname', message: errors.uname })
    }
  }

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className='error'>{errorMessages.message}</div>
    )

  // JSX code for login form
  const renderForm = (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label>Username </label>
          <input type='text' name='uname' required />
          {renderErrorMessage('uname')}
        </div>
        <div className='input-container'>
          <label>Password </label>
          <input type='password' name='pass' required />
          {renderErrorMessage('pass')}
        </div>
        <div className='button-container'>
          <input type='submit' />
        </div>
      </form>
    </div>
  )

  const signIn = <>Sign in</>

  const result = <>Display all student Result</>

  return (
    <div className='app'>
      <div className='login-form'>
        <div className='title'>{isSubmitted ? result : signIn}</div>
        {isSubmitted ? (
          <div>
            {error ? (
              <div>Error: {error.message}</div>
            ) : (
              <Tables items={items}></Tables>
                // <Tables />
            )}
          </div>
        ) : (
          renderForm
        )}
      </div>
    </div>
  )
}

export default App
