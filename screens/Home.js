import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    ScrollView,
    Pressable,
    RefreshControl,
} from "react-native";

import Banner from "../components/Banner";
import Subject from "../components/Subject";
import Question from "../components/Question";
import axios, { Axios } from "axios";
import {
    faAtom,
    faSpellCheck,
    faAdd,
    faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Home({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
        fetch();
    }, []);

    const isFocused = useIsFocused();
    const [data, setData] = useState([]);
    const [englishCount, setEnglishCount] = useState(0);
    const [scienceCount, setScienceCount] = useState(0);
    const [mathCount, setMathCount] = useState(0);
    const url = "http://192.168.43.203:8000/api/entries";

    const fetch = async () => {
        const response = await axios(url, {
            headers: {
                Accept: "application/json",
            },
        })
            .then((res) => {
                const result = res.data.data;
                setData(result);
                const ec = result.filter(
                    (r) => r.attributes.subject === "english"
                );
                const mc = result.filter(
                    (r) => r.attributes.subject === "math"
                );
                const sc = result.filter(
                    (r) => r.attributes.subject === "science"
                );
                setEnglishCount(ec.length);
                setMathCount(mc.length);
                setScienceCount(sc.length);
            })
            .catch((error) => alert(error));
    };

    useEffect(() => {
        isFocused && fetch();
    }, [isFocused]);

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
                    title="Welcome!"
                    description="Learning Assistant Device Mobile App!"
                />
                <View className="mt-4 px-5">
                    <Text className="mb-2 text-sm uppercase text-slate-500 font-bold flex-start">
                        Subjects
                    </Text>
                    <Subject
                        title="English"
                        entries={englishCount}
                        icon={faSpellCheck}
                        onPress={() =>
                            navigation.navigate("Questions", {
                                subject: "english",
                            })
                        }
                    />
                    <Subject
                        title="Science"
                        entries={scienceCount}
                        icon={faAtom}
                        onPress={() =>
                            navigation.navigate("Questions", {
                                subject: "science",
                            })
                        }
                    />
                    <Subject
                        title="Mathematics"
                        entries={mathCount}
                        icon={faAdd}
                        onPress={() =>
                            navigation.navigate("Questions", {
                                subject: "math",
                            })
                        }
                    />
                </View>
            </ScrollView>
        </View>
    );
}
