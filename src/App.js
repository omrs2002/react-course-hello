import './Index.css';
import Employee from './Component/Employee';
import { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';

function App() {
    const showEmployees = true;
    const [role, SetRole] = useState('dev');
    const [employees, setEmployees] = useState([
      {
        name: 'Caleb',
        role: 'YouTube Sensation',
        img: 'https://cdn4.iconfinder.com/data/icons/sketchy-basic-icons/95/smile-128.png',
    },
    {
        name: 'Sal',
        role: 'Manager',
        img: 'https://cdn2.iconfinder.com/data/icons/avatars-60/5985/19-Journalist-128.png',
    },
    {
        name: 'John',
        role: 'Director of Eng.',
        img: 'https://cdn2.iconfinder.com/data/icons/avatars-60/5985/36-Grandfather-128.png',
    },
    {
        name: 'Melanie',
        role: 'Software Engineer',
        img: 'https://cdn4.iconfinder.com/data/icons/sketchy-basic-icons/95/smile-128.png',
    },
    {
        name: 'Corey',
        role: 'The Devops Guy',
        img: 'https://cdn2.iconfinder.com/data/icons/avatars-60/5985/19-Journalist-128.png',
    },
    {
        name: 'Jake',
        role: 'Senior',
        img: 'https://cdn2.iconfinder.com/data/icons/avatars-60/5985/36-Grandfather-128.png'
    }
    ]);
    const listItems = employees.map((emp) => {
      console.log(emp.id);
        return <Employee key={uuidv4()} name={emp.name} role={emp.role} img={emp.img} />;
    });

    
    return (
        <div className="App">
            <header className="App-header">
                <span>
                    <h1 className="text-3xl font-bold underline bg-red-300">
                        Welocme to react
                    </h1>
                    {showEmployees ? (
                        <>
                            Enter role:
                            <input
                                type="text"
                                onChange={(e) => {
                                    SetRole(e.target.value);
                                }}
                                className="text-1xl font-bold bg-gray-300"
                            ></input>
                            <br />
                            <Employee name="Omar Abuhadid" role={role} img='https://cdn4.iconfinder.com/data/icons/sketchy-basic-icons/95/smile-128.png' />
                        </>
                    ) : (
                        <p>no Employees!</p>
                    )}
                    <hr />
                    <div className="flex flex-wrap justify-center">
                        {listItems}
                    </div>
                </span>
            </header>
        </div>
    );
}

export default App;
