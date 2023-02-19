import React, { useState, useEffect } from "react";
import { Text, View, Pressable, Image, ScrollView } from "react-native";
import axios, { Axios } from "axios";
import Spinner from "react-native-loading-spinner-overlay/lib";

import Button from "../components/Button";

import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Alert } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { setUrl } from "../redux/actions";
import DeleteButton from "../components/DeleteButton";
import { useIsFocused } from "@react-navigation/native";

export default function Questions({ route, navigation }) {
    const { qQuestion, qAnswer, qId, qImage } = route.params;
    const { url } = useSelector((state) => state.urlReducer);

    const [imageFile, setImageFile] = useState();
    const imageUrl = url + "storage/static/images/" + qImage;
    const [spinner, setSpinner] = useState(false);
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    // const url = "http://192.168.43.203:8000/api/entries";

    const fetch = async () => {
        setSpinner(true);
        const response = await axios(url + "api/entries/" + qId, {
            headers: {
                Accept: "application/json",
            },
        })
            .then((res) => {
                const result = res.data.data;
                setData(result);
                setQuestion(result.attributes.question);
                setAnswer(result.attributes.answer);
                setSpinner(false);
            })
            .catch((error) => {
                alert(error);
                setSpinner(false);
            });
    };

    useEffect(() => {
        isFocused && fetch();
    }, [isFocused]);

    const handleEditQuestion = () => {
        navigation.navigate("EditQuestion", {
            qQuestion: question,
            qAnswer: answer,
            qId: qId,
        });
    };

    const handleDeleteQuestion = async () => {
        Alert.alert(
            "Confirm",
            "Are you sure you want to delete this question?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        const deleteQuestion = async () => {
                            setSpinner(true);
                            const response = await axios
                                .delete(url + "api/entries/" + qId)
                                .then(function (response) {
                                    new Alert.alert(
                                        "Success",
                                        "Question removed successfully.",
                                        [
                                            {
                                                text: "Ok",
                                                onPress: () => {
                                                    navigation.goBack();
                                                    setSpinner(false);
                                                },
                                            },
                                        ]
                                    );
                                })
                                .catch(function (error) {
                                    Alert.alert(
                                        "Fail",
                                        "This question does not exist.",
                                        [
                                            {
                                                text: "Ok",
                                                onPress: () => {
                                                    navigation.goBack();
                                                },
                                            },
                                        ]
                                    );
                                    setSpinner(false);
                                });
                        };
                        deleteQuestion();
                    },
                },
                {
                    text: "No",
                    onPress: () => {},
                },
            ]
        );
    };

    return (
        <ScrollView className="bg-white">
            <View className="h-full w-full py-4">
                <Spinner
                    visible={spinner}
                    textContent={"Loading..."}
                    textStyle={{ color: "#fff" }}
                    overlayColor="rgba(0, 0, 0, 0.30)"
                />
                <View className="px-5">
                    <View className="mt-2 bg-slate-700 rounded-lg">
                        <View className="p-4">
                            <Text
                                className="text-2xl text-center text-white"
                                style={{ fontFamily: "Poppins-Bold" }}
                            >
                                Q:
                            </Text>
                            <Text
                                className="text-lg text-white text-center"
                                style={{ fontFamily: "Poppins-Bold" }}
                            >
                                {question}
                            </Text>
                        </View>
                    </View>
                    <View className="mt-4 bg-slate-700 rounded-lg">
                        <View className="p-4">
                            <Text
                                className="text-2xl text-center text-white"
                                style={{ fontFamily: "Poppins-Bold" }}
                            >
                                A:
                            </Text>
                            <Text
                                className="text-lg text-white text-center"
                                style={{ fontFamily: "Poppins-Bold" }}
                            >
                                {answer}
                            </Text>
                        </View>
                    </View>
                    {qImage == null ? null : (
                        <View className="flex items-center mt-4 rounded-lg w-full">
                            <Image
                                className="rounded-lg shadow-sm"
                                style={{
                                    width: "69%",
                                    height: undefined,
                                    aspectRatio: 1,
                                }}
                                source={{
                                    uri: imageUrl,
                                }}
                            />
                        </View>
                    )}
                    <View className="mt-4">
                        <Button
                            title="Edit Question"
                            onPress={handleEditQuestion}
                        />
                    </View>
                    <View className="mt-2">
                        <DeleteButton
                            title="Delete Question"
                            onPress={handleDeleteQuestion}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
