import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
//import NotFound from '../components/NotFound';
import { baseUrl } from '../shared';


export default function Customer() {
    const { id } = useParams();
    //const navigate = useNavigate(); //not used
    const [customer, setCustomer] = useState();
    const [notFound, setNotFound] = useState();
    useEffect(() => {
        const url =  baseUrl+'Customers/' + id;
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
                <div>
                    <p>{customer.id}</p>
                    <p>{customer.name}</p>
                    <p>{customer.industry}</p>
                </div>
            ) : null}
            <Link to="/customers">Go back</Link>
        </>
    );
}