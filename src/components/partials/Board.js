import React, { Component } from 'react';
import { View } from 'react-native';

export default class Board extends Component {
    // Render the stacks
    renderStacks = (boardData, boardPlayable = false) => {
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
            <View style={ styles.bottomSection }>
                <View style={ styles.stacks }>
                    { this.renderStacks(this.state.stacksData, true) }
                </View>
            </View>
        )
    }
}
