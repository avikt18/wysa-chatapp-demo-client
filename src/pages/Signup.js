import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading'
import { URL } from '../utils/constants'

const initialData = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
}

function Signup() {
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
      await axios.post(`${URL}/user/signup`, formData)
      navigate('/login')
    } catch (error) {
      const {response : {data}} = error
      alert(data.message)
    }
    setFormData(initialData)
    setLoading(false)
  }

  return (
    <div className='container'>
      <h1>Signup</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input value={formData.firstname} name='firstname' onChange={handleChange} type="text" placeholder='firstname' required />
        <input value={formData.lastname} name='lastname' onChange={handleChange} type="text" placeholder='lastname' required />
        <input value={formData.email} name='email' onChange={handleChange} type="email" placeholder='email' required />
        <input value={formData.password} name='password' onChange={handleChange} type="password" placeholder='password' required />
        <button className='btn' type="submit" onSubmit={handleSubmit}>{loading ? <Loading /> : 'Signup'}</button>
      </form>
      <p>Have an account?</p>
      <Link to='/login'>Login</Link>
    </div>
  )
}

export default Signup