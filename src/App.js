import './App.css';
import Employee from './Component/Employee';
import { useState } from 'react';

function App() {

  const showEmployees = true;
  const [role,SetRole] = useState('dev');

  return (
    <div className="App">
      <header className="App-header">
      <span>
       
           Welocme 
            
           {showEmployees ? 
           <>
           <input type='text' onChange={(e) => {SetRole(e.target.value);}} ></input>
              <Employee name="Omar Abuhadid" role="Engineer" />
              <Employee name="Ahmad" role = {role}/>
              </>
              :
              <p>no Employees!</p>
           }
        </span>
      </header>
    </div>
  );
}

export default App;
