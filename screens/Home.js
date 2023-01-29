import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";

import Banner from "../components/Banner";
import Subject from "../components/Subject";
import Question from "../components/Question";
import axios, { Axios } from "axios";
import { faAtom, faSpellCheck, faAdd } from "@fortawesome/free-solid-svg-icons";

export default function Home({ navigation }) {
    const [data, setData] = useState([]);
    const [englishCount, setEnglishCount] = useState(0);
    const [scienceCount, setScienceCount] = useState(0);
    const [mathCount, setMathCount] = useState(0);
    const url = "http://192.168.1.16:8000/api/entries";

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
        fetch();
    }, []);

    return (
        <View className="h-full w-full">
            <ScrollView>
                <Banner
                    title="Welcome!"
                    description="Learning Assistant Device Mobile App!"
                />
                <View className="mt-4 px-5">
                    <Text className="mb-2 text-sm uppercase text-slate-500 font-bold">
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
                    {/* {data.map((d) => {
                        return (
                            <Question
                                subject={d.attributes.subject}
                                question={d.attributes.question}
                                key={d.id}
                            />
                        );
                    })} */}
                </View>
            </ScrollView>
        </View>
    );
}
