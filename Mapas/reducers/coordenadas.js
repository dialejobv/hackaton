export default (state = {}, action) =>{
    switch(action.type){
        case 'COORDENADAS': 
            return action.coordenadas;
        default: 
            return state; 
    }
}