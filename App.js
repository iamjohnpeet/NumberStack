import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Stack from './src/components/Stack';

// CREATE A REPO FOR THIS

let data = [
    ['r1', 'r2', 'r3'],
    ['y1', 'y2', 'y3'],
    ['b1', 'b2', 'b3'],
    ['', '', '']
]

export default class NumberStack extends Component {
    renderStacks = () => {
        const stacks = data.map((stack, key) => {
            console.log(stack);

            return(
                <Stack key={ key } id={ key } stack={ stack } />
            );
        });

        return stacks;
    };

    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.stacks }>
                    { this.renderStacks() }
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
    stacks: {
        flexDirection: 'row',
    }
});
