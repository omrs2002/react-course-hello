import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewDictionary() {
    const [word, setWord] = useState('');
    const navigator = useNavigate();


    const handleSubmit = (e) => {
        
        e.preventDefault();
        if (word !== '') navigator('/definition/' + word);
        else {
            alert('fill text!');
            document.getElementById('txtword').focus();
        }
        console.log('form submitted ✅');
      };


    

    return (
        <form  onSubmit={handleSubmit} className='flex space-x-2'>
            <input
             className='px-2 rounded py-1 shrink-mw-0'
                type="text"
                id="txtword"
                onChange={(e) => {
                    setWord(e.target.value);
                }}
            />
            &nbsp;&nbsp;
            <button className="bg-purple-600 hover:bg-purple-700 text-white w-40 rounded w-15 h-9" type="submit" >
                Search
            </button>
        </form>
    );
}
