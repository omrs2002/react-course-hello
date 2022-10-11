import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function AddCustomer(props) {
    
    const [show, setShow] = useState(props.show);

    const [name, setName] = useState('');
    const [industry, setIndustry] = useState('');


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button
                onClick={props.toggleShow}
                className="px-4 py-1 text-sm bg-purple-600 text-white font-semibold rounded-full border border-purple-400 hover:text-gray hover:bg-purple-700  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
                + Add Customer
            </button>
            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Customer:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        id="addmodal"
                        className="w-full max-w-sm"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if(name === '' || industry==='' )
                              {
                                alert('plz fill data!');
                                return false;
                              }
                            console.log('hellow from Add emp.');
                            setName('');
                            setIndustry('');
                            props.newCustomer(name, industry);
                          
                            setShow(false);
                        }}
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    htmlFor="role"
                                >
                                    Industry
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="industry"
                                    type="text"
                                    value={industry}
                                    onChange={(e) => {
                                        setIndustry(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Modal.Footer>
                        <button
                            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                            onClick={props.toggleShow}
                        >
                            Close
                        </button>
                        <button
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                            form="addmodal"
                        >
                             Add Customer
                        </button>
                    </Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}
