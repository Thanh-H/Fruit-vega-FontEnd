import { handleLoginService, handleRegisterService } from '../service/userService'
import {
  loginFailed, loginStart, loginSuccess,
  registerStart, registerSuccess, registerFailed,
  logoutStart, logOutSuccess, logoutFailed
} from "./authSlice";

import {
  clearUserList, deleteUsersFailed, deleteUsersStart,
  deleteUsersSuccess, getUsersFailed, getUsersStart, getUsersSuccess
} from "./userSlice";

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
