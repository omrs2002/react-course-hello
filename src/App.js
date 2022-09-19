import './Index.css';
import Employee from './Component/Employee';
import { useState } from 'react';

function App() {
    const showEmployees = true;
    const [role, SetRole] = useState('dev');
    const [employees, setEmployees] = useState([
        {id:1, name: 'a1', role: 'r1' },
        {id:2, name: 'a2', role: 'r2' },
        {id:3, name: 'a3', role: 'r3' },
        {id:4, name: 'a4', role: 'r4' },
    ]);
    const listItems = employees.map((emp) => {
        return <Employee key={emp.id} name={emp.name} role={emp.role} />;
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
                            <Employee name="Omar Abuhadid" role="Engineer" />
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
