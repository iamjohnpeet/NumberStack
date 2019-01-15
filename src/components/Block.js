import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Block extends Component {

    render() {
        const { block } = this.props;

        const propStyles = StyleSheet.create({
            blockColour: {
                backgroundColor: block.backgroundColour,
            }
        });

        if (block.isEmpty) {
            return (
                <View style={ styles.block } />
            )
        };

        return(
            <View style={ [styles.block, propStyles.blockColour] }>
                <Text style={ styles.blockText }>{block.number}</Text>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    block: {
        flexGrow: 1,
        aspectRatio: 1,
        justifyContent: 'center',
        marginBottom: 4,
        borderRadius: 5,
    },
    blockText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
