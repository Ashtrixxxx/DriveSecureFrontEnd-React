import React,{useState} from "react";
import './Login.css'
import loginImage from '../../Assets/login.png';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    

    if(!email || !password) {
        setError("Please fill in both the fields");
        return;
    }

    console.log('Email:', email);
    console.log('Password:', password);
    setError('');
};

return (
    <div className="login-container">
        <div className="image-section">
            <img
               src={loginImage}
               alt="Login Visual"
               className="login-image"
               />
        </div>
        <div className="form-section">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email" 
                    required 
                    />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password" 
                required 
                />
            </div>
            <button type="submit" className="login-button">Login</button>
        </form>
        </div>
    </div>
);
    
};

export default Login
