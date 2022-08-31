import { HomePage } from "./Page/homePage/HomePage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from "./Page/auth/Login";
import { Register } from "./Page/auth/Register";
import { System } from "./admin/System";
import { useSelector } from 'react-redux';
import NotFound from "./component/notFound/NotFound";
function App() {
  let isAdmin = useSelector((state) => state.auth.login.userInfor?.isAdmin)
  return (
    <BrowserRouter>
      <Routes>
        {isAdmin === true ? <Route path="/system/*" element={< System />} /> : ''}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
