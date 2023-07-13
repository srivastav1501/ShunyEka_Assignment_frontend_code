import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateData } from '../features/userDetailSlice';
import validator from 'validator'

const Read = ({id}) => {
    const [currUser, setUser] = useState();
    const [error, setError] = useState();
    const users = useSelector((state) => state.app.users)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        const singleUser  = users.filter((ele)=>ele._id === id);
        setUser(...singleUser);
    },[])

    const getData = (e)=>{
        setUser({ ...currUser, [e.target.name]: e.target.value })
        setError();
    }

    const handleUpdate = (e)=>{
          e.preventDefault();
          const { email, mobile} = currUser;
          if (!validator.isEmail(email)) {
            setError('Please enter a valid email')
            return;
          } else if (mobile.length !== 10) {
            setError("Please enter a valid mobile");
            return;
          }else if(!error){
              dispatch(updateData({id,currUser}));
              navigate('/')
          }

    }
    // console.log('single', currUser)
    return (
        <section className='sec'>
            <div className="container_read">
                <div className="form-value">{currUser && 
                    <form action="Put" className='content' onSubmit={handleUpdate}>
                        <div className='head'>
                            <h2>User's Details</h2>
                            <Link to='/' className='icon'>
                                < CloseIcon sx={{ color: 'white', fontWeight: [500] }}  />
                            </Link>
                        </div>
                        <div className='id'>
                            <span>Id : {currUser._id}</span>
                        </div>
                       
                        <div className="box inputbox first">
                            <ion-icon name="person-outline"></ion-icon>
                            <input placeholder=' ' name='name' type="text" required autoComplete='off' onChange={getData} value={currUser.name} />
                            <label htmlFor="">Name</label>
                        </div>
                        <div className="box inputbox">
                            <ion-icon name="mail-outline"></ion-icon>
                            <input placeholder=' ' name='email' type="email" required autoComplete='off' onChange={getData}  value={currUser.email}/>
                            <label htmlFor="">Email</label>
                        </div>
                        <div className="box inputbox last">
                            <ion-icon name="call-outline"></ion-icon>
                            <input placeholder=' ' name='mobile' type='number' required autoComplete='off' onChange={getData} value={currUser.mobile}/>
                            <label htmlFor="">Mobile</label>
                        </div>
                        <button className='button edt' type='submit'>Edit</button>
                        <div className='error'>
                            <span>{error}</span>
                        </div>
                    </form>
}
                </div>
            </div>
        </section>
    )
}

export default Read
