import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator,FlatList, ToastAndroid, StatusBar, AsyncStorage } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

import data from '../data/country.json';

//Import Time Moment
import moment from 'moment';

export default class App extends React.Component {
    
    constructor(props){
        super(props);
        const yourDate = new Date()
        this.state = {
          isLoading: true,
          dataSource: [],
          todayData:[],
          NewDate:moment(yourDate, 'DD/MM/YYYY', true).format('L')
        }
        
      }
      

    componentDidMount() {
        console.log(this.state.NewDate);
        return fetch("https://gist.githubusercontent.com/kaderhussain/59519a0be7deced0fbb3083fbb68c70d/raw/35c849139df54bb7df6d3a4da49a780d7bb0ed34/country.json")
        .then((response)=> response.json())
        .then((responseJson)=>{
          //setting the data
          this.setState({
            isloading:false,
            dataSource: responseJson.info
          });
          
        })
        .catch((error)=>{
          ToastAndroid.show(error.toString() , ToastAndroid.SHORT)
        })

        
      }
  
    todayFunction=(item)=>{
        if(item.Date == this.state.NewDate){
            return(
                <View style={{flex:1, padding:10}}>
                <Text style={{flex:1, alignContent:'center',justifyContent:'center',borderColor:'#c8e1ff',borderBottomWidth:2,borderTopWidth:2,borderLeftWidth:2,borderRightWidth:2,fontSize:18, padding:20,backgroundColor:'#f1f8ff'}}>Date:{item.Date} </Text>
                <Text style={{flex:1, alignContent:'center',justifyContent:'center',borderColor:'#c8e1ff',borderBottomWidth:2,borderLeftWidth:2,borderRightWidth:2,fontSize:18, padding:20,backgroundColor:'#f1f8ff'}}>Country:{item.Country} </Text>
                <Text style={{flex:1, alignContent:'center',justifyContent:'center',borderColor:'#c8e1ff',borderBottomWidth:2,borderLeftWidth:2,borderRightWidth:2,fontSize:14,padding:20,backgroundColor:'#f1f8ff'}}>City:{item.City} </Text>
                </View>
            )
                    
        }
        else{
            <Text>No Data</Text>
        }
      }
      
    render(){
        

        
        
        


        if(this.state.isloading){
            return(
              <View style={{flex:1, padding:20}}>
              <Text> Data is Loading....</Text>
              </View>
            )
          }else{
              if(AsyncStorage.setItem('dataSource', this.state.dataSource)){
                this.props.navigation.navigate('Screen2')
              }
            return (
            
              <View style={{flex:1,paddingTop:40,paddingLeft:20}}>
              <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
                <Text style={{fontSize:22}}>Showing Today's Data</Text>
                
                <FlatList 
                  data={this.state.dataSource}
                  renderItem={({item})=>{
                    return(
                        <View>
                        {this.todayFunction(item)}
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
  