import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

export const NavBar = ({ profilepic }) => {
  
  const [open,setopen] = useState(false)
  const nevigate = useNavigate();
  const location = useLocation();
  const { logedin, setlogedin, username, userMode, setuserMode, currPage, setcurrPage } = useAuth();
  const [img,setimg] = useState();

  // const getImage = () =>{
  //   try{
  //     let i = require(`../Images/${username}.png`);
  //     console.log(i);
  //     setimg(i);
  //   }catch(error)
  //   {
  //     console.log(error);
  //     setimg(require(`../Images/temp_profile.png`));
  //   }
  // }

  const getImage = async () => {
    try {
      let i;
      if (userMode === 'Applicant')
      {
        const responce = await fetch(`http://localhost:5000/getimageApplicant/${username}`);
        i = await responce.json();
      }
      else if (userMode === 'Company')
      {
        const responce = await fetch(`http://localhost:5000/getimageCompany/${username}`);
        i = await responce.json();
      }
      // console.log(i);
      setimg(i !== '' ? i:require(`../Images/temp_profile.png`))
    } catch (err){
        console.error(err.message);
    }
  }
  
  useEffect(() => {
    getImage();
  });

  const handleProfile_click = (e) =>{
    e.preventDefault();
    const currentPage = location.pathname;
    console.log(currentPage);
    setcurrPage(currentPage);
    setopen(!open)
  }

  const handleLogin = (e) => {
    e.preventDefault();
    nevigate('/login')
  }
  const handlelogout = () =>{
    setlogedin(false)
    setuserMode('Applicant')
  }
  return (
    <div className="Nav">
      <div className="logo">
        <img src={require("../Images/trustyhires.png")} alt="logo" className="logo_img"/>
      </div>
      { logedin &&
        userMode === 'Applicant' &&
        <div className="dropdown">
          <div className="profile">
            <img style={{border: '1px solid #ccc'}} src={img} alt="profile" className="profile_img" onClick={handleProfile_click}/>
          </div>
          
          <div className="dropdown_list">
            {open && currPage === '/' && 
              (<ul className="nav_list">
                <li><a href={`/applicantprofile/${username}`}>Profile</a></li>
                <li><a href="./appliedjobs">AppliedJobs</a></li>
                <li><a href="./" onClick={handlelogout}>Logout</a></li>
              </ul>)
            }
            {open && currPage === `/applicantprofile/${username}` && 
              (<ul className="nav_list">
                  <li><a href="../">Home</a></li>
                  <li><a href="../appliedjobs">AppliedJobs</a></li>
                  <li><a href="../" onClick={handlelogout}>Logout</a></li>
                </ul>)
            }
            {open && currPage === '/appliedjobs' && 
              (<ul className="nav_list">
                <li><a href="./">Home</a></li>
                <li><a href={`/applicantprofile/${username}`}>Profile</a></li>
                <li><a href="./" onClick={handlelogout}>Logout</a></li>
                </ul>)
            }
            {open && currPage === '/companyprofile' && 
              (<ul className="nav_list">
                <li><a href="./">Home</a></li>
                <li><a href={`/applicantprofile/${username}`}>Profile</a></li>
                <li><a href="./appliedjobs">AppliedJobs</a></li>
                <li><a href="./" onClick={handlelogout}>Logout</a></li>
                </ul>)
            }
          </div>
        </div>
      }
      { logedin &&
        userMode === 'Company' &&
        <div className="dropdown">
          <div className="profile">
            <img style={{border: '1px solid #ccc'}} src={img} alt="profile" className="profile_img" onClick={handleProfile_click}/>
          </div>
          <div className="dropdown_list">
          {
            open && currPage === '/' && (<ul className="nav_list">
              <li><a href={`./companyprofile/${username}`}>Profile</a></li>
              <li><a href="./applications">Applications</a></li>
              <li><a href="./selectedcandidates">Selected Candidates</a></li>
              <li><a href="./" onClick={handlelogout}>Logout</a></li>
            </ul>)
          }
          {
            open && currPage === `/companyprofile/${username}` && (<ul className="nav_list">
              <li><a href="../">Home</a></li>
              <li><a href="../applications">Applications</a></li>
              <li><a href="../selectedcandidates">Selected Candidates</a></li>
              <li><a href="../" onClick={handlelogout}>Logout</a></li>
            </ul>)
          }
          {
            open && currPage === '/applications' && (<ul className="nav_list">
              <li><a href="./">Home</a></li>
              <li><a href={`./companyprofile/${username}`}>Profile</a></li>
              <li><a href="./selectedcandidates">Selected Candidates</a></li>
              <li><a href="./" onClick={handlelogout}>Logout</a></li>
            </ul>)
          }
          {
            open && currPage === '/selectedcandidates' && (<ul className="nav_list">
              <li><a href="./">Home</a></li>
              <li><a href={`./companyprofile/${username}`}>Profile</a></li>
              <li><a href="./applications">Applications</a></li>
              <li><a href="./" onClick={handlelogout}>Logout</a></li>
            </ul>)
          }
          {
            open && currPage === '/applicantprofile' && (<ul className="nav_list">
              <li><a href="./">Home</a></li>
              <li><a href={`./companyprofile/${username}`}>Profile</a></li>
              <li><a href="./applications">Applications</a></li>
              <li><a href="./selectedcandidates">Selected Candidates</a></li>
              <li><a href="./" onClick={handlelogout}>Logout</a></li>
            </ul>)
          }
          </div>
        </div>
      }
      { !logedin && 
        <div className="nav-login">
          <button className="nav-login-button" onClick={handleLogin}>Login</button>
        </div>

      }
    </div>
  )
}

export default NavBar

