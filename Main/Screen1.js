import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator,FlatList, ToastAndroid, StatusBar, AsyncStorage } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

import data from '../data/country.json';

export default class App extends React.Component {
    
    constructor(props){
        super(props);
    
        this.state = {
          isLoading: true,
          dataSource: [],
        }
      }
      

    componentDidMount() {
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
  
      
    render(){
        if(this.state.isloading){
            return(
              <View style={{flex:1, padding:20}}>
              <Text> Data is Loading....</Text>
              </View>
            )
          }else{
            return (
            
              <View style={{flex:1,paddingTop:40,paddingLeft:20}}>
              <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
                <Text style={{fontSize:22}}>Showing All Data</Text>
                
                <FlatList 
                  data={this.state.dataSource}
                  renderItem={({item})=>{
                    return(
                      <View style={{flex:1, padding:10}}>
                      <Text style={{flex:1, alignContent:'center',justifyContent:'center',borderColor:'#c8e1ff',borderBottomWidth:2,borderTopWidth:2,borderLeftWidth:2,borderRightWidth:2,fontSize:18, padding:20,backgroundColor:'#f1f8ff'}}>Date:{item.Date} </Text>
                        <Text style={{flex:1, alignContent:'center',justifyContent:'center',borderColor:'#c8e1ff',borderBottomWidth:2,borderLeftWidth:2,borderRightWidth:2,fontSize:18, padding:20,backgroundColor:'#f1f8ff'}}>Country:{item.Country} </Text>
                        <Text style={{flex:1, alignContent:'center',justifyContent:'center',borderColor:'#c8e1ff',borderBottomWidth:2,borderLeftWidth:2,borderRightWidth:2,fontSize:14,padding:20,backgroundColor:'#f1f8ff'}}>City:{item.City} </Text>
                        
                        {/* <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                        <Rows data={item.Country} textStyle={styles.text}/>
                      </Table> */}
                      </View>
                    )
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  />
              </View>
            );
          }


    }
}

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
  