import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";

import Banner from "../components/Banner";
import Question from "../components/Question";
import axios, { Axios } from "axios";

export default function Questions({ route, navigation }) {
    const { subject } = route.params;
    const [data, setData] = useState([]);
    const url = "http://192.168.1.16:8000/api/entries";

    const fetch = async () => {
        const response = await axios(url, {
            headers: {
                Accept: "application/json",
            },
        })
            .then((res) => {
                const result = res.data.data.filter(
                    (r) => r.attributes.subject === subject
                );
                setData(result);
            })
            .catch((error) => alert(error));
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <View className="h-full w-full">
            <ScrollView>
                <Banner
                    title={subject}
                    description={
                        "This page lists all questions under the " +
                        subject +
                        " subject."
                    }
                />
                <View className="mt-4 px-5">
                    {data.map((d) => {
                        return (
                            <Question
                                subject={d.attributes.subject}
                                question={d.attributes.question}
                                key={d.id}
                                onPress={() =>
                                    navigation.navigate("Question", {
                                        qQuestion: d.attributes.question,
                                        qAnswer: d.attributes.answer,
                                    })
                                }
                            />
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}
