import React, { PureComponent } from 'react'
import { View, Text } from 'react-native';

class Timer extends PureComponent {
    getMinutes() {
        return (`0${ Math.floor((this.props.millisecondsElapsed / (1000 * 60)) % 60) }`).slice(-2);
    }

    getSeconds() {
        return (`0${ Math.floor((this.props.millisecondsElapsed / 1000) % 60) }`).slice(-2);
    }

    getMilliseconds() {
        return (`0${ (this.props.millisecondsElapsed % 1000) / 100 }`).slice(-1);
    }

    render() {
        return (
            <View style={ { flexDirection: 'row', justifyContent: 'center', } }>
                <View style={ { width: 22 } }><Text>{ `${this.getMinutes()}:` }</Text></View>
                <View style={ { width: 22 } }><Text>{ `${this.getSeconds()}.` }</Text></View>
                <View style={ { width: 22 } }><Text>{ `${this.getMilliseconds()}` }</Text></View>
            </View>
        );
    }

}

export default Timer;
