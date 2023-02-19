import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Questions from "./screens/Questions";
import Question from "./screens/Question";
import AddQuestions from "./screens/AddQuestions";
import EditQuestion from "./screens/EditQuestion";
import Settings from "./screens/Settings";

import { useFonts } from "expo-font";

import { faAdd, faCog, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable } from "react-native";

import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
    const Stack = createNativeStackNavigator();

    let [fontsLoaded] = useFonts({
        Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            headerRight: () => (
                                <Pressable>
                                    <FontAwesomeIcon icon={faCog} size={22} />
                                </Pressable>
                            ),
                            title: "Home",
                            headerTitleStyle: { fontFamily: "Poppins" },
                        }}
                        initialParams={{ font: fontsLoaded }}
                    />
                    <Stack.Screen
                        name="Question"
                        component={Question}
                        options={{
                            title: "Question",
                            headerTitleStyle: { fontFamily: "Poppins" },
                        }}
                    />
                    <Stack.Screen
                        name="Questions"
                        component={Questions}
                        options={{
                            headerRight: () => (
                                <Pressable>
                                    <FontAwesomeIcon icon={faAdd} size={22} />
                                </Pressable>
                            ),
                            headerTitleStyle: { fontFamily: "Poppins" },
                        }}
                        initialParams={{ font: fontsLoaded }}
                    />
                    <Stack.Screen
                        name="AddQuestions"
                        component={AddQuestions}
                        options={{
                            title: "Add a Question",
                            headerTitleStyle: { fontFamily: "Poppins" },
                        }}
                        initialParams={{ font: fontsLoaded }}
                    />
                    <Stack.Screen
                        name="EditQuestion"
                        component={EditQuestion}
                        options={{
                            title: "Edit Question",
                            headerTitleStyle: { fontFamily: "Poppins" },
                        }}
                        initialParams={{ font: fontsLoaded }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            title: "Settings",
                            headerTitleStyle: { fontFamily: "Poppins" },
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
