import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { v4 as uuidv4 } from 'uuid';
import Table from 'react-bootstrap/Table';
import { baseUrl } from '../shared';

export default function Customers() {
    const [customers, setCustomers] = useState();

    useEffect(() => {
        console.log('Fetching...');
        
        fetch( baseUrl+'Customers')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCustomers(data);
            });
    }, []);

    return (
        <>
            <h1>Here are our customer:</h1>
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
