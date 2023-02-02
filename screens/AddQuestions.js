import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";

import TextInput from "../components/TextInput";
import Button from "../components/Button";

import Banner from "../components/Banner";
import axios, { Axios } from "axios";

export default function AddQuestions({ route, navigation }) {
    const { subject } = route.params;
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);

    const url = "http://192.168.1.16:8000/api/entries";

    const handleAddQuestion = async () => {
        const response = await axios
            .post(url, {
                subject: subject,
                question: question,
                answer: answer,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        alert("Question successfully added... yata?");
        navigation.goBack();
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
                        Question
                    </Text>
                    <TextInput onChangeText={(val) => setQuestion(val)} />
                </View>
                <View className="py-2">
                    <Text className="text-sm uppercase text-slate-700 font-bold">
                        Answer
                    </Text>
                    <TextInput onChangeText={(val) => setAnswer(val)} />
                </View>
                <View className="py-2">
                    <Text className="text-sm uppercase text-slate-700 font-bold">
                        Attachment
                    </Text>
                    <TextInput />
                </View>
                <View className="py-2">
                    <Button title="Submit" onPress={handleAddQuestion} />
                </View>
            </View>
        </View>
    );
}
