import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Block from '../components/Block';

export default class Stack extends Component {
    renderBlocks = () => {
        const stack = this.props.stack;
        const blocks = stack.map((block, key) => {
            // console.log(block);

            return(
                <Block key={ key } block={ block } />
            );
        });

        return blocks;
    };

    render() {
        return (
            <View style={ styles.container }>
                { this.renderBlocks() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
    }
});
