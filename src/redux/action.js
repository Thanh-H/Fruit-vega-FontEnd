import {
  handleLoginService, handleRegisterService, handleLogOutService,
  getAllUserService
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

import axios from 'axios'

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

export const getAllUser = async (accessToken, dispatch) => {
  try {
    let res = await getAllUserService(accessToken)
    if (res && res.errCode === 0) {
      dispatch(getAllUsersSuccess())
    }
  } catch (error) {
    dispatch(getAllUsersFailed())
  }
}


