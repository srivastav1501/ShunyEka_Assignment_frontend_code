import './form.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { createUser } from '../features/userDetailSlice';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import validator from 'validator'


function Form() {
  const [error, setError] = useState();
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  // console.log(error);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const getUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    // console.log(user);
     setError()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email,mobile} = user;
    // console.log(name, email, mobile)
    if (!validator.isEmail(email)) {
      setError('Please enter a valid email')
      return;
    } else if (mobile.length !== 10) {
      setError("Please enter a valid mobile");
      return;
    }
    else if(!error ){
      dispatch(createUser(user));
      navigate('/');
    }
  }

  return (
    <section className='sec'>
      <div className="container">
        <div className="form-value">
          <form action="Post" className='content' onSubmit={handleSubmit}>
            <div className='head'>
              <h2>Add User</h2>
              <Link to='/' className='icon'>
                < CloseIcon sx={{ color: 'white', fontWeight: [500] }} />
              </Link>
            </div>
            <div className="inputbox">
              <ion-icon name="person-outline"></ion-icon>
              <input placeholder=' ' type="text" name='name' required onChange={getUserData} autoComplete='off' />
              <label htmlFor="">Name</label>
            </div>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input placeholder=" " type="email" name='email' required onChange={getUserData} autoComplete='off' />
              <label htmlFor="">Email</label>
            </div>
            <div className="inputbox last">
              <ion-icon name="call-outline"></ion-icon>
              <input 
              placeholder=' ' 
              type="number" 
              name='mobile' 
              required 
              onChange={getUserData} 
              autoComplete='off' />
              <label htmlFor="">Mobile</label>
            </div>
            <button className='btn' type='submit'>Add</button>
            <div className='error'>
              <span>{error}</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Form

