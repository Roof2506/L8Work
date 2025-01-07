import React,{useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        margin: 10,
        textAlign: 'left',
    },
   opacityStyle: {
      borderWidth: 1,
   },
   imageStyle: {
       alignItems: 'center',
       width: 300,
       height: 300,
       margin: 20,
   },
   headerText: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    fontWeight:'bold',
    fontFamily:'impact'
  },
});

const Home = ({navigation}) => {

  const [mydata, setMydata] = useState([]);

  const getData = async () => {
      let datastr = await AsyncStorage.getItem("alphadata");
      if (datastr!=null) {
          jsondata = JSON.parse(datastr);
          setMydata(jsondata);
      }
      else {
          setMydata(datasource);
      }
  };

  getData();

  const renderItem = ({item, index, section}) => {
    return (
    <TouchableOpacity style={styles.opacityStyle}
    onPress={()=>
      {
        let datastr =JSON.stringify(mydata)
        navigation.navigate("Edit",{index:index,image:item.image, key:item.key, ISBN:item.ISBN, copies:item.copies ,datastring:datastr})
      }
    }
    >
    <Text style={styles.textStyle}>Title: {item.key}</Text>
    <Text style={styles.textStyle}>ISBN: {item.ISBN}</Text>
    <Text style={styles.textStyle}>Copies: {item.copies}</Text>
    <Image
        source={{uri: item.image}}
        style={styles.imageStyle}
        resizeMode="contain"
    />
    </TouchableOpacity>
    );
  };

   return (
    <View>
      <StatusBar/>
	  <Button title='Add Book' onPress={()=>{
          let datastr =JSON.stringify(mydata)
          navigation.navigate("Add",{datastring:datastr})}}/>
      <SectionList sections={mydata} renderItem={renderItem}
      renderSectionHeader={({section:{title,bgcolor}})=>(
      <Text style={[styles.headerText,{backgroundColor:bgcolor}]}>
        {title}
      </Text>
      )}/>
    </View>
  );
};

export default Home;
