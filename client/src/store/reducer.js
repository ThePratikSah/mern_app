const initialState = {
    isAuthenticated:false,
};

const reducer = (store = initialState, action) =>{
    switch(action.type){
        case 'AUTHENTICATED':
            return {
                isAuth: true
            }
        case 'NOT-AUTHENTICATED':
            {
                return {
                    isAuthenticated: false
                }
            }
    }
    return state;
};

export default reducer;