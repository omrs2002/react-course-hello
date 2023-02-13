import './Index.css';
import { createContext,  useState, useEffect } from 'react';
import Employees from './Pages/Employees';
import Header from '../src/Component/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Customers from './Pages/Customers';
import Definition from './Pages/Definition';
import NewDictionary from './Pages/NewDictionary';
import Page404 from './Pages/404';
import Welcome  from './Pages/Welcome';
import Customer from './Pages/Customer';
import Recaptcha from './Pages/Recaptcha';
import Login from './Pages/login';
import { baseUrl } from './shared';
export const LoginContext = createContext();

function App() {
   console.log('localStorage.getItem(access_token) from app:',localStorage.getItem('access_token'));
   useEffect(() => {
    function refreshTokens() {
        
        var curr_ref = localStorage.getItem('refresh_token');
        console.log('refresh token refill ...', curr_ref);
        if (curr_ref!=null && curr_ref!=='' && curr_ref!=='null') {
            const url = baseUrl + 'Users/refreshToken';
            console.log('url',url);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    Token: curr_ref,
                }),
            })
             .then((response) => {
                
                    //revokeRefreshTokens(curr_ref);
                    return response.json();
                })
                .then((data) => {
                    console.log('access_token refilled!');
                    localStorage.setItem('access_token',data.token);
                    localStorage.setItem('refresh_token',data.refreshToken);
                    setLoggedIn(true);
                });
        }
    }
    const Minuts = (1000 * 60) * 1 ;//15 Minuts
    refreshTokens();
    setInterval(refreshTokens, Minuts);
}, []);


    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem('access_token') ? true : false
    );

    function changeLoggedIn(value) {
        setLoggedIn(value);
        if (value === false) {
            localStorage.clear();
            //localStorage.setItem('access_token',null);
        }
    }


    return (
    <>
        <LoginContext.Provider  value={[loggedIn,changeLoggedIn]}>
         <BrowserRouter>
            <Header>
                <Routes>
                    <Route path="/" element={<Employees />} />
                   <Route path="/employees" element={<Employees />} />
                   <Route path="/newdictionary" element={<NewDictionary />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/customer/:id" element={<Customer />} />
                    <Route path="/definition/:search" element={<Definition />} />
                    <Route path="/404" element={<Page404 />} />
                    <Route path="*" element={<Welcome />} />
                    <Route path="/recaptcha" element={<Recaptcha />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                
            </Header>
        </BrowserRouter>
        </LoginContext.Provider>
    </>)
    ;
}

export default App;
