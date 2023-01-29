import { Text, View, ImageBackground } from "react-native";

export default function Banner(props) {
    return (
        <View>
            <ImageBackground
                source={require("../assets/images/background-top.jpg")}
            >
                <View className="flex justify-center w-full h-48 px-4">
                    <Text className="text-xl text-white font-bold capitalize">
                        {props.title.toString()}
                    </Text>
                    <Text className="text-slate-400">
                        {props.description.toString()}
                    </Text>
                </View>
            </ImageBackground>
        </View>
    );
}
