import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";

import TextInput from "../components/TextInput";
import Button from "../components/Button";

import Banner from "../components/Banner";
import axios, { Axios } from "axios";

export default function AddQuestions() {
    const url = "http://192.168.1.16:8000/api/entries";
    return (
        <View className="h-full w-full">
            <Banner
                title="Add a Question"
                description="Add questions here. No shit sherlock."
            />
            <View className="mt-4 px-5">
                <View className="py-2">
                    <Text className="text-sm uppercase text-slate-700 font-bold">
                        Question
                    </Text>
                    <TextInput />
                </View>
                <View className="py-2">
                    <Text className="text-sm uppercase text-slate-700 font-bold">
                        Answer
                    </Text>
                    <TextInput />
                </View>
                <View className="py-2">
                    <Text className="text-sm uppercase text-slate-700 font-bold">
                        Attachment
                    </Text>
                    <TextInput />
                </View>
                <View className="py-2">
                    <Button title="Submit" />
                </View>
            </View>
        </View>
    );
}
