const initialState = {
    initialBoard: [],
    loading: false,
    usingSolve: false,
    status: ''

}
const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SETINITIALBOARD":
            return {...state, initialBoard: action.payload}
        case "SETLOADINGBOARD":
            return {...state, loading: true}
        case "DONELOADINGBOARD":
            return {...state, loading: false }
        case "USINGSOLVE":
            return {...state, usingSolve: true}
        case "USINGSOLVEFALSE":
            return {...state, usingSolve: false}
        case "UPDATESTATUS":
            return {...state, status: action.payload}
        case "EMPTYSTATUS":
            return {... state, status: ''}
        default:
            return state
    }
}
export default boardReducer