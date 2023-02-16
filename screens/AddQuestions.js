import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { Alert } from "react-native";

import TextInput from "../components/TextInput";
import Button from "../components/Button";

import Banner from "../components/Banner";
import axios, { Axios } from "axios";

import * as ImagePicker from "expo-image-picker";

import { useSelector, useDispatch } from "react-redux";
import { setUrl } from "../redux/actions";
import UploadImageButton from "../components/UploadImageButton";

export default function AddQuestions({ route, navigation }) {
    const { subject } = route.params;
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [image, setImage] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const [isFileChosen, setIsFileChosen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

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
            setSpinner(true);
            const response = await axios({
                method: "post",
                url: url + "api/entries",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    Alert.alert("Success", "Question added successfully.", [
                        {
                            text: "ok",
                            onPress: () => {
                                navigation.goBack();
                                setSpinner(false);
                            },
                        },
                    ]);
                })
                .catch(function (error) {
                    alert(error.response.data.message);
                    setSpinner(false);
                });
        }
    };

    const handleImagePicker = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        }).catch(function (error) {
            console.log(error);
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
            setImageUrl(result.assets[0].uri);
            setIsFileChosen(true);
        } else {
            return 0;
        }
    };

    return (
        <View className="h-full w-full">
            <Spinner
                visible={spinner}
                textContent={"Loading..."}
                textStyle={{ color: "#fff" }}
                overlayColor="rgba(0, 0, 0, 0.30)"
            />
            <View className="absolute inset-x-0 bottom-0 flex justify-center mb-6 px-5">
                <Button
                    title="Submit"
                    onPress={handleAddQuestion}
                    color="bg-blue-500"
                />
            </View>
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
                    {!isFileChosen ? (
                        <Text className="my-2">No File Chosen</Text>
                    ) : (
                        <View className="my-4 rounded-lg w-full">
                            <Image
                                className="rounded-lg shadow-sm"
                                style={{
                                    width: "30%",
                                    height: undefined,
                                    aspectRatio: 1,
                                }}
                                source={{
                                    uri: imageUrl,
                                }}
                            />
                        </View>
                    )}
                    <UploadImageButton
                        title="Choose an Image"
                        onPress={handleImagePicker}
                    />
                </View>
            </View>
        </View>
    );
}
