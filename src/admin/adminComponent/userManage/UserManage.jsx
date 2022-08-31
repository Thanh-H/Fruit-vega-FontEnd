import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../../../redux/action'
import './UserManage.scss'

export const UserManage = () => {
    let [role, setRole] = useState('')
    let dispatch = useDispatch()
    let allUser = useSelector((state) => state.user?.allUsers)
    let accessToken = useSelector((state => state.auth.login?.userInfor.accessToken))
    console.log(accessToken)
    console.log(allUser)
    useEffect(async () => {
        getAllUser(accessToken, dispatch)
    }, [])
    return (
        <div className="user-manage-container">
            <form >
                <div className="row">
                    <div className="form-group col-6 ">
                        <label >Họ và tên</label>
                        <input type="email" className="form-control"
                        />
                    </div>
                    <div className="form-group col-6 ">
                        <label>Email</label>
                        <input type="password" className="form-control"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6 ">
                        <label >Mật khẩu</label>
                        <input type="email" className="form-control"
                        />
                    </div>
                    <div className="form-group col-6 ">
                        <label>Vai trò</label>
                        <select type="password" className="form-select"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value={true}>Admin</option>
                            <option value={false}>User</option>
                        </select>
                    </div>
                </div>

            </form>
            <div className='button-container'>
                <button className=' btn-add btn btn-primary'>Thêm người dùng</button>
                <button className=' btn-cancle btn btn-secondary'>Hủy</button>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>Otto</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
