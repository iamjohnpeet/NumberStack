import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Block = ({
    block,
    isSelected,
 }) => {
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
        borderColor: '#9FFC32',
        shadowColor: '#9FFC32',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    }
});

export default Block;
