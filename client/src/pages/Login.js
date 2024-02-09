import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext';

const Login = () => {

  const { logedin, setlogedin, username, setusername, userMode, setuserMode } = useAuth();
  const [password,setpassword] = useState()
  const [passfromDB,setpassfromDB] = useState()
  const navigate = useNavigate();

  const shiftCharacters = (inputString) => {
    if(inputString){
      const shiftedString = inputString.split('').map((char) => {
        if (/[a-zA-Z0-9]/.test(char)) {
          let code = char.charCodeAt(0);
          if (char.match(/[a-z]/)) {
            code = ((code - 97 + 3) % 26) + 97;
          } else if (char.match(/[A-Z]/)) {
            code = ((code - 65 + 3) % 26) + 65;
          } else if (char.match(/[0-9]/)) {
            code = ((code - 48 + 3) % 10) + 48;
          }
          return String.fromCharCode(code);
        } else {
          return char;
        }
      }).join('');
    
      return shiftedString;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let temp_pass = password; 
    temp_pass = (shiftCharacters(temp_pass));
  
    try {
      const response = await fetch(`http://localhost:5000/loginpass/${username}/${userMode}`);
      const getpass = await response.json();
      setpassfromDB(getpass);
      // console.log("T", temp_pass)
      if (passfromDB) {
        if (passfromDB === temp_pass) {
          // console.log("success");
          // console.log('Before state update:', logedin);
          setlogedin(true);
          // console.log('After state update:', logedin);
          navigate('/');
        } else {
          console.log('not matched');
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleUserModeChange = (e) => {
    const selectedMode = e.target.value;
    setuserMode(selectedMode);
  };
  
  return (
      <div className="login-container" style={styles.login_container}>
          <img src={require('../Images/trustyhires.png')} alt="Trusty Hires Logo" className="logo" style={styles.logo}/>

          <h2 className="login-heading" style={styles.login_heading}>Sign in to Trusty Hires</h2>

          <div className="login-form" style={styles.login_form}>
              <div className="form-group" style={styles.form_group}>
                  <label htmlFor="username">Username:</label>
                  <input type="text" id="username" name="username" placeholder='Username'
                    value={username}
                    onChange={(e) => {setusername(e.target.value); console.log(username)}}
                  />
              </div>

              <div className="form-group" style={styles.form_group}>
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" name="password" placeholder='Password'
                    value={password}
                    onChange={(e) => {setpassword(e.target.value); console.log(password)}}
                  />
              </div>

              <div className="user-mode-selector" style={styles.user_mode_selector}>
                <label>Select User Mode: </label>
                  <select value={userMode} onChange={handleUserModeChange}>
                    <option value="Applicant">Applicant</option>
                    <option value="Company">Company</option>
                  </select>
              </div>

              <button className="sign-in-button" style={styles.sign_in_button} onClick={(e) => handleLogin(e)}>Sign In</button>
          </div>

          <div className="new-user-section" style={styles.new_user_section}>
              <p>New to Trusty Hires?</p>
              <a href="/signup" className="create-account-link">
                  Create an account
              </a>
          </div>
      </div>
  );
};

const styles = {
  login_container : {
      textAlign: 'center',
      marginTop: '50px'
  },
  logo : {
      width: '300px'
  },
  login_heading: {
      marginTop: '20px',
  },
  login_form: {
      marginTop: '20px',
  },
  form_group: {
      marginBottom: '15px'
  },
  label: {
      display: 'block',
  },
  forgot_password_link: {
      display: 'block',
      marginTop: '5px',
      textDecoration: 'none'
  },
  sign_in_button: {
      backgroundColor: 'black',
      color: 'white',
      padding: '10px 15px',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '15px'
  },
  new_user_section: {
      marginTop: '20px'
  },
  user_mode_selector: {
    marginTop: '10px',
    marginBottom:'10px'
  },
}


export default Login;


// const getpassfrom = async () => {
  //   console.log(`HI  ${username}`);
  //   console.log(`Heyy user data ${username} ${userMode}`);
  //   // const responce = await fetch(`http://localhost:5000/loginpass/logindetails/${username}/user=${userMode}`);
  //   // const getpass = await responce.json();
  //   // setpassfromDB(getpass)
  // }

  // useEffect(() => {
  //   getpassfrom();
  // },[passfromDB])

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   settemp_pass(password);
  //   console.log('check1')
  //   settemp_pass(shiftCharacters(temp_pass));
  //   // const getpassfrom = async () => {
  //   //   const responce = await fetch(`http://localhost:5000/loginpass/logindetails?uname=${username}&user=${userMode}`);
  //   //   const getpass = await responce.json();
  //   //   setpassfromDB(getpass)
  //   // }
  //   // getpassfrom()
  //   console.log(`U`, username)
  //   const response = fetch(`http://localhost:5000/loginpass/${username}/${userMode}`);
  //   console.log("B", response)
  //   // setpassfromDB(getpass)
  //   if (passfromDB){ 
  //   console.log(passfromDB)
  //   console.log(passfromDB[0].password)
  //   if (passfromDB[0].password === temp_pass)
  //   {
  //     setlogedin(!logedin)
  //     history('/')
  //   }
  //   else
  //     console.log('not matched')
  //   }
  // }