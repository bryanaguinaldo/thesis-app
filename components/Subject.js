import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, View, Pressable } from "react-native";

export default function Subject(props) {
    return (
        <Pressable onPress={props.onPress} key={props.key}>
            <View className="flex justify-center rounded-md shadow-sm h-16 w-full bg-[#f2f2f2] px-2 my-2">
                <View
                    style={{
                        flex: 2,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View className="flex justify-center items-center h-12 w-12 bg-slate-200 rounded-lg">
                        <FontAwesomeIcon
                            icon={props.icon == null ? faBook : props.icon}
                            size={26}
                            color="#475569"
                        />
                    </View>
                    <View className="px-2 w-full">
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text className="font-bold capitalize w-3/4">
                                {props.title == null
                                    ? "Undefined"
                                    : props.title}
                            </Text>
                            <Text style={{ justifyContent: "flex-end" }}>
                                {props.entries} / 20
                            </Text>
                        </View>
                        {/* <Text className="text-slate-700">
                            {props.entries == null
                                ? "0 entries"
                                : props.entries == 1
                                ? props.entries + " entry"
                                : props.entries + " entries"}
                        </Text> */}
                        <View className="mt-1 h-2 w-5/6 rounded-full bg-slate-200">
                            <View
                                style={{
                                    width: (props.entries / 20) * 100 + "%",
                                }}
                            >
                                <View className="h-2 rounded-full bg-indigo-800"></View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}
