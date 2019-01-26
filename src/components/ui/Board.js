import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';
import Stack from './Stack';

export default class Board extends Component {
    state = {
        isBoardSelected: false,
        selectedStack: null,
    };

    handleStackSelect = this.handleStackSelect.bind(this);
    swapBlocks = this.swapBlocks.bind(this);

    handleStackSelect(stackIndex, selectBlockPos, availableSpace) {
        const {
            isBoardSelected,
            selectedStack,
        } = this.state;

        if(selectedStack === stackIndex) {
            this.resetState();
        } else {
            this.setState({
                isBoardSelected: true,
                selectedStack: stackIndex,
            });
        }

        if (isBoardSelected && availableSpace >= 0 && selectedStack !== stackIndex) {
            this.swapBlocks(availableSpace, stackIndex)
        } else {
            this.selectBlockPos = selectBlockPos;
        }
    }

    swapBlocks(availableSpace, stackIndex) {
        const { selectedStack } = this.state;

        if(selectedStack !== stackIndex) {
            swapArrayElements(this.shuffledData, availableSpace, this.selectBlockPos);

            this.setState({
                stacksData: this.groupData(this.shuffledData),
            });

            this.resetState();
            this.selectBlockPos = null;
        } else {
            this.resetState();
        }

        this.compareData();
    }

    renderStacks = () => {
        const {
            boardData,
            boardPlayable,
        } = this.props;

        console.log('Props : ', this.props)

        const {
            isBoardSelected,
            selectedStack,
        } = this.state;

        const stacks = boardData.map((stack, index) => {
                return (<Stack
                    key={ index }
                    id={ index }
                    stack={ stack }
                    isBoardSelected={ isBoardSelected }
                    isStackSelected={ selectedStack === index }
                    handleStackSelect={ this.handleStackSelect }
                    moveSelectedBlock={ this.swapBlocks }
                    gamePieces={ boardPlayable }
                />);
            }
        );

        return stacks;
    };

    render() {
        return (
            <View style={ styles.stacks }>
                { this.renderStacks() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    stacks: {
        flexDirection: 'row',
        borderBottomWidth: 14,
        borderBottomColor: '#2b1d0e',
    }
});
