import './Index.css';
import Employees from './Pages/Employees';
import Header from '../src/Component/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Customers from './Pages/Customers';
import Dictionary from './Component/Dictionary';

function App() {
    return (
    <>
         <BrowserRouter>
            <Header>
                <Routes>
                   <Route path="/employees" element={<Employees />} />
                   <Route path="/dictionary" element={<Dictionary />} />
                    <Route path="/customers" element={<Customers />} />
                    
                </Routes>
                
            </Header>
        </BrowserRouter>
    </>)
    ;
}

export default App;
