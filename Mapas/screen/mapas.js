import React, {Component} from 'react';
import {View} from 'react-native';
import MapVisual from './ComMaps/mapVisual';

 
export default class Mapas extends Component{      
    render(){
        return(
            <View>
                <MapVisual/>
            </View>
        );
    }
}