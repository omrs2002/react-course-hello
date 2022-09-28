import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams,useNavigate,Link } from 'react-router-dom';

export default function Definition() {
    const [word, setWord] = useState();
    let { search } = useParams();
    const navigate = useNavigate();
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + search;
        fetch(url)
            .then((response) => 
            {
                if(response.status === 200)
                    return response.json();
                else
                {
                    console.log(response.status);
                    //navigate('/404');
                    setNotFound(true);
                }
            }
            )
            .then((data) => {
                if(data)
                    setWord(data[0].meanings);
            });
    }, []);

    if (notFound === true) {
        return (
            <>
                <notFound />
                <Link to="/NewDictionary">Search another</Link>
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
