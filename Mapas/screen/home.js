import React, { Component} from 'react';
import { View, TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MapsScreen from './MapsScreen'

class NavigationDrawerStructure extends Component {
 
    toggleDrawer = () => {
      this.props.navigationProps.toggleDrawer();
    }

  render() {
    return (     
      <View style={{ flexDirection: 'row', margin: 15}}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
        <Ionicons name = 'md-car' size={24} color = 'white' /> 
        </TouchableOpacity>
      </View>
    );
  }
}

const MapNavigator = createStackNavigator({
    First: {
      screen: MapsScreen,
      navigationOptions: ({ navigation }) => ({      
        title: 'Easytrici',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#01071A' , 
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }),
    },
  });

  const DrawerNavigatorMenu = createDrawerNavigator(
    {
      Maps: {
        screen: MapNavigator,
        navigationOptions: {
        drawerLabel: 'Viajar',            
        },
      },
    },
  );
  
  const totalScreens = createAppContainer(DrawerNavigatorMenu)

  const AppAlerts = createSwitchNavigator(
  {    
      home: totalScreens    
  },
  {
      initialRouteName: 'home'
  }
  )

  export default createAppContainer(AppAlerts);