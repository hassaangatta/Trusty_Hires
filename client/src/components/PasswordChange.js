import React from 'react';
import { useState } from 'react';
import { useAuth } from '../pages/AuthContext';

const PasswordChange = ({ setEditPass }) => {
    const { username, userMode } = useAuth();
    const [isChanged, setisChanged] = useState(false);
    const [newPass, setnewPass] = useState('');
    const [newPassConfirm, setnewPassConfirm] = useState('');
    const [oldPass, setoldPass] = useState('');
    const [oldPassShow, setoldPassShow] = useState(false);
    const [newPassShow, setnewPassShow] = useState(false);
    const [newPassCShow, setnewPassCShow] = useState(false);
    const [errors, setErrors] = useState({
        old: '',
        newp: '',
        newpc:'',
        validation:''
    });

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

    const fecthPassword = async() =>{
        try {
            const responce = await fetch(`http://localhost:5000/loginpass/${username}/${userMode}`)
            return await responce.json();
        } catch (err) {
            console.error(err);
        }
    }

    const validateForm = (pass) =>{
        const newErrors = {
            old: oldPass.trim() === '' ? 'Old Password is required.' : '',
            newp: newPass.trim() === '' ? 'New Password is required.' : '',
            newpc: newPassConfirm.trim() === '' ? 'Confirm New Password is required.' : ''
        };

        let old = (shiftCharacters(oldPass));
        console.log('pass = ',pass);
        console.log('old pass = ',old);

        if (old !== pass)
        {
            newErrors.validation = 'Entered Old Password is Wrong.';
        }
        else if (oldPass === newPass)
        {
            newErrors.validation = 'New Password must be different.';
        }
        else if (newPass !== newPassConfirm)
        {
            newErrors.validation = 'New Password is different from confirmed new password.';
        }
        // console.log(newErrors);  
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        let pass = await fecthPassword();
        if (validateForm(pass))
        {
            let changedPass = shiftCharacters(newPass); 
            let data = {
                id:username,
                mode:userMode,
                pass:changedPass
            }
            // console.log('data = ',data);
            await updatePassword(data);
            await setisChanged(true);   
        }
    }

    const updatePassword = async (body) => {
        try {
            const response = await fetch("http://localhost:5000/updatepassword", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        setEditPass(false);
    }

    const oldPassClick = (e) => {
        e.preventDefault();
        setoldPassShow(!oldPassShow);
    }

    const newPassClick = (e) => {
        e.preventDefault();
        setnewPassShow(!newPassShow);
    }

    const newPassCClick = (e) => {
        e.preventDefault();
        setnewPassCShow(!newPassCShow);
    }

  return (
    <div style={styles.popup} onClick={(e) => {e.preventDefault(); e.stopPropagation()}}>
        <h2>Change Password</h2>
        
        <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    id='old'
                    placeholder='Enter Old Password'
                    type={oldPassShow ? 'text':'password'}
                    value={oldPass}
                    onChange={(e) => setoldPass(e.target.value)}
                    style={styles.input}
                />
                <a href="#" style={{ color: 'black', textDecoration: 'none', transition: 'color 0.3s' , fontSize:'18px'}} onClick={(e) => {oldPassClick(e)}}>
                    <span onMouseEnter={(e) => e.target.style.color = 'gray'} onMouseLeave={(e) => e.target.style.color = 'black'}>Show</span>
                </a>
            </div>
            {errors.old && <p style={styles.error}>{errors.old}</p>}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    id='new'
                    placeholder='Enter new Password'
                    type={newPassShow ? 'text':'password'}
                    value={newPass}
                    onChange={(e) => setnewPass(e.target.value)}
                    style={styles.input}
                />
                <a href="#" style={{ color: 'black', textDecoration: 'none', transition: 'color 0.3s' , fontSize:'18px'}} onClick={(e) => {newPassClick(e)}}>
                    <span onMouseEnter={(e) => e.target.style.color = 'gray'} onMouseLeave={(e) => e.target.style.color = 'black'}>Show</span>
                </a>
            </div>
            {errors.newp && <p style={styles.error}>{errors.newp}</p>}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    id='newc'
                    placeholder='Confirm new Password'
                    type={newPassCShow ? 'text':'password'}
                    value={newPassConfirm}
                    onChange={(e) => setnewPassConfirm(e.target.value)}
                    style={styles.input}
                />
                <a href="#" style={{ color: 'black', textDecoration: 'none', transition: 'color 0.3s' , fontSize:'18px'}} onClick={(e) => {newPassCClick(e)}}>
                    <span onMouseEnter={(e) => e.target.style.color = 'gray'} onMouseLeave={(e) => e.target.style.color = 'black'}>Show</span>
                </a>
            </div>
            {errors.newpc && <p style={styles.error}>{errors.newpc}</p>}
            {errors.validation && <p style={styles.error}>{errors.validation}</p>}        
        </div>
        {isChanged && <p style={styles.verdict}>{'Password has Changed'}</p>}        
        <div style={styles.btnDivEditDelete}>
            { !isChanged && (
                <button onClick={(e) => handleSubmit(e)} style={styles.btn}>
                Change Password
                </button>)
            }
            <button style={styles.btn} onClick={(e) => handleClose(e)}>
            Cancel
            </button>
        </div>
    </div>
  )
}

const styles = {
    popup: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        border: '2px solid black',
        zIndex: 9999,
        maxWidth: '100%',
        width:'auto',
        maxHeight: '100vh',
        overflowY: 'auto',
        borderRadius: '20px',
        cursor: 'default',
    },
    btnDivEditDelete: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    btn: {
        padding: '10px',
        paddingLeft: '30px',
        paddingRight: '30px',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '15px',
        cursor: 'pointer',
        borderColor: 'black',
    },
    textarea: {
        marginBottom: '10px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '300px',
        resize: 'both',
        height: '200px',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginTop: '5px',
    },
    verdict: {
        fontSize: '14px',
        marginTop: '5px',
    },
    input: {
        marginBottom: '10px',
        marginRight:'5px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '95%',
    },
}

export default PasswordChange;

// const CompanyEditData = ({ heading,prevtext,username,setEdit1 }) => {
//     const [text, settext] = useState(prevtext);
//     const [errors, setErrors] = useState('');
    
//     const validateForm = () => {
//         const newErrors = text.trim() === '' ? 'This field is required ' : '';
//         setErrors(newErrors);
//         return Object.values(newErrors).every((error) => error === '');
//     };

//     const updateprofile = async (body) => {
//         try {
//             const response = await fetch("http://localhost:5000/updatecompanyprofiletext", {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(body),
//             });
//             setEdit1(false);
//         } catch (err) {
//             console.error(err.message);
//         }
//     };

//     const handleSubmit = useCallback(async(e) => {
//         e.preventDefault()
//         if (validateForm())
//         {
//             const updated = {
//                 username:username,
//                 data:text,
//             }
//             if (heading === 'mission')
//             {
//                 updated.text = 'mission';
//             }
//             else if (heading === 'vision')
//             {
//                 updated.text = 'vision';
//             }
//             else
//             {
//                 updated.text = 'environment';
//             }
//             setEdit1(false);
//             await updateprofile(updated);
//         }
//     },[text,heading,setEdit1,updateprofile,username,validateForm]);

//     const handleClose = (e) => {
//         e.preventDefault()
//         setEdit1(false)
//     }
//   return (
//     <div style={styles.popup} onClick={(e) => {e.preventDefault(); e.stopPropagation()}}>
//         <h2>{heading[0].toUpperCase() + heading.slice(1)}</h2>
        
//         <div style={{ marginBottom: '10px' }}>
//             <textarea
//                 id={`${heading}`}
//                 placeholder={`${heading}`}
//                 value={text}
//                 onChange={(e) => settext(e.target.value)}
//                 style={styles.textarea}
//             ></textarea>
//             {errors && <p style={styles.error}>{errors}</p>}        
//         </div>

//         <div style={styles.btnDivEditDelete}>
//             <button onClick={(e) => handleSubmit(e)} style={styles.btn}>
//             Save
//             </button>
//             <button style={styles.btn} onClick={(e) => handleClose(e)}>
//             Cancel
//             </button>
//         </div>
//     </div>
//   )
// }

// const styles = {
//     popup: {
//         position: 'fixed',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         backgroundColor: 'white',
//         padding: '20px',
//         border: '2px solid black',
//         zIndex: 9999,
//         maxWidth: '100%',
//         width:'auto',
//         maxHeight: '100vh',
//         overflowY: 'auto',
//         borderRadius: '20px',
//         cursor: 'default',
//     },
//     btnDivEditDelete: {
//         display: 'flex',
//         justifyContent: 'space-between',
//     },
//     btn: {
//         padding: '10px',
//         paddingLeft: '30px',
//         paddingRight: '30px',
//         backgroundColor: 'black',
//         color: 'white',
//         borderRadius: '15px',
//         cursor: 'pointer',
//         borderColor: 'black',
//     },
//     textarea: {
//         marginBottom: '10px',
//         padding: '8px',
//         border: '1px solid #ccc',
//         borderRadius: '4px',
//         width: '300px',
//         resize: 'both',
//         height: '200px',
//     },
//     error: {
//         color: 'red',
//         fontSize: '14px',
//         marginTop: '5px',
//     },
// }


// export default CompanyEditData;
