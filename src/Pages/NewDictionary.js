import { useState } from 'react';
import { useNavigate } from 'react-router-dom' ;

export default function NewDictionary() {
    const [word, setWord] = useState('');
    const navigator = useNavigate();
    return (
        <>
            <input
                type="text"
                id="txtword"
                onChange={(e) => {
                    setWord(e.target.value);
                }}
            />&nbsp;&nbsp;
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded w-15 h-9"
             onClick={()=> {
                if(word !== '' )
                    navigator('/definition/'+ word);
                else
                {
                    alert('fill text!');
                    document.getElementById('txtword').focus();

                }
            }}>Search</button>
        
        
        </>

    );
}