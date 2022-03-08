import React, { useState } from "react"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createContext } from "react";

import Home from "../pages/home";
import Leitura from "../pages/leitura";
import Harpa from "../pages/harpa";
import Sobre from "../pages/sobre";
import Pesquisa from "../pages/pesquisa";
import Configuracao from "../pages/configuracao";
import { values } from "../components/contextAPI";

const Context = createContext({ values })

export default function Routes(): JSX.Element {
    const [context, setContext] = useState(values)
    const Tab = createBottomTabNavigator();

    return (
        <Context.Provider value={{ context, setContext } as any}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName;

                            switch (route.name) {
                                case 'Home':
                                    iconName = 'home';
                                    break;
                                case 'Leitura':
                                    iconName = 'book';
                                    break;
                                case 'Pesquisa':
                                    iconName = 'search';
                                    break;
                                case 'Harpa':
                                    iconName = 'music';
                                    break;
                                case 'Configuracao':
                                    iconName = 'eye';
                                    break;
                                case 'Sobre':
                                    iconName = 'thumbs-up';
                                    break;
                                default:
                                    iconName = 'circle';
                                    break;
                            }

                            return <FontAwesome name={iconName} size={35} color={color} />;
                        },
                        tabBarActiveTintColor: '#43ffce',
                        tabBarInactiveTintColor: "#777",
                        tabBarStyle: { height: 60, padding: 0, marginBottom: "-3%" }
                    })}
                >
                    <Tab.Screen name="Home" component={Home}
                        options={{
                            title: '',
                            headerShown: false,
                        }}
                    />
                    <Tab.Screen name="Leitura" component={Leitura}
                        options={{
                            title: '',
                            headerShown: false,

                        }}
                    />
                    <Tab.Screen name="Pesquisa" component={Pesquisa}
                        options={{
                            title: '',
                            headerShown: false,

                        }}
                    />
                    <Tab.Screen name="Harpa" component={Harpa}
                        options={{
                            title: '',
                            headerShown: false
                        }}
                    />
                    <Tab.Screen name="Configuracao" component={Configuracao}
                        options={{
                            title: '',
                            headerShown: false
                        }}
                    />
                    <Tab.Screen name="Sobre" component={Sobre}
                        options={{
                            title: '',
                            headerShown: false
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </Context.Provider>

    )
}

export { Context }


