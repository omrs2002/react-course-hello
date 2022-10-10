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
    const [notFound, setNotFound] = useState();
    function callDelete() {
        const url = baseUrl + 'customers/' + id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
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
        fetch(url)
            .then((response) => {
                if (response.status === 404) {
                    //render a 404 component in this page
                    setNotFound(true);
                }

                return response.json();
            })
            .then((data) => {
                setCustomer(data);
            });
    }, [id]);
    return (
        <>
            {notFound ? <p>The customer with id {id} was not found</p> : null}

            {customer ? (
                <>
                    <div>
                        <p>{customer.id}</p>
                        <p>{customer.name}</p>
                        <p>{customer.industry}</p>
                    </div>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                    <br/>
                    <hr/>
                </>
            ) : null}
            <Link to="/customers">Go back</Link>
        </>
    );
}