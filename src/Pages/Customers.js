import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { v4 as uuidv4 } from 'uuid';
import Table from 'react-bootstrap/Table';
import { baseUrl } from '../shared';
import AddCustomer from '../Component/AddCustomer';

export default function Customers() {
    const [customers, setCustomers] = useState();
    const [show, setShow] = useState(false);

    function toggleShow() {
        setShow(!show);
    }

    useEffect(() => {
        //console.log('Fetching...');
        
        fetch( baseUrl+'Customers')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCustomers(data);
            });
    }, []);

    function newCustomer(name, industry) {
        const data = {name: name, industry: industry };
        const url = baseUrl + 'customers/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                return response.json();
            })
            .then((data) => {
                toggleShow();
                console.log('new customer from db:',data);
                setCustomers([...customers, data]);
                console.log('customers',customers);
                //make sure the list is updated appropriately
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <>
            <h1>Here are our customer:</h1>
            <h3>
            <AddCustomer
                newCustomer={newCustomer}
                show={show}
                toggleShow={toggleShow}
            />
                </h3>
            <Table striped bordered hover responsive  variant="dark"> 
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Industry Name</th>
                    </tr>
                </thead>
                <tbody>
                    {customers
                        ? customers.map((customer,index) => {
                              return (
                                  <tr key={index}>
                                      <td>{customer.id}</td>
                                      <td>
                                      <Link
                                              key={customer.id}
                                              to={'/customer/' + customer.id}
                                          >
                                              {customer.name}
                                          </Link>
                                        </td>
                                        <td>{customer.industry}</td>
                                  </tr>
                              );
                          })
                        : null}
                </tbody>
            </Table>
        </>
    );
}
