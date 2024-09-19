import React,{useState} from 'react';
import './SignUP.css';
import signUpImage from '../../Assets/Sign Up.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 const SignUP = () => {
  const nav = useNavigate();
  const [userData,setUserData] = useState({
    FirstName:'',
    LastName: '',
    UserName:'',
    UserPass: '',
    ProfileUrl: '',
    DOB: '',
    Gender: '',
    Phone: '',
    Email: '',
    Occupation: '',
    role:0

  });
  

  const [error, setError] = useState('');

  const handleChange = (e) => {
console.log(e.target.name,e.target.value);

    setUserData({ ...userData, [e.target.name]: e.target.value 

    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    

    if(!userData.FirstName || !userData.Email || !userData.UserPass) {
      setError('Please fill in all required fields.');
      return;
    }
    console.log('User Data:', userData);

    try{
      const response = await axios.post("https://localhost:7063/api/User/CreateUser",userData)
      console.log(response);
      toast.success("Signup successful! Please log in.");

      nav("/login")

      
    }catch(error){
      console.log(error);
      
    }

    console.log('User Data:', userData);
    setError('');
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <div className="image-section">
        <img
           src={signUpImage}
           alt="Sign Up Visual"
           className="signup-image"
           />
      </div>

      <div className="form-section">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
            type="text"
            name="FirstName"
            value={userData.FirstName}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
            type="text"
            name="LastName"
            value={userData.LastName}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label>User Name</label>
            <input
            type="text"
            name="UserName"
            value={userData.UserName}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
            type="password"
            name="UserPass"
            value={userData.UserPass}
            onChange={handleChange}
            required
            />
            </div>
          <div className="form-group">
            <label>Profile URL</label>
            <input
            type="url"
            name="ProfileUrl"
            value={userData.ProfileUrl}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label>DOB</label>
            <input
            type="date"
            name="DOB"
            value={userData.DOB}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <input
            type="text"
            name="Gender"
            value={userData.Gender}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
            type="text"
            name="Phone"
            value={userData.Phone}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
            type="text"
            name="Email"
            value={userData.Email}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label>Occupation</label>
            <input
            type="text"
            name="Occupation"
            value={userData.Occupation}
            onChange={handleChange}
            required
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUP;
