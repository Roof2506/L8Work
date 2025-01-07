import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({navigation,route}) => {
  const[title,setTitle] = useState("");
  const[imagelink,setImagelink] = useState("");
  const[bookno,setBookno] = useState("");
  const[Copies,setCopies] = useState("");

  const setData = async (value) => {
      AsyncStorage.setItem("alphadata", value);
      navigation.navigate("Home");
  };

  return (
    <View>
      <StatusBar/>
      <Text>Title:</Text>
      <TextInput style={{borderWidth:1}} onChangeText={(text)=>setTitle(text)}/>
      <Text>ISBN:</Text>
      <TextInput style={{borderWidth:1}} onChangeText={(text) => setBookno(text)}/>
      <Text>Url:</Text>
      <TextInput style={{borderWidth:1}} onChangeText={(text) => setImagelink(text)}/>
      <Text>Copies:</Text>
      <TextInput style={{borderWidth:1}} onChangeText={(text) => setCopies(text)}/>
      <Button title='Submit'
      onPress={()=>{
          let mydata = JSON.parse(route.params.datastring);
          let item = {key:title, image:imagelink,ISBN:bookno,copies:Copies};
          let indexnum = 0;
          mydata[indexnum].data.push(item);
          let stringdata = JSON.stringify(mydata);
          setData(stringdata);
        }
      }
      />
    </View>
  );
};

export default Add;
