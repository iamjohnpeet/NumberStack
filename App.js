import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Stack from './src/components/Stack';

// ADD README

// UPDATE GIT IGNORE FILE

/*
    Index of selectedBlock (selectedStack * 3 + First Free Block)
    Index of emptyBlock (selectedStack * 3 + Last Empty Block)
*/

export default class NumberStack extends Component {
    state = {
        stacksData: [],
        isBoardSelected: false,
        selectedStack: null,
    };
    handleStackSelect = this.handleStackSelect.bind(this);
    swapBlocks = this.swapBlocks.bind(this);
    shuffledData;
    emptySpace = null;
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

        console.log('selectedStack === stackIndex) : ', selectedStack, stackIndex);

        if(selectedStack === stackIndex) {
            console.log('Same stack')
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

        if (isBoardSelected && availableSpace >= 0) {
            this.swapBlocks(availableSpace)
        } else {
            this.selectBlockPos = selectBlockPos;
        }
    }

    swapBlocks(availableSpace) {
        [this.shuffledData[availableSpace], this.shuffledData[this.selectBlockPos]] = [this.shuffledData[this.selectBlockPos], this.shuffledData[availableSpace]];

        this.setState({
            stacksData: this.groupData(this.shuffledData),
            isBoardSelected: false,
            selectedStack: null,
        });

        this.emptySpace = null;
        this.selectBlockPos = null;
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
                <View style={ styles.stacks }>
                    { this.renderStacks() }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    stacks: {
        flexDirection: 'row',
    }
});

const red = '#E3283E'
const yellow = '#E3AC12'
const blue = '#01ACED'

let data = [
    {
        backgroundColour: red,
        number: 1,
        id: 'r1',
    },
    {
        backgroundColour: red,
        number: 2,
        id: 'r2',
    },
    {
        backgroundColour: red,
        number: 3,
        id: 'r3',
    },
    {
        backgroundColour: yellow,
        number: 1,
        id: 'y1',
    },
    {
        backgroundColour: yellow,
        number: 2,
        id: 'y2',
    },
    {
        backgroundColour: yellow,
        number: 3,
        id: 'y3',
    },
    {
        backgroundColour: blue,
        number: 1,
        id: 'b1',
    },
    {
        backgroundColour: blue,
        number: 2,
        id: 'b2',
    },
    {
        backgroundColour: blue,
        number: 3,
        id: 'b3',
    },
];
const emptyStack = [
    {
        id: 'empty1',
        isEmpty: true,
    },
    {
        id: 'empty2',
        isEmpty: true,
    },
    {
        id: 'empty3',
        isEmpty: true,
    }
];
