import '../App.css'
import React, {  useEffect } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { showUser, deleteUser } from '../features/userDetailSlice';
import { useNavigate } from 'react-router-dom';

const Table = ({setId}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { users, loading } = useSelector((state) => state.app)
    // console.log('=========usr', users);

    const view = (id)=>{
        setId(id);
        navigate('/read')
    }

    useEffect(() => {
        dispatch(showUser());
    }, [])

    if (loading) {
        return <h2>Loading ...</h2>
    }

    return (
        <div className="table">
            <section className="table__header">
                <h1>User's Details</h1>
                <div className="add_user">
                    <button className="add_user-btn" title="Add User" onClick={()=>navigate('/add')} ></button>
                </div>
            </section>
            <section className="table__body">
                <table>
                    <thead>
                        <tr>
                            <th> Profile </th>
                            <th> Id </th>
                            <th>Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            users.map((user, i) => {
                                return (
                                    <tr key={i}>
                                        <td> <img src="https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png" alt="" /></td>
                                        <td> {user._id}</td>
                                        <td> {user.name}</td>
                                        <td>
                                            <VisibilityIcon className='hov' onClick={()=>view(user._id)}/>
                                            <DeleteOutlineIcon className='hov-del' title='Delete' onClick={()=> dispatch(deleteUser(user._id))}/>
                                        </td>
                                    </tr>

                                )
                            })
                        }


                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default Table;


