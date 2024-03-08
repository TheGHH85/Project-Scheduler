import React, {useState} from 'react';
import axios from 'axios';
import { useAuth } from '../Authentication/Auth';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import '../css/index.css';

function LoginPage() {
    const Navigate = useNavigate();
    const { login } = useAuth();
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleLogin = (e) => {
      e.preventDefault(); 
        axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: "http://localhost:8080/login"
        }).then((res) => {
            if(res.data.success) {
                login(res.data.user);
                Navigate("/MainPage");
            } else {
                alert("Wrong email or password, please try again");
            }
        }).catch((error) => {
            console.log("Error logging in", error);
            alert("Login failed, please try again.");
        });
    };

    const handleRegister = () => {
        Navigate("/RegisterPage");
    }

    return (
      <div className="flex flex-col min-h-screen  text-primarytext">
        <div className="flex-grow pb-16">
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <div className="flex flex-col items-center justify-center py-6">
                <h1 className="text-2xl font-bold mb-6">Welcome! Please login below:</h1>
                <form
                  className="flex flex-col space-y-4 w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
                  onSubmit={handleLogin}
                >
                  <label className="block text-sm font-medium text-black">
                    Username:
                  </label>
                  <input
                    className="border border-neutrallight p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-softblue text-neutraldark"
                    type="text"
                    name="name"
                    placeholder="Username"
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
      
                  <label className="block text-sm font-medium text-black">
                    Password:
                  </label>
                  <input
                    className="border border-neutrallight p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-softblue text-neutraldark"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
      
                  <div className="flex justify-between space-x-4">
                    <button
                      className="bg-accent1 hover:bg-accent2 text-white font-bold py-2 px-4 rounded"
                      type="submit"
                      onSubmit={handleLogin}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className="bg-softblue hover:bg-neutraldark text-white font-bold py-2 px-4 rounded"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </main>
          </div>
          <Footer className="mt-auto" />
        </div>
      </div>
    );
    
    
    }
export default LoginPage;