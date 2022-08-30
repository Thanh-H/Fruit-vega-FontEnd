import { HomePage } from "./Page/homePage/HomePage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from "./Page/auth/Login";
import { Register } from "./Page/auth/Register";
import { System } from "./admin/System";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/system" element={< System />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
