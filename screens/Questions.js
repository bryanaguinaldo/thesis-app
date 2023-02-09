import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    ScrollView,
    Pressable,
    RefreshControl,
} from "react-native";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Banner from "../components/Banner";
import Question from "../components/Question";
import axios, { Axios } from "axios";
import { useIsFocused } from "@react-navigation/native";

export default function Questions({ route, navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

    const isFocused = useIsFocused();
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
        isFocused && fetch();
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress={() =>
                        navigation.navigate("AddQuestions", {
                            subject: subject,
                        })
                    }
                >
                    <FontAwesomeIcon icon={faAdd} size={22} />
                </Pressable>
            ),
        });
    }, [navigation, isFocused]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
        fetch();
    }, []);

    return (
        <View className="h-full w-full">
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
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
                                        qId: d.id,
                                        qImage: d.attributes.file,
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
