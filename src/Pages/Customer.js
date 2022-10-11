import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseUrl } from '../shared';
import Button from 'react-bootstrap/Button';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function Customer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [notFound, setNotFound] = useState();
    function callDelete() {
        const url = baseUrl + 'customers/' + id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                navigate('/customers');
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function handleDelete() {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        callDelete();
                    },
                },
                {
                    label: 'No',
                    onClick: () => {},
                },
            ],
        });
    }
    useEffect(() => {
        const url = baseUrl + 'Customers/' + id;
        console.log(url);
        fetch(url,
            {
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('access_token')
                    }    
            }
            )
            .then((response) => {
                if (response.status === 404) {
                    //render a 404 component in this page
                    setNotFound(true);
                }

                return response.json();
            })
            .then((data) => {
                setCustomer(data);
                setTempCustomer(data);})
            .catch((e)=>
            {
                console.log(e.message);
                if(e.message === 'Failed to fetch')
                navigate('/login');
            });

    }, [id]);
    function updateCustomer() {
        const url = baseUrl + 'Customers/';
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            },
            body: JSON.stringify(tempCustomer),
        })
            .then((response) => {
               
                if (response.status === 401) {
                    navigate('/login');
                }
                
                if(response.ok)
                    navigate('/customers');

                return response.json();
            })
            .catch((e) => {
                console.log(e);
            });
    }
    return (
        <>
            {notFound ? <p>The customer with id {id} was not found</p> : null}

            {customer ? (
                <>
                    <div>
                    <input
                        className="m-2 block px-2"
                        type="text"
                        value={tempCustomer.name}
                        onChange={(e) => {
                            setTempCustomer({
                                ...tempCustomer,
                                name: e.target.value,
                            });
                        }}
                    />
                    <input
                        className="m-2 block px-2"
                        type="text"
                        value={tempCustomer.industry}
                        onChange={(e) => {
                            setTempCustomer({
                                ...tempCustomer,
                                industry: e.target.value,
                            });
                        }}
                    />
                    </div>
                    <Button variant="danger"   className='m-2' onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button onClick={updateCustomer} className='m-2' variant="primary">Save</Button>
                    <br/>
                    <hr/>
                </>
            ) : null}
            <Link to="/customers">Go back</Link>
        </>
    );
}