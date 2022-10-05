import './Index.css';
import Employees from './Pages/Employees';
import Header from '../src/Component/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Customers from './Pages/Customers';
import Dictionary from './Pages/Dictionary';
import Definition from './Pages/Definition';
import NewDictionary from './Pages/NewDictionary';
import Page404 from './Pages/404';

function App() {
    return (
    <>
         <BrowserRouter>
            <Header>
                <Routes>
                   <Route path="/employees" element={<Employees />} />
                   <Route path="/dictionary" element={<Dictionary />} />
                   <Route path="/newdictionary" element={<NewDictionary />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/customers/:id" element={<Customers />} />
                    <Route path="/definition/:search" element={<Definition />} />
                    <Route path="/404" element={<Page404 />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
                
            </Header>
        </BrowserRouter>
    </>)
    ;
}

export default App;
