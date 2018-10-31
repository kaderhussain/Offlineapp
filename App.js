import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator,FlatList, ToastAndroid, StatusBar, AsyncStorage } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import {createStackNavigator} from 'react-navigation';

import data from './data/country.json'

//Custom Import
import Main from './Main/Main';
import Screen1 from './Main/Screen1';
import Screen2 from './Main/Screen2'


export default class App extends React.Component {

  static navigationOption ={
    header:null,
}
  constructor(props){
    super(props);

  }
  
  componentDidMount() {
  
  }

  render() {

    //showing waiting screen when data is fetching
    
      return (
          <AppStackNavigator />
      );
    
  }
}


//Stack navigator
const AppStackNavigator = createStackNavigator({
  Main:Main,
  Screen1:Screen1,
  Screen2: Screen2
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:40,
    
    backgroundColor:'#fff'
  },
  info:{
    flex:1,

    fontSize:20
  }
});
