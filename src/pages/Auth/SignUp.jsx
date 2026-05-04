import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';
import DashbordPreview from '../../components/DashbordPreview';

const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const {updateUser} = useContext(UserContext);
    const navigate = useNavigate();

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    // Handle Sign Up Form Submit
    const handleSignUp = async (e) => {
      e.preventDefault(); 
      let profileImageUrl = "";
      if(!fullName) {
        setError("Please enter your name");
        return; 
      }
      if(!validateEmail(email)) {
        setError("Please enter the valid email address"); 
        return; 
      }
      if(!password) {
        setError("Please enter the password"); 
        return; 
      }
      setError("");
      // SignUp API Call
      try {
        // Upload image if present
        if (profilePic) {
          const imgUploadRes = await uploadImage(profilePic);
          profileImageUrl = imgUploadRes.imageUrl || "";
        }
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
          fullName,
          email,
          password,
          profileImageUrl
        });
        const { token, user } = response.data;
        if (token) {
          localStorage.setItem("token", token);
          updateUser(user);
          navigate("/dashboard");
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong. Please try again.");
        }
      }
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 relative overflow-hidden font-[Inter,sans-serif]">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-full blur-3xl opacity-15 translate-y-20 -translate-x-20"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-3xl opacity-10"></div>

        <div className="flex min-h-screen">
          {/* Left: Sign Up Form */}
          <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h2>
                <p className="text-gray-600">Join us today by entering your details below.</p>
              </div>
              <form onSubmit={handleSignUp} className="space-y-6">
                <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                <Input
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  label="Full Name"
                  placeholder="John"
                  type="text"
                />
                <Input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  label="Email Address"
                  placeholder="abc@example.com"
                  type="text"
                />
                <Input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                {error && (
                  <p className="bg-red-100 border border-red-300 text-red-600 rounded-md px-3 py-2 text-xs text-center animate-shake">{error}</p>
                )}
                <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl font-semibold transition-all duration-300 hover:from-purple-700 hover:to-purple-800 hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer mt-2">
                  SIGN UP
                </button>
                <p className="mt-6 text-center text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors cursor-pointer">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
          {/* Right: Dashboard Preview */}
          <DashbordPreview />
        </div>
      </div>
    );
}

export default SignUp;
