import React, { PureComponent } from 'react'
import { View, Text } from 'react-native';

class Timer extends PureComponent {
    state = {
        millisecondsElapsed: 0,
    };

    componentDidMount() {
        this.resetTimer();
        this.startTimer();
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.setState({
                millisecondsElapsed: this.state.millisecondsElapsed + 100
            })
        }, 100)
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    resetTimer = () => {
        this.setState({
            millisecondsElapsed: 0,
        });
    }

    getMinutes() {
        return (`0${ Math.floor((this.state.millisecondsElapsed / (1000 * 60)) % 60) }`).slice(-2);
    }

    getSeconds() {
        return (`0${ Math.floor((this.state.millisecondsElapsed / 1000) % 60) }`).slice(-2);
    }

    getMilliseconds() {
        return (`0${ (this.state.millisecondsElapsed % 1000) / 100 }`).slice(-1);
    }

    render() {
        this.props.stopTimer && this.stopTimer();

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
