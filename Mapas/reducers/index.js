import {combineReducers} from 'redux';
import coordenadas from './coordenadas';
import lugares from './lugares';

export default combineReducers({
    coordenadas,
    lugares
})  