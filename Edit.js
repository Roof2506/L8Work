import React, { useState, useEffect } from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({ navigation, route }) => {
    const { key, image, ISBN, copies } = route.params;
    const [title, setTitle] = useState(key);
    const [imagelink, setImagelink] = useState(image);
    const [bookno, setBookno] = useState(ISBN);
    const [Copies, setCopies] = useState(copies);

    // Load the values when editing
    useEffect(() => {
        if (route.params?.book) {
            setTitle(route.params.book.key || "");
            setImagelink(route.params.book.image || "");
            setBookno(route.params.book.ISBN || "");
            setCopies(route.params.book.copies || "");
        }
    }, [route.params]);

    const setData = async (value) => {
        await AsyncStorage.setItem("alphadata", value);
        navigation.navigate("Home");
    };

    return (
        <View>
            <Text>Title:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <Text>ISBN:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                value={bookno}
                onChangeText={(text) => setBookno(text)}
            />
            <Text>Url:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                value={imagelink}
                onChangeText={(text) => setImagelink(text)}
            />
            <Text>Copies:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 20 }}
                value={Copies}
                onChangeText={(text) => setCopies(text)}
            />
            <View style={{ flexDirection: "row" }}>
                <View style={{ margin: 10, flex: 1 }}>
                    <Button
                        title="Save"
                        onPress={() => {
                            let mydata = JSON.parse(route.params.datastring);
                            let item = { key: title, image: imagelink, ISBN: bookno, copies: Copies };
                            let indexnum = 0;

                            if (route.params.index !== undefined) {
                                mydata[indexnum].data[route.params.index] = item;
                            } else {
                                mydata[indexnum].data.push(item);
                            }

                            let stringdata = JSON.stringify(mydata);
                            setData(stringdata);
                        }}
                    />
                </View>
                <View style={{ margin: 10, flex: 1 }}>
                    <Button
                        title="Delete"
                        onPress={() => {
                            let mydata = JSON.parse(route.params.datastring);
                            let indexnum = 0;

                            Alert.alert(
                                "Are you sure?",
                                "",
                                [
                                    {
                                        text: "Yes",
                                        onPress: () => {
                                            if (route.params.index !== undefined) {
                                                mydata[indexnum].data.splice(route.params.index, 1);
                                                let stringdata = JSON.stringify(mydata);
                                                setData(stringdata);
                                            } else {
                                                Alert.alert("Error", "No item selected to delete.");
                                            }
                                        },
                                    },
                                    { text: "No" },
                                ]
                            );
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default Edit;
