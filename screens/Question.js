import React, { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import axios, { Axios } from "axios";

import Button from "../components/Button";

import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Questions({ route, navigation }) {
    const { qQuestion, qAnswer, qId } = route.params;

    const url = "http://192.168.1.16:8000/api/entries";

    const handleDeleteQuestion = async () => {
        const response = await axios
            .delete(url + "/" + qId)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        alert("Question successfully removed... yata?");
        navigation.goBack();
    };

    return (
        <View className="h-full w-full">
            <View className="absolute inset-x-0 bottom-0 flex justify-center mb-6 px-5">
                <Button
                    title="Delete Question"
                    onPress={handleDeleteQuestion}
                />
            </View>
            <View className="mt-4 px-5">
                <View className="mt-2 bg-slate-700 rounded-lg">
                    <View className="p-4">
                        <Text className="font-bold text-2xl text-center text-white">
                            Q:
                        </Text>
                        <Text className="font-bold text-lg text-white text-center">
                            {qQuestion}
                        </Text>
                    </View>
                </View>
                <View className="mt-4 bg-slate-700 rounded-lg">
                    <View className="p-4">
                        <Text className="font-bold text-2xl text-center text-white">
                            A:
                        </Text>
                        <Text className="font-bold text-lg text-white text-center">
                            {qAnswer}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
