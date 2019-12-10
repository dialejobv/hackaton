export default (state = {}, action) =>{
    switch(action.type){
        case 'LUGARES': 
            return action.lugares;
        default: 
            return state; 
    }
}