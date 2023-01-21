import axios from 'axios';
import { Outlet, Navigate, useNavigate } from 'react-router-dom'

const PrivateRoutes = () => {

  // state
  const token = localStorage.getItem('token') ;
  const navigate = useNavigate();

  //function
  const checkToken = () => {
    axios.get('http://localhost:8080/api/checktoken', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      
    })
    .catch((error) => {
      navigate("/login");
    })
  }

  setInterval(checkToken, 600000);

  let  userAuth = localStorage.getItem("token") == null ? false : true;

  return (
    <div>
        {userAuth ? <Outlet  /> : <Navigate to="/login" />};
    </div>

)
  }



export default PrivateRoutes