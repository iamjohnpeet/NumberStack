import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Stack from './src/components/Stack';

// ADD README

// UPDATE GIT IGNORE FILE

export default class NumberStack extends Component {
    state = {
        stacksData: [],
        isSelected: false,
    };
    handleStackSelect = this.handleStackSelect.bind(this)

    componentDidMount() {
        const stacksData = this.groupData();
        stacksData.push(emptyStack);

        this.setState({
            stacksData,
        });
    }

    handleStackSelect(block, stack, stackIndex) {
        const { isSelected} = this.state;

        console.log('block: ', block);
        console.log('stack: ', stack);

        this.setState({
            isSelected: !isSelected,
        });


        const emptyIndex = stack.findIndex(blockIndex => blockIndex.isEmpty);


        // WORK OUT HOW TO INSERT SELECTED BLOCK
        if ( emptyIndex >= 0 ) {
            stacksDataBlockIndex = ((stackIndex * 3) + emptyIndex)
            console.log("stackIndex : ", stackIndex);
            console.log('emptyIndex: ', emptyIndex);
            console.log('stacksDataBlockIndex: ', stacksDataBlockIndex);
            this.state.stacksData.splice(stacksDataBlockIndex, 1);
        }
    }

    renderStacks = () => {
        const {
            isSelected,
            stacksData,
        } = this.state;

        const stacks = stacksData.map((stack, key) => (
            <Stack
                key={ key }
                id={ key }
                stack={ stack }
                isSelected={ isSelected }
                handleStackSelect={ this.handleStackSelect }
            />)
        );

        return stacks;
    };

    shuffleData = data => (
        data.map(currentItem => [Math.random(), currentItem])
            .sort((currentItem, nextItem) => currentItem[0] - nextItem[0])
            .map(currentItem => currentItem[1])
    );

    groupData = () => {
        const dataSet = this.shuffleData(data);
        var i,j,chunk = 3;
        let groupedData = [];

        for (i = 0, j = dataSet.length; i < j; i += chunk) {
            groupedData.push(dataSet.slice(i, i + chunk));
        }

        return groupedData;
    }

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
        isEmpty: true,
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
