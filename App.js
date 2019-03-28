import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import { View } from 'react-native';
// THIS DOESNT EXIST YET!!!!
// import numberStackApp from './reducers';
import GamePlay from './src/components/screens/GamePlay';

export default class App extends Component {
    render() {
        // const store = createStore(numberStackApp)

        return (
            <View style={ styles.container }>
                <GamePlay />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
