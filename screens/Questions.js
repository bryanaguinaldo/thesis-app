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
import Spinner from "react-native-loading-spinner-overlay/lib";

import Banner from "../components/Banner";
import Question from "../components/Question";
import axios, { Axios } from "axios";
import { useIsFocused } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import { setUrl } from "../redux/actions";

export default function Questions({ route, navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [spinner, setSpinner] = useState(false);
    const isFocused = useIsFocused();
    const { subject } = route.params;
    const [data, setData] = useState([]);
    // const url = "http://192.168.43.203:8000/api/entries";
    const { url } = useSelector((state) => state.urlReducer);

    const fetch = async () => {
        setSpinner(true);
        const response = await axios(url + "api/entries", {
            headers: {
                Accept: "application/json",
            },
        })
            .then((res) => {
                const result = res.data.data.filter(
                    (r) => r.attributes.subject === subject
                );
                setData(result);
                setSpinner(false);
            })
            .catch((error) => {
                alert("Could not connect to server.");
                setSpinner(false);
            });
    };

    const navigateToAddQuestions = async () => {
        setSpinner(true);
        const response = await axios(url + "api/entries", {
            headers: {
                Accept: "application/json",
            },
        })
            .then((res) => {
                const result = res.data.data.filter(
                    (r) => r.attributes.subject === subject
                );
                if (result.length >= 20) {
                    alert(
                        "You have reached the maximum allowed questions for this subject."
                    );
                } else {
                    navigation.navigate("AddQuestions", {
                        subject: subject,
                    });
                }
                setSpinner(false);
            })
            .catch((error) => {
                alert("Could not connect to server.");
                setSpinner(false);
            });
    };

    useEffect(() => {
        isFocused && fetch();
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={navigateToAddQuestions}>
                    <FontAwesomeIcon icon={faAdd} size={22} />
                </Pressable>
            ),
        });
    }, [navigation, isFocused]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
        fetch();
    }, []);

    return (
        <View className="h-full w-full">
            <Spinner
                visible={spinner}
                textContent={"Loading..."}
                textStyle={{ color: "#fff" }}
                overlayColor="rgba(0, 0, 0, 0.30)"
            />
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
