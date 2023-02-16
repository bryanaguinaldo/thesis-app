import React from "react";
import { Text, View, Image, Switch } from "react-native";
import TextInput from "../components/TextInput";
import { useState } from "react";

import Button from "../components/Button";

import { useSelector, useDispatch } from "react-redux";
import { setUrl } from "../redux/actions";

export default function Settings({ route, navigation }) {
    const [ip, setIp] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);

    const { url } = useSelector((state) => state.urlReducer);
    const dispatch = useDispatch();

    const toggleSwitch = () => {
        if (!isEnabled === false) {
            dispatch(setUrl("http://20.125.139.137:8114/"));
        }
        setIsEnabled((previousState) => !previousState);
    };

    return (
        <View className="h-full w-full bg-white p-3">
            <View className="w-full bg-gray-50 h-12 shadow-md rounded-lg flex justify-center px-4">
                <View
                    class="mb-4"
                    style={{
                        flex: 2,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text>Use Custom URL for Offline Mode</Text>
                    <Switch
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        trackColor={{ false: "#767577", true: "#000" }}
                        thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                    />
                </View>
            </View>
            <View
                className="px-4 mt-4 space-y-4"
                style={{
                    display: isEnabled ? "flex" : "none",
                }}
            >
                <Text className="uppercase font-bold text-slate-700">
                    URL/IP Address:
                </Text>
                <TextInput onChangeText={(val) => setIp(val)} />
                <View className="mt-4">
                    <Button
                        title="Update"
                        onPress={() => {
                            dispatch(setUrl("http://" + ip + "/"));
                            navigation.goBack();
                            alert("Successfully updated URL.");
                        }}
                    />
                </View>
            </View>
        </View>
    );
}
