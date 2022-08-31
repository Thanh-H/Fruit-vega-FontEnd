import {
  handleLoginService, handleRegisterService, handleLogOutService,
  getAllUserService, deleteUserService
} from '../service/userService'
import {
  loginFailed, loginStart, loginSuccess,
  registerStart, registerSuccess, registerFailed,
  logOutStart, logOutSuccess, logOutFailed
} from "./authSlice";

import {
  getAllUsersSuccess, getAllUsersFailed,
  deleteUsersSuccess, deleteUserFailed
} from "./userSlice";
import { toast } from 'react-toastify';

export const loginUser = async (email, password, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    let res = await handleLoginService(email, password);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const registerUSer = async (userName, email, password, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    let res = await handleRegisterService(userName, email, password)
    if (res && res.errCode === 0) {
      dispatch(registerSuccess(res.data))
      navigate("/login");
    }
  } catch (error) {
    dispatch(registerFailed())
  }
}

export const logOutUser = async (id, accessToken, dispatch, navigate) => {
  dispatch(logOutStart())
  try {
    let res = await handleLogOutService(id, accessToken)
    if (res && res.errCode === 0) {
      dispatch(logOutSuccess())
      navigate('/login')
    }
  } catch (error) {
    dispatch(logOutFailed())
  }

}

export const getAllUser = async (dispatch) => {
  try {
    let res = await getAllUserService()
    if (res && res.errCode === 0) {
      dispatch(getAllUsersSuccess(res.data))
    }
  } catch (error) {
    dispatch(getAllUsersFailed())
  }
}

export const deleteUser = async (id, dispatch, accessToken) => {
  try {
    let res = await deleteUserService(id, accessToken)
    if (res && res.errCode === 0) {
      toast.success('Delete user succeed!')
      dispatch(deleteUsersSuccess())
    }
    else {
      toast.error('Delete user failed!')
    }
  } catch (error) {
    toast.error('Delete user failed!')
    dispatch(deleteUserFailed())
  }
}

export const CreateUser = async (userName, email, password, role) => {
  try {
    let res = await handleRegisterService(userName, email, password, role)
    console.log(res)
    if (res && res.errCode === 0) {
      toast.success('create user succeed!')
    }
    else {
      toast.error('Create user failed!')
    }
  } catch (error) {

    console.log(error)
  }
}

