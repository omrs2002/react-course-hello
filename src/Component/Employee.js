function Employee(props) {
    return(
        <>
        <h3> Eployee Name : {props.name}</h3>
            <h4> role : {props.role ? props.role : ' --no role--'}</h4>
            {props.role ? <p>{props.role}</p> : <p>--no role--</p>}
            <hr></hr>

        </>
        
    );
}
export default Employee;
