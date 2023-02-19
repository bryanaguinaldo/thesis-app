import { Text, View, ImageBackground } from "react-native";

export default function Banner(props, { route }) {
    return (
        <View>
            <ImageBackground
                source={require("../assets/images/background-top.jpg")}
            >
                <View className="flex justify-center w-full h-48 px-4">
                    <Text
                        className="text-xl text-white capitalize"
                        style={{ fontFamily: "Poppins-Bold" }}
                    >
                        {props.title.toString()}
                    </Text>
                    <Text
                        className="text-slate-400"
                        style={{ fontFamily: "Poppins" }}
                    >
                        {props.description.toString()}
                    </Text>
                </View>
            </ImageBackground>
        </View>
    );
}
