const initialState = {
    data: []
}

const leaderBoardReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SETLEADERBOARD":
            return {...state, data: action.payload}     
        default:
            return state
    }
}

export default leaderBoardReducer