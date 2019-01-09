import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Block from '../components/Block';

export default class Stack extends Component {
    hasEmpty = false;

    renderBlocks = () => {
        const stack = this.props.stack;

        const blocks = stack.map((block, key) => {
            if (block.isEmpty == true) {
                this.hasEmpty = true;
            }

            return <Block key={ key } block={ block } />
        });

        return blocks;
    };

    handleClick = () => {
        const stack = this.props.stack;
        const blocks = stack.find(block => {
            if (block.isEmpty == null) {
                return block;
            }
        });

        if(!blocks) {
            return false;
        }

        this.props.handleStackSelect(blocks, stack, this.props.id);

    }

    render() {
        const {
            isBoardSelected,
            isStackSelected,
        } = this.props;

        const blocks = this.renderBlocks();

        return (
            <View style={ [styles.container, this.hasEmpty && isBoardSelected && styles.available, isStackSelected && styles.selected] }>
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
