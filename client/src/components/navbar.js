import { Link } from "react-router-dom";
import "./navbar.css"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [cookies, setCookies] = useCookies(["access"]);
  const navigate = useNavigate();

  const logOut=()=>{
    setCookies("access_token","");
    window.localStorage.removeItem("userID");
    navigate("/");
  }
  
  return (
    <div className="navBar">
      <Link to={"/problem-list"} className="navProblems"> Problems </Link>
      <Link to={"/submissions"} className="navSubmissions"> Submissions </Link>
      {!cookies.access_token ? (<Link to={"/" } className="navAuth"> Login/Register </Link>):( <button onClick={()=>logOut()}>Logout</button>)}
    </div>
  );
};
