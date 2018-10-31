import React from 'react';
import { StyleSheet, Text, View,Button, ActivityIndicator,FlatList, ToastAndroid, StatusBar, AsyncStorage } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';


import data from '../data/country.json';


//Custom Screen 1
import Screen1 from './Screen1';


export default class App extends React.Component {
  
    static navigationOptions ={
          header:null,
    }
     
    constructor(props){
        super(props);
    
        this.state = {
          isLoading: true,
          dataSource: [],
        }
      }
      

    componentDidMount(){
        return fetch("https://gist.githubusercontent.com/kaderhussain/59519a0be7deced0fbb3083fbb68c70d/raw/35c849139df54bb7df6d3a4da49a780d7bb0ed34/country.json")
        .then((response)=> response.json())
        .then((responseJson)=>{
          //setting the data 
          this.setState({
            isloading:false,
            dataSource: responseJson.info
          });
          AsyncStorage.setItem('dataSource', responseJson.info)
          
        })
        .catch((error)=>{
          ToastAndroid.show(error.toString() , ToastAndroid.SHORT)
        })
    }

  render() {
      if(AsyncStorage.setItem('dataSource', this.state.dataSource)){
          this.props.navigation.navigate('Screen2');
      }
    return(

        <View style={{padding:20,marginTop:30}}>
        <Text style={{fontSize:22,marginBottom:20}}>Data Manager's Offline Task</Text>
        <Button title="Download All Data"
            onPress={()=> this.props.navigation.navigate('Screen1')}
            style={{flex:1, margin:30}}
        />
        <Button title="Download Today's Data"
            onPress={()=> this.props.navigation.navigate('Screen2')}
            style={{margin:10}}
        />
        </View>

    )

  }
}



