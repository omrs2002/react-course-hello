import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useParams, Link } from 'react-router-dom';
import Page404 from './404';
import { Alert } from 'react-bootstrap';

export default function Definition() {
    const [word, setWord] = useState();
    let { search } = useParams();
    const navigate =  useNavigate();
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(false);
    //const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + search;
        if(search === '500')
        url = 'http://httpstat.us/501';

        //const url = 'http://https90870987ta908798.us/401';
        //const url = 'http://httpstat.us/501';

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    console.log('we got error !');
                    setError(true);
                }
                console.log(response.status);
                if (response.status === 200) 
                    return response.json();
                else if (response.status === 404) {
                    setNotFound(true);
                    console.log('we got 401 status !');
                }
            })
            .then((data) => {
                if (data) setWord(data[0].meanings);
            })
            .catch((e) => {
                console.log(e.message);
                setNotFound(true);
            });
    }, [search]);

    if (notFound === true) {
        return (
            <>
                <Page404 />
                <Link to="/NewDictionary">Search another</Link>
            </>
        );
    }

    if (error === true) {
        return (
            <>
                <Alert
                    variant="danger"
                    onClose={() => {
                        //setError(false);
                        navigate('/NewDictionary');
                    }}
                    dismissible
                >
                    <Alert.Heading>Something went wrong!</Alert.Heading>
                    <p>word not found!</p>
                    
                    <Link to="/NewDictionary">Search for a nother</Link>
                </Alert>
            </>
        );
    }

    return (
        <>
            <h1>Here is a definition:</h1>
            {word ? (
                word.map((meaning) => {
                    return (
                        <li key={uuidv4()}>
                            {meaning.partOfSpeech +
                                ': ' +
                                meaning.definitions[0].definition}
                        </li>
                    );
                })
            ) : (
                <p>Loading ...</p>
            )}
        </>
    );
}
