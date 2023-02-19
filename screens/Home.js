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
    faCog,
} from "@fortawesome/free-solid-svg-icons";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Spinner from "react-native-loading-spinner-overlay/lib";

import { useSelector, useDispatch } from "react-redux";
import { setUrl } from "../redux/actions";

export default function Home({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [spinner, setSpinner] = useState(false);

    const isFocused = useIsFocused();
    const [data, setData] = useState([]);
    const [englishCount, setEnglishCount] = useState(0);
    const [scienceCount, setScienceCount] = useState(0);
    const [mathCount, setMathCount] = useState(0);
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
                setSpinner(false);
            })
            .catch((error) => {
                alert(
                    "Could not connect to online server. Please try again later or use the offline function."
                );
                setSpinner(false);
            });
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 100);
        fetch();
    }, [fetch]);

    useEffect(() => {
        isFocused && fetch();
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => navigation.navigate("Settings")}>
                    <FontAwesomeIcon icon={faCog} size={22} />
                </Pressable>
            ),
        });
    }, [isFocused, navigation]);

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
