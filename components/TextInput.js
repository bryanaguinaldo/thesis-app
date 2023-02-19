import { TextInput, View } from "react-native";

export default function InputText(props) {
    return (
        <View className="rounded-md border-2 border-slate-300 px-3">
            <TextInput
                onChangeText={props.onChangeText}
                maxLength={150}
                value={props.value == null ? null : props.value}
                multiline={props.multiline == null ? false : props.multiline}
                style={{ fontFamily: "Poppins" }}
            />
        </View>
    );
}
