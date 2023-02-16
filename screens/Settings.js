import React from "react";
import { Text, View, Image, Switch } from "react-native";
import TextInput from "../components/TextInput";
import { useState } from "react";
import axios, { Axios } from "axios";
import { Alert } from "react-native";

import Spinner from "react-native-loading-spinner-overlay/lib";

import Button from "../components/Button";

import { useSelector, useDispatch } from "react-redux";
import { setUrl } from "../redux/actions";

export default function Settings({ route, navigation }) {
    const [ip, setIp] = useState("");
    const [isEnabled, setIsEnabled] = useState(true);
    const [spinner, setSpinner] = useState(false);

    const { url } = useSelector((state) => state.urlReducer);
    const dispatch = useDispatch();

    const toggleSwitch = async () => {
        setIsEnabled((previousState) => !previousState);
    };

    const handleOnlineMode = async () => {
        if (isEnabled === false) {
            setSpinner(true);
            const response = await axios
                .get("http://20.125.139.137:8114/api/verify/server_validity", {
                    headers: {
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    const result = res.data.status;
                    if (result == "OK") {
                        Alert.alert(
                            "Success",
                            "Successfully set to online. You are now using the online function.",
                            [
                                {
                                    text: "OK",
                                    onPress: () => {
                                        dispatch(
                                            setUrl(
                                                "http://20.125.139.137:8114/"
                                            )
                                        );
                                        navigation.goBack();
                                    },
                                },
                            ]
                        );
                    }
                    setSpinner(false);
                })
                .catch((error) => {
                    alert(
                        "Unable to connect to server. Please check your input."
                    );
                    setSpinner(false);
                });
        } else {
            alert("An error occured.");
        }
    };

    const handleUrlChange = async () => {
        setSpinner(true);
        const response = await axios
            .get("http://" + ip + "/" + "api/verify/server_validity", {
                headers: {
                    Accept: "application/json",
                },
            })
            .then((res) => {
                const result = res.data.status;
                if (result == "OK") {
                    Alert.alert(
                        "Success",
                        "Successfully set to local server. You are now using the offline function.",
                        [
                            {
                                text: "OK",
                                onPress: () => {
                                    dispatch(setUrl("http://" + ip + "/"));
                                    navigation.goBack();
                                },
                            },
                        ]
                    );
                }
                setSpinner(false);
            })
            .catch((error) => {
                alert("Unable to connect to server. Please check your input.");
                setSpinner(false);
            });
    };

    return (
        <View className="h-full w-full bg-white p-3">
            <Spinner
                visible={spinner}
                textContent={"Checking Server Validity..."}
                textStyle={{ color: "#fff" }}
                overlayColor="rgba(0, 0, 0, 0.30)"
            />
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
                    <Button title="Update" onPress={handleUrlChange} />
                </View>
            </View>
            <View
                className="px-4 mt-4 space-y-4"
                style={{
                    display: isEnabled ? "none" : "flex",
                }}
            >
                <Button
                    title="Proceed to Online Mode"
                    onPress={handleOnlineMode}
                />
            </View>
        </View>
    );
}
