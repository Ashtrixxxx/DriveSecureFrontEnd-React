import React,{useState} from 'react';
import './SignUP.css';
import signUpImage from '../../Assets/Sign Up.png'

 const SignUP = () => {
  const [userData,setUserData] = useState({
    name: '',
    password: '',
    profileUrl: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    occupation: ''

  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    if(!userData.name || !userData.email || !userData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    console.log('User Data:', userData);
    setError('');
  };

  return (
    <div className="signup-container">
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
            <label>Name</label>
            <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
            />
            </div>
          <div className="form-group">
            <label>Profile URL</label>
            <input
            type="url"
            name="profileUrl"
            value={userData.profileUrl}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label>DOB</label>
            <input
            type="date"
            name="dob"
            value={userData.dob}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <input
            type="text"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group">
            <label>Occupation</label>
            <input
            type="text"
            name="occupation"
            value={userData.occupation}
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
