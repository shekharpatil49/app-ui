import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      const body = {
        firstName: formData.firstName,
        email: formData.email,
        password: formData.password
      }

      const url = "http://localhost:4000/user";
      fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(body)
      }).then(response => response.json())
      .then(body => console(body))
      .catch(error =>console.log(error.message))

  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='firstName'
          placeholder='First Name'
          value={formData.firstName}
          onChange={handleChange}>
        </input><br/><br/>
        <input
          type='text'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}>
        </input><br/><br/>

        <input
          type='text'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}>
        </input><br/><br/>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default App
