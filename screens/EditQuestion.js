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
import * as ImageManipulator from "expo-image-manipulator";

export default function AddQuestions({ route, navigation }) {
    const { subject, qQuestion, qAnswer, qId } = route.params;
    const [question, setQuestion] = useState(qQuestion);
    const [answer, setAnswer] = useState(qAnswer);
    const [image, setImage] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const [isFileChosen, setIsFileChosen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

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
                let uri = imageUrl;
                let fileName = uri.split("/").pop();

                let match = /\.(\w+)$/.exec(fileName);
                let type = match ? `image/${match[1]}` : `image`;
                formData.append("file", { uri: uri, name: fileName, type });
            }
            setSpinner(true);
            const response = await axios({
                method: "post",
                url: url + "api/entries/update/" + qId,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    Alert.alert("Success", "Question updated successfully.", [
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
                    alert("A network error has ocurred.");
                    setSpinner(false);
                });
        }
    };

    const handleImagePicker = async () => {
        // No permissions request is necessary for launching the image library
        setSpinner(true);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        }).catch(function (error) {
            console.log(error);
        });

        if (!result.canceled) {
            const resizedPhoto = await ImageManipulator.manipulateAsync(
                result.assets[0].uri,
                [{ resize: { width: 250, height: 250 } }],
                { compress: 0.7, format: "jpeg" }
            );

            console.log(resizedPhoto.uri);

            setImage(result.assets[0]);
            setImageUrl(resizedPhoto.uri);
            setIsFileChosen(true);
        }
        setSpinner(false);
    };

    return (
        <View className="h-full w-full">
            <Spinner
                visible={spinner}
                textContent={"Loading..."}
                textStyle={{ color: "#fff" }}
                overlayColor="rgba(0, 0, 0, 0.30)"
            />
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
                    <Text
                        className="text-sm uppercase text-slate-700"
                        style={{ fontFamily: "Poppins-Bold" }}
                    >
                        Question *
                    </Text>
                    <TextInput
                        value={question}
                        onChangeText={(val) => setQuestion(val)}
                    />
                </View>
                <View className="py-2">
                    <Text
                        className="text-sm uppercase text-slate-700"
                        style={{ fontFamily: "Poppins-Bold" }}
                    >
                        Answer *
                    </Text>
                    <TextInput
                        value={answer}
                        onChangeText={(val) => setAnswer(val)}
                    />
                </View>
                <View className="py-2">
                    <Text
                        className="text-sm uppercase text-slate-700"
                        style={{ fontFamily: "Poppins-Bold" }}
                    >
                        Attachment
                    </Text>
                    {!isFileChosen ? (
                        <Text
                            className="my-2"
                            style={{ fontFamily: "Poppins" }}
                        >
                            No File Chosen{" "}
                        </Text>
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
                    <View className="py-4">
                        <Button
                            title="Submit"
                            onPress={handleAddQuestion}
                            color="bg-blue-500"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
