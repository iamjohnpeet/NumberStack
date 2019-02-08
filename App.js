import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { View } from 'react-native';
import numberStackApp from './reducers';
import GamePlay from './src/components/screens/GamePlay';

export default class App extends Component {
    render() {
        const store = createStore(numberStackApp)

        return (
            <Provider store={store}>
                <View style={ styles.container }>
                    <GamePlay />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
