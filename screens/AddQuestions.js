import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";

import TextInput from "../components/TextInput";
import Button from "../components/Button";

import Banner from "../components/Banner";
import axios, { Axios } from "axios";

import * as ImagePicker from "expo-image-picker";

import { useSelector, useDispatch } from "react-redux";
import { setUrl } from "../redux/actions";

export default function AddQuestions({ route, navigation }) {
    const { subject } = route.params;
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [image, setImage] = useState(null);

    // const url = "http://192.168.43.203:8000/api/entries";
    const { url } = useSelector((state) => state.urlReducer);

    const formData = new FormData();

    const handleAddQuestion = async () => {
        if (!question || !answer) {
            alert("Please fill out required fields.");
        } else {
            formData.append("subject", subject);
            formData.append("question", question);
            formData.append("answer", answer);
            if (image != null) {
                let uri = image.uri;
                let fileName = uri.split("/").pop();

                let match = /\.(\w+)$/.exec(fileName);
                let type = match ? `image/${match[1]}` : `image`;
                formData.append("file", { uri: uri, name: fileName, type });
            }

            const response = await axios({
                method: "post",
                url: url + "api/entries",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    alert("Question successfully added.");
                    navigation.goBack();
                })
                .catch(function (error) {
                    alert(error.response.data.message);
                });
        }
    };

    const handleImagePicker = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        }).catch(function (error) {
            console.log(error);
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        } else {
            return 0;
        }
    };

    return (
        <View className="h-full w-full">
            <Banner
                title="Add a Question"
                description={
                    "You are currently adding questions for the " +
                    subject +
                    " subject."
                }
            />
            <View className="mt-4 px-5">
                <View className="py-2">
                    <Text className="text-sm uppercase text-slate-700 font-bold">
                        Question *
                    </Text>
                    <TextInput onChangeText={(val) => setQuestion(val)} />
                </View>
                <View className="py-2">
                    <Text className="text-sm uppercase text-slate-700 font-bold">
                        Answer *
                    </Text>
                    <TextInput onChangeText={(val) => setAnswer(val)} />
                </View>
                <View className="py-2">
                    <Text className="text-sm uppercase text-slate-700 font-bold">
                        Attachment
                    </Text>
                    <Button
                        title="Choose an Image"
                        onPress={handleImagePicker}
                    />
                    <Text>No file chosen.</Text>
                </View>
                <View className="py-2">
                    <Button title="Submit" onPress={handleAddQuestion} />
                </View>
            </View>
        </View>
    );
}
