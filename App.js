import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Questions from "./screens/Questions";
import Question from "./screens/Question";
import AddQuestions from "./screens/AddQuestions";

export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Question" component={Question} />
                <Stack.Screen name="Questions" component={Questions} />
                <Stack.Screen name="AddQuestions" component={AddQuestions} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
