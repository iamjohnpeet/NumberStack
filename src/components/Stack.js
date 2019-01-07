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

        this.props.handleStackSelect(blocks, this.props.stack, this.props.id);

    }

    render() {
        const {
            isSelected,
        } = this.props;

        const blocks = this.renderBlocks();

        return (
            // ALSO NEEDS TO BE GREEN BORDER IF ITS SELECTED (EVEN IF ITS NOT EMPTY)
            <View style={ [styles.container, this.hasEmpty && isSelected && styles.selected] }>
                <TouchableWithoutFeedback onPress={ this.hasEmpty ? this.handleClick : null }>
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
        borderColor: 'green',
    }
});
