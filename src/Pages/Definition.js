import { useState,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import{ useParams} from 'react-router-dom';


export default function Definition(){

    const [word,setWord] = useState();
    let {search} = useParams();
    
    

    useEffect(()=>
    {
       
        const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+ search;
        fetch(url)
        .then(response => response.json())
        .then((data) =>
        {
            //console.log(data);
            //console.log(data[0].meanings);
            setWord (data[0].meanings);

        } 
        );
        //.then(json =>this.setState({ employees: json }))


    },[]);

    return (
        <>
            <h1>Here is a definition of {search}:</h1>
            { word?.map((meaning) => {
                      return (
                        
                          <li key={uuidv4()}>
                              {meaning.partOfSpeech + ': ' + meaning.definitions[0].definition}
                          </li>
                      );
                  })
                }
        </>
    );

    // return (
    //     <>
    //         <h1>Here is a definition:</h1>
    //         {word
    //             ? word.map((meaning) => {
    //                   return (
                        
    //                       <li key={uuidv4()}>
    //                           {meaning.partOfSpeech + ': ' + meaning.definitions[0].definition}
    //                       </li>
    //                   );
    //               })
    //             : null}
    //     </>
    // );
}