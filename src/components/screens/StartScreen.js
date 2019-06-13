import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class StartScreen extends PureComponent {
    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={ styles.container}>
                <View>
                    <Text>Your best time so far:</Text>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.bestTime }>1min 30secs</Text>
                </View>
                <View>
                    <Text>Your previous time was:</Text>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.previousTime }>2min 26secs</Text>
                </View>
                <View style={ styles.row }>
                    <TouchableOpacity onPress={() => navigate('GameScreen')}>
                        <Text style={ styles.button }>Start new game</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
       marginBottom: 18,
    },
    bestTime: {
        fontSize: 32,
    },
    previousTime: {
        fontSize: 24,
    },
    button: {
        padding: 20,
        backgroundColor: '#000',
        color: '#fff',
        fontSize: 18,
    }
});

export default StartScreen;
