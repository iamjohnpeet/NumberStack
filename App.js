import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import store from './src/state/store';
import StartScreen from './src/components/screens/StartScreen';
import GameScreen from './src/components/screens/GameScreen';



const MainNavigator = createStackNavigator({
    StartScreen: { screen: StartScreen },
    GameScreen: { screen: GameScreen },
},
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <AppContainer />
            </Provider>
        );
    }
}
