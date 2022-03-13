import React, { useState, useEffect } from "react"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createContext } from "react";
import { IContext } from "../interface/IContext";

import Home from "../pages/home";
import Leitura from "../pages/leitura";
import Harpa from "../pages/harpa";
import Favoritos from "../pages/favoritos";
import Pesquisa from "../pages/pesquisa";
import Configuracao from "../pages/configuracao";
import { values } from "../components/contextAPI";

const Context = createContext({ values })
export default function Routes(): JSX.Element {
    const [context, setContext] = useState<IContext>(values)
    const Tab = createBottomTabNavigator();
    useEffect(() => {
        AsyncStorage.getItem("contextConfiguracao").then((value) => {
            //se a aplicação for encerrada e aberta novamente: checa se ha dados ja conf no local storage
            if (value) {
                let temp: IContext = JSON.parse(value)
                //as funções não são armazenadas no local storage, somente as keys e values(objs)
                //então so adiciona os valores abaixo no state e mantem as funções que já estão no state 
                setContext((prevState: any) => {
                    return {
                        ...prevState,
                        lightTheme: temp.lightTheme,
                        fonteSizeLeituraBiblia: temp.fonteSizeLeituraBiblia,
                        fonteSizeHino: temp.fonteSizeHino,
                        keepScreenOn: temp.keepScreenOn
                    }
                })
            }
        })
    }, [])
    useEffect(() => {
        //sempre que houver alguma alteração no context, armazena no local storage
        AsyncStorage.setItem("contextConfiguracao", JSON.stringify(context))
    }, [context])

    return (
        <Context.Provider value={{ context, setContext } as any}>
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Configuracao"
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
                                    iconName = 'bookmark';
                                    break;
                                default:
                                    iconName = 'circle';
                                    break;
                            }

                            return <FontAwesome name={iconName} size={35} color={color} />;
                        },
                        tabBarActiveTintColor: '#43ffce',
                        tabBarInactiveTintColor: "#777",
                        tabBarStyle: { height: 60, padding: 0, marginBottom: "-3%" },

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
                    <Tab.Screen name="Sobre" component={Favoritos}
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


