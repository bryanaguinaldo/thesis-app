import { Pressable, Text, View } from "react-native";

export default function DeleteButton(props) {
    return (
        <Pressable onPress={props.onPress}>
            <View className="flex justify-center items-center h-8 w-full bg-red-500 rounded-lg shadow-lg shadow-red-500">
                <Text className="text-white font-bold">{props.title}</Text>
            </View>
        </Pressable>
    );
}
