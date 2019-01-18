import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { data, emptyStack } from './src/data';
import Stack from './src/components/Stack';

// ADD README

// UPDATE GIT IGNORE FILE

export default class NumberStack extends Component {
    state = {
        stacksData: [],
        isBoardSelected: false,
        selectedStack: null,
    };

    handleStackSelect = this.handleStackSelect.bind(this);
    swapBlocks = this.swapBlocks.bind(this);
    shuffledData;
    selectBlockPos = null;

    componentDidMount() {
        this.shuffledData = this.shuffleData(data);

        const stacksData = this.groupData(this.shuffledData);

        this.setState({
            stacksData,
        });
    }

    shuffleData = data => {
        let shuffledData = data.map(currentItem => [Math.random(), currentItem])
            .sort((currentItem, nextItem) => currentItem[0] - nextItem[0])
            .map(currentItem => currentItem[1]);

        emptyStack.forEach(emptyBlock => {
            shuffledData.push(emptyBlock);
        })

        return shuffledData;
    };

    groupData = longData => {
        var i,j,chunk = 3;
        let groupedData = [];

        for (i = 0, j = longData.length; i < j; i += chunk) {
            groupedData.push(longData.slice(i, i + chunk));
        }

        return groupedData;
    }

    handleStackSelect(stackIndex, selectBlockPos, availableSpace) {
        const {
            isBoardSelected,
            selectedStack,
        } = this.state;

        if(selectedStack === stackIndex) {
            this.setState({
                isBoardSelected: false,
                selectedStack: null,
            });
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
            [this.shuffledData[availableSpace], this.shuffledData[this.selectBlockPos]] = [this.shuffledData[this.selectBlockPos], this.shuffledData[availableSpace]];

            this.setState({
                stacksData: this.groupData(this.shuffledData),
                isBoardSelected: false,
                selectedStack: null,
            });

            this.selectBlockPos = null;
        } else {
            this.setState({
                isBoardSelected: false,
                selectedStack: null,
            });
        }
    }

    renderStacks = () => {
        const {
            stacksData,
            isBoardSelected,
            selectedStack,
        } = this.state;

        const stacks = stacksData.map((stack, index) => {
                return (<Stack
                    key={ index }
                    id={ index }
                    stack={ stack }
                    isBoardSelected={ isBoardSelected }
                    isStackSelected={ selectedStack === index }
                    handleStackSelect={ this.handleStackSelect }
                    moveSelectedBlock={ this.swapBlocks }
                />);
            }
        );

        return stacks;
    };

    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.topSection }>
                    <Text>Hello</Text>
                </View>
                <View style={ styles.bottomSection }>
                    <View style={ styles.stacks }>
                        { this.renderStacks() }
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    bottomSection: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    stacks: {
        flexDirection: 'row',
    }
});
