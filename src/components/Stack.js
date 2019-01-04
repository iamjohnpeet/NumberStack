import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// CREATE A REPO FOR THIS

export default class Stack extends Component {
    renderBlocks = () => {
        const stack = this.props.stack;
        const blocks = stack.map((block, key) => {
            console.log(block);

            if (block === "") {
                return <Text key={ key }>Empty</Text>
            };

            return(
                <Text key={ key }>Block {block}</Text>
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
    }
});
