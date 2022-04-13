const _SAVE = 'DATA_SAVE';
const _SELECT = 'DATA_SELECT'
const _EDIT = 'DATA_EDIT'
const _DELETE = 'DATA_DELETE'
 
export const dataSave = (inputData) => ({
    type: _SAVE,
    inputData: {
        id: inputData.id,
        title: inputData.title,
        content: inputData.content
    }
})
 
export const selectRow = (id) => (
    console.log('reducer :: id :: ', id),
    {
    type: _SELECT,
    inputData: {
        id: id,
    }
})
 
export const editContent = (inputData) => (
    console.log('reducer :: edit :: ', inputData),
    {
    type: _EDIT,
    inputData: {
        id: inputData.id,
        title: inputData.title,
        content: inputData.content
    }
})
 
// 삭제할 id값을 받아온다.
export const removeContent = (id) => ({
    type: _DELETE,
    inputData: {
        id: parseInt(id)
    }
})
 
const initialState = {
    lastId: 0,
    inputData: [
        {
            id: '',
            title: '',
            content: ''
        }
    ],
    selectRowData: {}
}
 
export default function boardReducer(state = initialState, action){
    switch(action.type) {
        case _SAVE:
            console.log(state.inputData)
            return {
                lastId: state.lastId + 1,
                inputData: state.inputData.concat({
                    ...action.inputData,
                    id: state.lastId + 1,
                })
            }
        case _SELECT:
            console.log(action)
            return {
                ...state,
                selectRowData: state.inputData.find(row => row.id === action.inputData.id)
            }
        case _EDIT:
            return {
                ...state,
                inputData: state.inputData.map(row =>
                    row.id === action.inputData.id ?
                    {...action.inputData} : row    
                ),
                selectRowData: {}
            }
        case _DELETE:
            return {
            	// lastId 값이 현재 삭제 요청된 id값과 동일하면 값을 줄여준다.
                lastId: state.lastId === action.inputData.id ? state.lastId - 1 : state.lastId,
                // filter를 사용하여 state에 있는 값과 action.id 값이 동일하지 않은 값만 return 하여 state 에 저장해준다.
                inputData: state.inputData.filter(row =>
                    row.id !== action.inputData.id
                ),
                selectRowData: {}
            }
        default:
            return state
    }
}