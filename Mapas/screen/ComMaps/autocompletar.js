import React, {Component} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {addCoordenadas} from '../../actions/coordenadas'
import {connect} from 'react-redux';

class Autocompletar extends Component{

    constructor() {
        super();
      }

  render(){
    
    return(
        <GooglePlacesAutocomplete
        placeholder= 'Elige tu destino'
        minLength={2}
        autoFocus={true}
        listViewDisplayed='true'  
        returnKeyType={'search'}
        fetchDetails={true}
        renderDescription={row => row.description}
        getDefaultValue={()=>''}
        onPress={(data,details = null) => {
            var latid = details.geometry.location.lat;
            var longi = details.geometry.location.lng;
            var certeza = 1;
            this.props.addCoordenadas({latid,longi,certeza});  
        }
        }
        getDefaultValue={()=>''}
        query={{
            key:'AIzaSyCK-YiEND7EmFH3TeIST5jLgA6e3OluDCY',
            language: 'en',
            input: 'Bogota',
        }}
        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={200}
        styles={{
            textInputContainer:{
                width:'100%'
            },
            textInput:{
            height:40,
            width: 200,
            borderWidth:1,
            marginTop: 10,
            },
            predefinedPlacesDescription:{
                color: 'white'
            },
        }}
        currenLocation={false}
        />
    );    
  }
}

export default connect ((state) => {return {coordenadas:state.coordenadas};},{addCoordenadas})(Autocompletar)