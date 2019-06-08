import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import store from './src/state/store';
import GamePlay from './src/components/screens/GamePlay';

export default class App extends Component {
    render() {
        return (
            <Provider store={ store }>
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
