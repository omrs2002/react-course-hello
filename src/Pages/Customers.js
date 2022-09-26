import { useState } from "react";
import { useEffect } from "react";

function Customers() {

    const [x1, setX1] = useState(() => {
        return 1;
      });


    const [cnt,setCnt] = useState(0);

    useEffect(() => {
        document.title = `You clicked hello ${cnt} times`;
      });

    return (
    <>
    <div className="App bg-gray-300 min-h-screen">
        <center><h1>Hello Customers</h1></center>
        <button type="button" onClick={()=>{setCnt(cnt+1)}} >click!</button>
    </div>
    </>)
};


export default Customers;