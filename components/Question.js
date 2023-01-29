import { Text, View, Pressable } from "react-native";

export default function Question(props) {
    return (
        <Pressable onPress={props.onPress}>
            <View className="h-26 p-4 w-full rounded-lg shadow-sm bg-slate-700 my-2">
                <View className="h-1 bg-slate-500 w-8 mb-2"></View>
                <Text className="text-xs font-bold text-slate-400 uppercase">
                    {props.subject == null
                        ? "undefined subject"
                        : props.subject}
                </Text>
                <Text
                    className="text-lg text-white font-bold capitalize"
                    numberOfLines={2}
                >
                    Q: {props.question == null ? "undefined" : props.question}
                </Text>
            </View>
        </Pressable>
    );
}
