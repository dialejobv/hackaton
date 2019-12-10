import {connect} from 'react-redux';
import React, {Component} from 'react';
import { PermissionsAndroid } from 'react-native';
import {addCoordenadas} from '../../actions/coordenadas';
import {addLugares} from '../../actions/lugares';
import {View, StyleSheet, Dimensions,TouchableOpacity,Text} from 'react-native';
import RetroMapStyles from '../MapsStyles/RetroMapStyles.json';
import Autocompletar from './autocompletar';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { PROVIDER_GOOGLE,Callout, Marker, ProviderPropType} from 'react-native-maps';

let {width,height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -0.225219;
const LONGITUDE = -78.5248;
const LATITUDE_DELTA  = 0.00792;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO 
let id = 0;
global.uno = -0.225219;
global.dos = -78.5248;
global.tres = 4.668382;
global.cuatro = -74.114274;
global.cinco = {text: "0 km", value: 0.001}
global.seis =  0;

export function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
  tres = e.nativeEvent.coordinate.latitude;
  cuatro = e.nativeEvent.coordinate.longitude;
}

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

class MapVisual extends Component{
    
    constructor() {
        super();
        this.watchID = null;
        this.state = {
          region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          markers: [],
        };
      }

      async requestLocationPermission() {
        const chckLocationPermission =  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
            alert("Tu ubicación esta activada");
        } else {
           
                if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
                    alert("Su ubicación está activa");
                } else {
                    alert("Su ubicación esta desactivada, por favor actívela");
                }
            
        }
    };


   componentDidMount() {
        this.analisis();
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState({
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            });
          },
        (error) => console.log(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        this.watchID = navigator.geolocation.watchPosition(
          position => {
            this.setState({
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            });
          }
        );
      }

      prueba (){
        try{
          var googleMapsClient=require('react-native-google-maps-services').createClient({
            key: 'AIzaSyCK-YiEND7EmFH3TeIST5jLgA6e3OluDCY'
          });
          googleMapsClient.distanceMatrix({
            origins: {lat:this.state.region.latitude,lng:this.state.region.longitude},
            destinations: {lat:uno,lng:dos},
            mode: 'driving'
          },function(err,response){
            if(!err){
              console.log(response.json.rows);
              cinco = response.json.rows[0].elements[0].distance;
              console.log(cinco,"Valor adentro");
            }
          });
        }catch{
            console.log("Error");
        }
      }

      onMapPress(e) {
        this.setState({
          markers: [
            ...this.state.markers,
            {
              coordinate: e.nativeEvent.coordinate,
              key: id++,
              color: randomColor(),
            },
          ],markers: [...this.state.markers],
        });
        uno = e.nativeEvent.coordinate.latitude;
        dos = e.nativeEvent.coordinate.longitude;
        seis = 1;
      }

      analisis(){
        switch (this.props.coordenadas.certeza){
          case 1:
              global.uno = this.props.coordenadas.latid;
              global.dos = this.props.coordenadas.longi;
              this.prueba();
              console.log(cinco.value,"Autocompletar");
              this.props.coordenadas.certeza = 0;  
          break;
          default:
              switch (seis){
                case 1:
                    this.prueba();
                    console.log(cinco.value,"BuscadorLug");
                    this.props.coordenadas.certeza = 0;
                break;
                default:
                    global.uno = 4.6546684;
                    global.dos = -74.076408; 
                    this.props.coordenadas.certeza = 0;
                break;
              }
          break;
        }
      }

      getCoordsFromName(loc){
          this.updateState({
              latitude: loc.lat,
              longitude: loc.lng,
          });
      }

    render(){
      this.analisis();
      this.requestLocationPermission();
      console.log(cinco,"Resultado Final");
        return(
        <View>
          <MapView
             provider={ PROVIDER_GOOGLE }
             style={ styles.container }
             customMapStyle={ RetroMapStyles }
             showsUserLocation={ true }
             region={ this.state.region }
             onPress={e => this.onMapPress(e)}
            >
        
            <MapView.Marker coordinate={{latitude:uno,longitude:dos}}/>
            <MapViewDirections
             origin={this.state.region}
             destination={{latitude:uno,longitude:dos}}
             apikey={'AIzaSyCK-YiEND7EmFH3TeIST5jLgA6e3OluDCY'}
             strokeWidth={3}
             strokeColor="blue"
             />

            {this.state.markers.map(marker => (
            <Marker
            key={marker.key}
            coordinate={marker.coordinate}
            pinColor={marker.color}
            onPress={e => log('onPress', e)}
            /> 
            ) )}

          </MapView>
          
          <Callout>
            <View style={styles.calloutView}>
            <Autocompletar notifyChange={(loc)=>this.getCoordsFromName(loc)}/> 
            </View>
          </Callout>

        </View>
        );
    }
}

export default connect ((state) => {return {coordenadas:state.coordenadas, lugares:state.lugares};},{addLugares})(MapVisual)

MapVisual.propTypes = {
  provider: ProviderPropType,
};


const styles = StyleSheet.create({
        container:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        },
        calloutView:{
        backgroundColor: "rgba(255,255,255,0.9)",
        marginLeft: 90, 
        marginRight: 100,
        marginTop: 10,
        width: 200,
        borderRadius: 1,
        alignItems: 'center'
        },
        botonLim:{
          backgroundColor: "rgba(25,25,25,0.9)",
          marginLeft: 30, 
          marginRight: 100,
          marginTop: 10,
          width: 50,
          height:30,
          borderRadius: 1,
          alignItems: 'center'
        },
        Text:{
          fontWeight:'bold',
          color: 'white',
          fontSize: 12,  
      },
   });