import React, { useState, useEffect } from "react"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createContext } from "react";
import { IContext } from "../interface/IContext";
import { IContextAppFavoritos } from "../interface/IContext";

import Home from "../pages/home";
import Leitura from "../pages/leitura";
import Harpa from "../pages/harpa";
import Favoritos from "../pages/favoritos";
import Pesquisa from "../pages/pesquisa";
import Configuracao from "../pages/configuracao";
import { contextConfiguracoes } from "../components/contextAPI/contextAppConfig";
import { contextAppFavoritos } from "../components/contextAPI/contextAppFavoritos";

const Context = createContext({ contextConfiguracoes })
const ContextFavoritos = createContext({ contextAppFavoritos })
export default function Routes(): JSX.Element {
    const [context, setContext] = useState<IContext>(contextConfiguracoes)
    const [contextFavoritos, setContextFavoritos] = useState<IContextAppFavoritos>(contextAppFavoritos)
    const Tab = createBottomTabNavigator();
    useEffect(() => {
        //se a aplicação for encerrada e aberta novamente: checa se ha dados ja conf no local storage
        const DataLocalStorageConfiguracoes = async () => {
            let retorno = await context.CarregaDadosLocalStorage()
            if (retorno) { setContext(retorno) }
        }
        DataLocalStorageConfiguracoes()
    }, [])
    useEffect(() => {
        //sempre que houver alguma alteração no context, armazena no local storage
        context.SalvaDadosLocalStorage(context)
    }, [context])
    return (
        <Context.Provider value={{ context, setContext } as any}>
            <ContextFavoritos.Provider value={{ contextFavoritos, setContextFavoritos } as any}>
                <NavigationContainer>
                    <Tab.Navigator initialRouteName="Favoritos"
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ color, size }) => {
                                let iconName: string;

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
                                    case 'Favoritos':
                                        iconName = 'bookmark';
                                        break;
                                    case 'Configuracao':
                                        iconName = 'eye';
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
                            options={{ title: '', headerShown: false, }}
                        />
                        <Tab.Screen name="Leitura" component={Leitura}
                            options={{ title: '', headerShown: false, }}
                        />
                        <Tab.Screen name="Pesquisa" component={Pesquisa}
                            options={{ title: '', headerShown: false, }}
                        />
                        <Tab.Screen name="Harpa" component={Harpa}
                            options={{ title: '', headerShown: false }}
                        />
                        <Tab.Screen name="Favoritos" component={Favoritos}
                            options={{ title: '', headerShown: false }}
                        />
                        <Tab.Screen name="Configuracao" component={Configuracao}
                            options={{ title: '', headerShown: false }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </ContextFavoritos.Provider>
        </Context.Provider>
    )
}
export { Context, ContextFavoritos }


