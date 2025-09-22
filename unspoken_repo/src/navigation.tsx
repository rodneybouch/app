import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./screens/Dashboard";
import Actions from "./screens/Actions";
import Rituals from "./screens/Rituals";
import Coach from "./screens/Coach";
import Settings from "./screens/Settings";
import { colors } from "./theme";
const Stack = createNativeStackNavigator();
export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.card }, headerTintColor: colors.text, contentStyle: { backgroundColor: colors.bg } }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Actions" component={Actions} />
        <Stack.Screen name="Rituals" component={Rituals} />
        <Stack.Screen name="Coach" component={Coach} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
