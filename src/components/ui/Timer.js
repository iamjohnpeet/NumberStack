import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { updateTimer } from '../../state/actions/timer';

class Timer extends PureComponent {
    state = {
        millisecondsElapsed: 0,
    };

    componentDidMount() {
        // TODO: Why does this need to be set and why can't it be zero?!
        this.props.updateTimer(1);
        this.resetTimer();
        this.startTimer();
    }

    componentWillUnmount() {
        this.stopTimer();
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
    }

    recordTime() {
        this.props.updateTimer(this.state.millisecondsElapsed);
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
        if (this.props.gameEnded) {
            this.stopTimer();
            this.recordTime();
        }

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

const mapDispatchToProps = {
    updateTimer,
};

const mapStateToProps = state => ({
    gameEnded: state.gameStatus.hasGameEnded,
    time: state.timer.time,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
