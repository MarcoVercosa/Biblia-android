import * as React from "react"

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from "../pages/home";
import Leitura from "../pages/leitura";
import Harpa from "../pages/harpa";



export default function Routes(): JSX.Element {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();


    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home}
                    options={{
                        title: 'Home',
                        headerStyle: {
                            backgroundColor: "#08a0ff",
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerTitleAlign: "center",
                    }}
                />
                <Tab.Screen name="Leitura" component={Leitura}
                    options={{
                        headerShown: false
                    }}
                />
                <Tab.Screen name="Harpa" component={Harpa}
                    options={{
                        headerShown: false
                    }}
                />
            </Tab.Navigator>

        </NavigationContainer>

    )
}


