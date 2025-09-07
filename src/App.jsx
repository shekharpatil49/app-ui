import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const [users, setUsers] = useState([]);

  const [userId, setUserId] = useState(null);

  const getAllUser = async () => {
    try {
      const url = "http://localhost:4000/users"
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(body => setUsers(body))
        .catch(err => { console.log(err) });
    } catch (err) {
      console.log(err);
    }

  }

  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:4000/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => console.log(response))
        .catch(err => console.log(err));
      getAllUser();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const updateUser = (user) => {
    setFormData({
      firstName: user.firstName,
      email: user.email,
      password: user.password
    })
    setUserId(user._id);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      firstName: formData.firstName,
      email: formData.email,
      password: formData.password
    }

    if (userId) {
      await fetch(`http://localhost:4000/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(response => response.json())
        .then(body => console(body))
        .catch(error => console.log(error.message))
       setUserId(null);
       setFormData({firstName: '', email: '', password: ''});
    } else {
       await fetch("http://localhost:4000/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(response => response.json())
        .then(body => console(body))
        .catch(error => console.log(error.message))
    }

    getAllUser();

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
        </input><br /><br />
        <input
          type='text'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}>
        </input><br /><br />

        <input
          type='text'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}>
        </input><br /><br />
        <button type='submit'>Save</button>
      </form>

      <br />
      <h3> Registered Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.firstName} {user.email} {user.password}
            <button onClick={() => deleteUser(user._id)}>
              Delete
            </button>
            <button onClick={() => updateUser(user)}>
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
