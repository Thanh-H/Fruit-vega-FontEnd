import { HomePage } from "./Page/homePage/HomePage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from "./Page/auth/Login";
import { Register } from "./Page/auth/Register";
import { System } from "./admin/System";
import { useSelector } from 'react-redux';
import NotFound from "./component/notFound/NotFound";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DetailProduct } from "./Page/homePage/products/detailProduct/DetailProduct";
import { ProductByType } from "./Page/product/ProductByType";
import { ProductBySubType } from "./Page/product/productBySubType/ProductBySubType";
function App() {
  let isAdmin = useSelector((state) => state.auth.login.userInfor?.isAdmin)
  return (

    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover

      />
      <Routes>
        <Route path="/system/*" element={< System />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Detail-product/:id/:type" element={<DetailProduct />} />
        <Route path="/products/:productType" element={<ProductByType />} />
        <Route path="/products/sub-product/:subProductType" element={<ProductBySubType />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
