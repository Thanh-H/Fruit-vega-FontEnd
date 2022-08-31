import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser, deleteUser, CreateUser } from '../../../redux/action'
import './UserManage.scss'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateUserService } from '../../../service/userService'
import { toast } from 'react-toastify'

export const UserManage = () => {
    let [email, setEmail] = useState('')
    let [password, setpassword] = useState('')
    let [userName, setUserName] = useState('')
    let [role, setRole] = useState(true)
    let [isEdit, setIsEdit] = useState(false)
    let dispatch = useDispatch()
    let allUser = useSelector((state) => state.users.users?.allUsers)
    let accessToken = useSelector((state => state.auth.login?.userInfor.accessToken))
    let [handle, setHandle] = useState('')

    useEffect(() => {
        getAllUser(dispatch)

    }, [handle])
    console.log('--------------------', handle)
    let handleCreateUser = async () => {
        await CreateUser(userName, email, password, role)
        setEmail('')
        setUserName('')
        setRole('')
        setpassword('')
        setIsEdit(false)
        setHandle(handle + 1)
    }

    let handleEditUser = (item) => {
        setEmail(item.email)
        setUserName(item.userName)
        setRole(item.isAdmin)
        setIsEdit(true)
        setHandle(handle + 1)

    }


    let handleDeleteUser = async (id) => {
        await deleteUser(id, dispatch, accessToken)
        setHandle(handle + 1)
    }

    let handleUpdateUser = async () => {
        let data = { email, userName, role }
        let res = await updateUserService(data)
        if (res && res.errCode === 0) { toast.success('Update user succeed!') }
        else {
            { toast.warning(`${res.errMessage}`) }
        }
        setHandle(handle + 1)
    }

    let handleCancel = () => {
        setEmail('')
        setUserName('')
        setRole('')
        setIsEdit(false)
        setHandle(handle + 1)
    }

    return (
        <div className="user-manage-container">
            <form >
                <div className="row">
                    <div className="form-group col-6 ">
                        <label >Họ và tên</label>
                        <input
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            type="text" className="form-control"
                        />
                    </div>
                    <div className="form-group col-6 ">
                        <label>Email</label>
                        <input
                            disabled={isEdit === false ? '' : 'none'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" className="form-control"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6 ">
                        <label >Mật khẩu</label>
                        <input
                            disabled={isEdit === false ? '' : 'none'}
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            type="password" className="form-control"
                        />
                    </div>
                    <div className="form-group col-6 ">
                        <label>Vai trò</label>
                        <select value={role} className="form-select"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value={true}>Admin</option>
                            <option value={false}>User</option>
                        </select>
                    </div>
                </div>

            </form>
            <div className='button-container'>
                {isEdit === false ? <button onClick={() => handleCreateUser()} className=' btn-add btn btn-primary'>Thêm người dùng</button>
                    :
                    <button onClick={() => handleUpdateUser()} className=' btn-add btn btn-warning'>Lưu thay đổi</button>
                }
                <button onClick={() => handleCancel()} className=' btn-cancle btn btn-secondary'>Hủy</button>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Xử lý</th>
                    </tr>
                </thead>
                <tbody>
                    {allUser && allUser.length > 0 ? allUser.map((item, index) => {
                        return (<tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.userName}</td>
                            <td> {item.email} </td>
                            <td>
                                <FontAwesomeIcon onClick={() => handleEditUser(item)} style={{ marginRight: '30px' }} className='btn  btn-warning' icon={faPenToSquare} ></FontAwesomeIcon>
                                <FontAwesomeIcon onClick={() => handleDeleteUser(item._id)} style={{ marginLeft: '30px' }} className='btn btn-danger' icon={faTrash}  ></FontAwesomeIcon>
                            </td>
                        </tr>)
                    }) : ''}
                </tbody>
            </table>
        </div>
    )
}
