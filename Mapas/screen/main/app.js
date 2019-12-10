import {createSwitchNavigator, createAppContainer} from "react-navigation";
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import logDates  from '../logDates';
import store from '../../store'

const AppNavigator = createSwitchNavigator(
  {    
      home: logDates    
  },
)
const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component{
 
  render() {
    return (
    <Provider store = {store}>
      <AppContainer/>
    </Provider> 
    );
  }
}

