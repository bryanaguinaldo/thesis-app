import React from "react";
import { Text, View } from "react-native";

export default function Questions({ route, navigation }) {
    const { qQuestion, qAnswer } = route.params;

    return (
        <View className="h-full w-full">
            <View className="mt-4 px-5">
                <View className="mt-2 bg-slate-700 rounded-lg">
                    <View className="p-4">
                        <Text className="font-bold text-2xl text-center text-white">
                            Q:
                        </Text>
                        <Text className="font-bold text-lg text-white text-center">
                            {qQuestion}
                        </Text>
                    </View>
                </View>
                <View className="mt-4 bg-slate-700 rounded-lg">
                    <View className="p-4">
                        <Text className="font-bold text-2xl text-center text-white">
                            A:
                        </Text>
                        <Text className="font-bold text-lg text-white text-center">
                            {qAnswer}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
