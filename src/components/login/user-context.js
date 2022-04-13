import React, {useContext, createContext, useState} from 'react';

const Context = createContext({
    setUser: () => {},
});

export function UserContextProvider({ children }) {
    //input에서 입력한 아이디와 비밀번호 정보를 담기위한 state
    const [user, setUser] = useState({
        id: "",
        password: "",
    });

    return (
      //변수명.Provider 문법으로 그 범위 안에있는 컴포넌트한테 값을 공유할 수 있음
      //value값에 전송할 props 넣기 속성명(value)는 임의변경 불가
      <Context.Provider
        value={{
            user,
            setUser
        }}
      >
        {children}
      </Context.Provider>
    )
}

export function useUserContext() {
    return useContext(Context)
}