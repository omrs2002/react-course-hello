function Employee(props) {
    return(
        <>
        <div className="rounded-lg bg-blue-100 m-5">
        <h3> Eployee Name : {props.name} -  {props.role ? <p>Role is : {props.role}</p> : <p>--no role--</p>} </h3>
        <br/>
        <button className="px-4">Update</button>
        </div>
        </>
    );
}
export default Employee;
