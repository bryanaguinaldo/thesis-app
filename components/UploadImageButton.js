import { Pressable, Text, View } from "react-native";

export default function UploadImageButton(props) {
    return (
        <Pressable onPress={props.onPress}>
            <View className="flex justify-center items-center h-8 w-full bg-gray-500 rounded-lg shadow-lg shadow-grey-500">
                <Text className="text-white font-bold">{props.title}</Text>
            </View>
        </Pressable>
    );
}
