import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Questions from "./screens/Questions";
import Question from "./screens/Question";
import AddQuestions from "./screens/AddQuestions";
import Settings from "./screens/Settings";

import { faAdd, faCog, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable } from "react-native";

import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
    const Stack = createNativeStackNavigator();

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
                        }}
                    />
                    <Stack.Screen name="Question" component={Question} />
                    <Stack.Screen
                        name="Questions"
                        component={Questions}
                        options={{
                            headerRight: () => (
                                <Pressable>
                                    <FontAwesomeIcon icon={faAdd} size={22} />
                                </Pressable>
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="AddQuestions"
                        component={AddQuestions}
                    />
                    <Stack.Screen name="Settings" component={Settings} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
