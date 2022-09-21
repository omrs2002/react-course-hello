import './Index.css';
import Employees from './Pages/Employees';
import Header from '../src/Component/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Customers from './Pages/Customers';

function App() {
    return (
    <>
        <Header>
            <BrowserRouter>
            <Routes>
                <Route path='/Employees' element={<Employees />}/>
                <Route path='/Customers' element={<Customers />}/>
            </Routes>
            </BrowserRouter>
            
        </Header>
    </>)
    ;
}

export default App;
