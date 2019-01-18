import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Block extends Component {

    render() {
        const {
            block,
            isSelected,
        } = this.props;

        const propStyles = StyleSheet.create({
            blockColour: {
                backgroundColor: block.backgroundColour,
            }
        });

        if (block.isEmpty) {
            return (
                <View style={ [styles.block, styles.emptyBlock, styles.available] } />
            )
        };

        return(
            <View style={ [styles.block, propStyles.blockColour, isSelected && styles.selected] }>
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
        borderWidth: 2,
    },
    blockText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    emptyBlock: {
        borderColor: 'transparent',
    },
    selected: {
        borderColor: '#26d6d2',
        shadowColor: '#26d6d2',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    available: {
        borderStyle: 'dashed',
        borderColor: '#1fd731',
    }
});
