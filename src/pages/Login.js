import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading'
import { URL } from '../utils/constants'

const initialData = {
  email: '',
  password: ''
}

function Login({setUserInfo}) {
  const [formData, setFormData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const {data} = await axios.post(`${URL}/user/login`, formData)
      const {authToken, user: {firstname, theme}} = data
      const userObj = {authToken, firstname, theme}
      setUserInfo(userObj)
      localStorage.setItem('userInfo', JSON.stringify(userObj))
      navigate('/chat')
    } catch (error) {
      const {response : {data}} = error
      alert(data.message)
    }
    setFormData(initialData)
    setLoading(false)
  }
  return (
    <div className='container'>
      <h1>Login</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input value={formData.email} name='email' onChange={handleChange} type="email" placeholder='email' required />
        <input value={formData.password} name='password' onChange={handleChange} type="password" placeholder='password' required />
        <button className='btn' type="submit" onSubmit={handleSubmit}>{loading ? <Loading /> : 'Login'}</button>
      </form>
      <p>Don't have an account?</p>
      <Link to='/signup'>Signup</Link>
    </div>

  )
}

export default Login