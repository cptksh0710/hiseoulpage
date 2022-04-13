import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/restapi/member', //test용 https://jsonplaceholder.typicode.com/todos/1  
      );
      setData(response.data);
      // 콘솔에 데이터 값 있는지 출력!
      console.log(response.data.payload[0]);
      //
    } catch (e) {
      console.log(e);
      
    }
  };
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>

      {data && (
        <textarea
          rows={7}
          value={JSON.stringify(data, null, 2)}
          readOnly={true}
        />
      )}
    </div>
  );
}

export default App;