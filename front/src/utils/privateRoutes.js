import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {

  let  userAuth = localStorage.getItem("token") == null ? false : true;

  return (
    <div>
        {userAuth ? <Outlet  /> : <Navigate to="/login" />};
    </div>

)
  }



export default PrivateRoutes