import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { updateTime } from '../../state/actions/timer';

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
                millisecondsElapsed: this.state.millisecondsElapsed + 100,
            })
        }, 100)
    }

    stopTimer() {
        clearInterval(this.timer);
        updateTime(this.state.millisecondsElapsed)
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
            <View style={ styles.timer }>
                <View style={ styles.timerNumeric }><Text>{ `${this.getMinutes()}:` }</Text></View>
                <View style={ styles.timerNumeric }><Text>{ `${this.getSeconds()}.` }</Text></View>
                <View style={ styles.timerNumeric }><Text>{ `${this.getMilliseconds()}` }</Text></View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    timer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    timerNumeric: {
        width: 22,
    }
});

// const mapDispatchToProps = {
//     updateTime,
// };

export default Timer;

// export default connect(null, mapDispatchToProps)(Timer);
