import { Pressable, Text, View } from "react-native";

export default function Button(props) {
    return (
        <Pressable onPress={props.onPress}>
            <View className="flex justify-center items-center h-8 w-full bg-blue-800 rounded-lg shadow-lg shadow-blue-500">
                <Text
                    className="text-white"
                    style={{ fontFamily: "Poppins-Bold" }}
                >
                    {props.title}
                </Text>
            </View>
        </Pressable>
    );
}
