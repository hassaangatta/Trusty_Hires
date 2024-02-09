import React from 'react';
import { useAuth } from "../pages/AuthContext";
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const CompanyEditInfo = ({ preInfo,username,setEdit2 }) => {
    const fileInputRef = useRef(null);
    const { userMode } = useAuth();
    const [name, setname] = useState(preInfo.name);
    const [email, setemail] = useState(preInfo.email);
    const [contact, setcontact] = useState(preInfo.contact);
    const [website, setwebsite] = useState(preInfo.website);
    const [linkedin, setlinkedin] = useState(preInfo.linkedin);
    const [locations, setlocations] = useState(preInfo.locations);
    const [selectedImage, setselectedImage] = useState();
    const [imgPresent,setimgPresent] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        contact:'',
        website:'',
        linkedin:'',
        locations:'',
    });
    
    const validateForm = () => {
        let flag = 0;
        for (let i=0;i<locations.length;i++)
        {
            if (locations[i].city === '' || locations[i].state === '' || locations[i].country === '')
                flag = 1;
        }
        const newErrors = {
          name: name.trim() === '' ? 'Name field is required ' : '',
          email: email.trim() === '' ? 'Email field is required ' : '',
          contact: contact.trim() === '' ? 'Contact field is required ' : '',
          website: website.trim() === '' ? 'Website field is required ' : '',
          linkedin: linkedin.trim() === '' ? 'LinkedIn field is required ' : '',
          locations: flag === 1 ? 'Location field is required ' : '',
        };
        setErrors(newErrors);
    
        return Object.values(newErrors).every((error) => error === '');
    };

    const updateprofile = async (body) => {
        try {
            const response = await fetch("http://localhost:5000/updatecompanyprofileinfo", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            setEdit2(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    const addLocationInput = () => {
        let flag = 0;
        for (let i=0;i<locations.length;i++)
        {
            if (locations[i] === '')
                flag = 1;
        }
        if (flag !== 1)
            setlocations([...locations, {city:'',state:'',country:''}]);
        else
            setlocations(locations);
    };

    const removeLocationInput = (index) => {
        const newLocation = [...locations];
        newLocation.splice(index, 1);
        setlocations(newLocation);
    };

    const [img,setimg] = useState();

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
        setimgPresent(i !== '' ? true:false)
        } catch (err){  
            console.error(err.message);
        }
      }
  
    useEffect(() => {
        getImage();
    });
    
    const handleSubmit = useCallback(async(e) => {
        e.preventDefault()
        if (validateForm())
        {
            const updated = {
                username:username,
                name:name,
                email:email,
                contact:contact,
                website:website,
                linkedin:linkedin,
                locations:locations,
            }
            setEdit2(false);
            await updateprofile(updated);
        }
    },[setEdit2,updateprofile,username,validateForm,name,email,contact,website,linkedin,locations]);

    const handleClose = (e) => {
        e.preventDefault()
        setEdit2(false)
    }

    const handleDelete = async(e) => {
        e.preventDefault();
        let image_id = img.split('/');
        image_id = image_id[image_id.length-1];
        image_id = image_id.split('.');
        image_id = image_id[0];
        await deleteImage(image_id);
    }

    const handleImageChange = async (e) => {
        if (imgPresent)
        {
            let image_id = img.split('/');
            image_id = image_id[image_id.length-1];
            image_id = image_id.split('.');
            image_id = image_id[0];
            await deleteImage(image_id);
        }
        
        await setselectedImage(e.target.files[0]);
        const url = await uploadImage(e.target.files[0]);
        // console.log(url);
        await updateImage(url);
    };

    const uploadImage = async (file) => {
        try {
            // console.log('env = ',process.env.REACT_APP_PRESET_NAME)
            let url;
            let apiurl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
            // console.log(apiurl);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', `${process.env.REACT_APP_PRESET_NAME}`);
            // formData.append('cloud_name',`'${process.env.REACT_APP_CLOUD_NAME}'`);
            // console.log(formData)
            for (const entry of formData.entries()) {
                console.log(entry);
            }
    
            await fetch(apiurl,{
                method: 'POST',
                body: formData,
            })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.secure_url);
                url = data.secure_url;
            }).catch((err) => {
                console.log(err);
            })
            return url;
        } catch (error) {
          console.error('Error uploading image:', error);
        }
    };

    const updateImage = async (url) => {
        try {
            const data = { username, url, userMode };
            console.log(data);
            const response = await fetch(`http://localhost:5000/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteImage = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/delete/${username}/${id}/${userMode}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleUpload = () => {
        fileInputRef.current.dispatchEvent(new MouseEvent('click'));
    };

  return (
    <div style={styles.popup} onClick={(e) => {e.preventDefault(); e.stopPropagation()}}>
        <h2>Company Information</h2>
        
        <div style={{ marginBottom: '10px' }}>
            <input
                id='name'
                type="text"
                placeholder="Company Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                style={styles.input}
            />
            {errors.name && <p style={styles.error}>{errors.name}</p>}
            <input
                id='email'
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                style={styles.input}
            />
            {errors.email && <p style={styles.error}>{errors.email}</p>}
            <input
                id='contact'
                type="text"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setcontact(e.target.value)}
                style={styles.input}
            />
            {errors.contact && <p style={styles.error}>{errors.contact}</p>}
            <input
                id='linkedin'
                type="text"
                placeholder="LinkedIn Profile"
                value={linkedin}
                onChange={(e) => setlinkedin(e.target.value)}
                style={styles.input}
            />
            {errors.linkedin && <p style={styles.error}>{errors.linkedin}</p>}
            <input
                id='website'
                type="text"
                placeholder="Website"
                value={website}
                onChange={(e) => setwebsite(e.target.value)}
                style={styles.input}
            />
            {errors.website && <p style={styles.error}>{errors.website}</p>}
            {locations.map((skill, index) => (
                <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                    <div style={styles.inputRow}>
                <input
                    id='city'
                    type="text"
                    placeholder="City"
                    value={locations[index].city}
                    onChange={(e) => {locations[index].city = ((e.target.value) === '' ? '' : (e.target.value)[0].toUpperCase()+(e.target.value).slice(1))}}
                    style={styles.inputLocation}
                />
                <input
                    id='state'
                    type="text"
                    placeholder="State"
                    value={locations[index].state}
                    onChange={(e) => {locations[index].state = ((e.target.value) === '' ? '' : (e.target.value)[0].toUpperCase()+(e.target.value).slice(1))}}
                    style={styles.inputLocation}
                />
                <input
                    id='country'
                    type="text"
                    placeholder="Country"
                    value={locations[index].country}
                    onChange={(e) => {locations[index].country = ((e.target.value) === '' ? '' : (e.target.value)[0].toUpperCase()+(e.target.value).slice(1))}}
                    style={styles.inputLocation}
                />
            </div>
                    {index > 0 && (
                    <button
                        type="button"
                        onClick={() => removeLocationInput(index)}
                        style={styles.btnSkill}
                    >
                        x
                    </button>
                    )}
                    { index === 0 && (
                        <button
                        type="button"
                        onClick={addLocationInput}
                        style={styles.btnSkill}
                        >
                            +
                        </button>
                    )}
                </div>
            ))}
            {errors.locations && <p style={styles.error}>{errors.locations}</p>}
        </div>
        <div className='Profile Pic' style={styles.img_div}>
            <img style={styles.img} src={img}/>
            <div style={styles.btnDiv}>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={styles.hidden_input}/>
                <button onClick={handleUpload} style={styles.btn_img}>
                Change Profile Picture
                </button>
                {
                    imgPresent &&
                    <button style={styles.btn_img} onClick={(e) => handleDelete(e)}>
                    Delete Profile Picture
                    </button>
                }
            </div>
        </div>
        <div style={styles.btnDivEditDelete}>
            <button onClick={(e) => handleSubmit(e)} style={styles.btn}>
            Save
            </button>
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
        maxWidth: '500px',
        width:'auto',
        maxHeight: '80vh',
        overflowY: 'auto',
        borderRadius: '20px',
        cursor: 'default',
    },
    btnDivEditDelete: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    btnDiv: {
        display: 'flex',
        flexDirection: 'column',
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
    btn_img: {
        padding: '10px',
        paddingLeft: '20px',
        paddingRight: '20px',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '15px',
        cursor: 'pointer',
        borderColor: 'black',
        marginTop: '20px',
    },
    btnSkill:{
        padding: '4px',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '15px',
        cursor: 'pointer',
        borderColor: 'black',
        fontSize:'20px',
    },
    img:{
        border: '2px solid black',
        maxHeight:'150px',
        maxWidth:'150px',
        with:'150px',
        height:'150px',
    },
    img_div:{
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    skill_inp: {
        flex: '1', 
        marginRight: '10px', 
        padding: '8px', 
        border: '1px solid #ccc', 
        borderRadius: '4px' 
    },
    input: {
        marginBottom: '10px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '95%',
    },
    inputLocation: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        flex : '1',
        width:'33.33%',
    },
    inputRow: {
        display: 'flex',
        marginBottom: '10px',
        width:'100%',
    },
    select: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        flex: '1',
        width: '100%',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginTop: '5px',
    },
    hidden_input: {
        position: 'absolute',
        left: '-9999px',
    }
}

export default CompanyEditInfo;
