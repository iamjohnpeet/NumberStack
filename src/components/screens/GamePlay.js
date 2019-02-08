import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux'
import { data, emptyStack } from '../../data';
import { compareArrays, swapArrayElements, randomiseArray, groupArray } from '../../lib/utils';
import Stack from '../ui/Stack'

// ADD README

// UPDATE GIT IGNORE FILE

class GamePlay extends Component {
    state = {
        stacksData: [],
        boardData: [],
        isBoardSelected: false,
        selectedStack: null,
        gameComplete: false,
    };

    shuffledData;
    selectBlockPos = null;

    handleStackSelect = this.handleStackSelect.bind(this);
    swapBlocks = this.swapBlocks.bind(this);
    compareData = this.compareData.bind(this);

    componentDidMount() {
        const dataShuffled = this.shuffleData(data);
        this.shuffledData = this.shuffleData(data);

        const stacksData = this.groupData(this.shuffledData);

        this.setState({
            stacksData,
            boardData: dataShuffled,
        });
    }

    shuffleData = data => {
        const shuffledData = randomiseArray(data);

        emptyStack.forEach(emptyBlock => {
            shuffledData.push(emptyBlock);
        })

        return shuffledData;
    };

    resetState = () => {
        this.setState({
            isBoardSelected: false,
            selectedStack: null,
        });
    }

    groupData = data => {
        const groupedData = groupArray(data, 3);

        return groupedData;
    }

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

    compareData() {
        const arr1 = this.shuffledData.map(el => el.id)
        const arr2 = this.state.boardData.map(el => el.id)

        this.setState({
            gameComplete: compareArrays(JSON.stringify(arr1), JSON.stringify(arr2)),
        })
    }

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
        const boardData = this.groupData(this.state.boardData);

        return (
            <View style={ styles.container }>
                <View style={ styles.topSection }>
                    <View style={ styles.topSectionBoard }>
                        <View style={ styles.stacks }>
                            { this.renderStacks(boardData) }
                        </View>
                        {/* <Board
                            boardData={ this.state.stacksData }
                            boardPlayable={ false }
                            { ...this.props }
                        /> */}
                        <Text>{ this.state.gameComplete ? 'Complete' : 'Not complete' }</Text>
                    </View>
                </View>
                <View style={ styles.bottomSection }>
                    <View style={ styles.stacks }>
                        { this.renderStacks(this.state.stacksData, true) }
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
        paddingTop: 60,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        backgroundColor: '#ddd'
    },
    topSectionBoard: {
        width: 240,
    },
    bottomSection: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    stacks: {
        flexDirection: 'row',
        borderBottomWidth: 14,
        borderBottomColor: '#2b1d0e',
    }
});

const mapStateToProps = state => {
    return {
        gameCompleted: getGameStatus(state.gameCompleted)
    }
}

export default connect(mapStateToProps)(GamePlay);
