import React, {Component} from 'react';
import Mapas from './mapas';
import {connect} from 'react-redux';

class MapsScreen extends Component{

    constructor(props){
        super(props);
    } 

    render(){
        return(
            <Mapas/>
        );
    }

}
export default connect ((state) => {return {user:state.user};})(MapsScreen)