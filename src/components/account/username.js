import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Username = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const apiCall = async () =>  {
            const response = await axios.get('http://localhost:8080/restapi/member/1'); 
            setData(response.data.payload);
        };
        apiCall();
    }, [])
    
    return (
        <div>{data.name}</div>
    )
}; 

export default Username;