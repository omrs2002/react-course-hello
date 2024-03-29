import { useEffect, useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import { v4 as uuidv4 } from 'uuid';
import Table from 'react-bootstrap/Table';
import { baseUrl } from '../shared';
import AddCustomer from '../Component/AddCustomer';
import { useLocation } from 'react-router-dom';
//import { LoginContext } from '../App';


export default function Customers() {
    const [customers, setCustomers] = useState();
    const [show, setShow] = useState(false);
    
    //const [loggedIn,changeLoggedIn] = useContext(LoginContext);

    const navigate = useNavigate();
    const location = useLocation();
    
    function toggleShow() {
        setShow(!show);
    }

    useEffect(() => {
        //console.log('loggedIn',loggedIn);
        console.log('localStorage(access_token)',localStorage.getItem('access_token'));
        fetch( baseUrl+'Customers',{
            headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
                }    
        })
            .then((response) => {
                console.log('Get customers response:',response);
                if (response.status === 401 || response.status === 204) {
                    //changeLoggedIn(false);
                    navigate('/login',
                    {
                        state:{
                            previosUrl:location.pathname,
                        }
                    }
                    );
                }

                return response.json();


            })
            .then((data) => {
                //console.log(data);
                setCustomers(data);
            }).catch((e)=>
            {
                console.log('Get customers response:',e.message);
                if
                (
                    e.message === 'Failed to fetch' || 
                    e.message === 'NetworkError when attempting to fetch resource.'
                )
                {
                    //changeLoggedIn(false);
                    navigate('/login',
                        {
                            state:{
                                previosUrl:location.pathname,
                            }
                        }
                        );
                }
            });
    }, []);

    function newCustomer(name, industry) {
        const data = {name: name, industry: industry };
        const url = baseUrl + 'customers/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
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
