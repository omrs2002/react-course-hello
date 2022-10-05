import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function Customers() {
    const [customers, setCustomers] = useState();

    useEffect(() => {
        console.log('Fetching...');
        fetch('https://localhost:7281/Customers')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCustomers(data);
            });
    }, []);

    return (
        <>
            <h1>Here are our customer:</h1>
            {customers
                ? customers.map((customer, index) => {
                      return (
                          <li key={customer.id}>
                              <Link
                                  key={index}
                                  to={'/customers/' + customer.id}
                              >
                                  {customer.name}
                              </Link>
                          </li>
                      );
                  })
                : null}
        </>
    );
}
