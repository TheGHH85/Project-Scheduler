import React from 'react';
import axios from 'axios';
import HeaderNav from '../components/navbar';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';



function RegisterForm(){
    const navigate = useNavigate();
    const [registerUserName, setRegisterUserName] = React.useState("");
    const [registerPassword, setRegisterPassword] = React.useState("");
    const [registerRole, setRegisterRole] = React.useState("");

    const register = (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        axios({
            method: "POST",
            data: {
                username: registerUserName,
                password: registerPassword,
                role: registerRole,
            },
            withCredentials: true,
            url: "http://52.91.94.163:8080/register",
        }).then((res) => {
            console.log(res);
            navigate("/");
        }).catch((error) => {
            if (error.response && error.response.status === 409) {
                alert("Email already used, please try again.");
            } else {
                console.error("Registration error:", error);
            }
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
        <div className="flex-grow pb-16">
        <div className="flex flex-col min-h-screen">
          <HeaderNav />
          <main className="flex-grow">
            <div className="flex flex-col items-center justify-center py-6">
              <h1 className="text-2xl font-bold text-white mb-6">Register a New User</h1>
              <form
                className="flex flex-col space-y-4 w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
                onSubmit={register}
              >
                        <label className="block text-sm font-medium text-gray-700">
                          Username:
                        </label>
                        <input
                          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          type="text"
                          name="name"
                          placeholder="Username"
                          onChange={(e) => setRegisterUserName(e.target.value)}

                        />
              
                        <label className="block text-sm font-medium text-gray-700">
                          Password:
                        </label>
                        <input
                          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          type="password"
                          placeholder="Password"
                          onChange={(e) => setRegisterPassword(e.target.value)}

                        />

                        <label className="block text-sm font-medium text-gray-700">
                          Role:
                        </label>
                        <select
  name="role"
  onChange={(e) => setRegisterRole(e.target.value) }
  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">Select Role</option> {/* Ensure there's a default option or remove it based on your needs */}
  <option value="Trainer">Trainer</option>
  <option value="Admin">Admin</option>
</select>
              
                        
                          <div className="flex justify-between space-x-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  onClick={register}
                >
                  Register
                </button>
                
              </div>
            </form>
          </div>
        </main>
        </div>
        <Footer className="mt-auto">
        </Footer>
        </div>
      </div>
    );

}

export default RegisterForm;