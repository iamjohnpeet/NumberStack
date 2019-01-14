import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Block from '../components/Block';

export default class Stack extends Component {
    emptySpaces = [];

    renderBlocks = () => {
        const stack = this.props.stack;

        const blocks = stack.map((block, index) => {
            if (block.isEmpty === true) {
                this.emptySpaces.push(index);
            }

            return <Block key={ index } block={ block } />
        });

        return blocks;
    };

    handleClick = () => {
        const {
            id,
            stack,
            isStackSelected,
        } = this.props;
        const availableSpace = ((id * 3) + this.emptySpaces[this.emptySpaces.length - 1]);

        const findFirstAvailableBlock = block => {
            return !block.isEmpty;
        }
        const selectedBlock = stack.findIndex(findFirstAvailableBlock);
        const selectBlockPos = ((id * 3) + selectedBlock);


        if (isStackSelected && availableSpace >= 0) {
            this.props.moveSelectedBlock(availableSpace);
            return;
        } else if (availableSpace >= 0) {
            this.props.handleStackSelect(id, selectBlockPos, availableSpace);
            return;
        } else {
            this.props.handleStackSelect(id, selectBlockPos);
            return;
        }

    }

    render() {
        const {
            isBoardSelected,
            isStackSelected,
        } = this.props;

        const blocks = this.renderBlocks();

        return (
            <View style={ [styles.container, this.emptySpaces.length && isBoardSelected && styles.available, isStackSelected && styles.selected] }>
                <TouchableWithoutFeedback onPress={ this.handleClick }>
                    <View>
                        { blocks }
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        borderColor: 'white',
        borderWidth: 2,
    },
    selected: {
        borderColor: 'blue',
    },
    available: {
        borderColor: 'green',
    }
});
