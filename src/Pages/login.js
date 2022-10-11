import { useEffect, useState } from 'react';
import { baseUrl } from '../shared';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        console.log('location.state.previosUrl',location.state.previosUrl);
    });
    function login(e) {
        e.preventDefault();
        const url = baseUrl + 'Users';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                
                //console.log('access_token',data.value);
                localStorage.setItem('access_token',data.value);
                navigate( location?.state?.previousUrl
                    ? location.state.previousUrl
                    : '/customers');
                //localStorage.setItem('refresh_token',data.refresh);
                //console.log(localStorage);
                //console.log(localStorage.getItem('access_token'));
            });
    }

    return (
        <form className="m-2 w-full max-w-sm" id="customer" onSubmit={login}>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label htmlFor="username">Username</label>
                </div>

                <div className="md:w-3/4">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label htmlFor="password">Password</label>
                </div>

                <div className="md:w-3/4">
                    <input
                        id="password"
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Login
            </button>
        </form>
    );
}