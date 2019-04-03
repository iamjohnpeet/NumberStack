import React, { Component } from 'react';
import { AsyncStorage, View, StyleSheet, Text } from 'react-native';
// import { connect } from 'react-redux'
import { data, emptyStack } from '../../data';
import { compareArrays, swapArrayElements, randomiseArray, groupArray } from '../../lib/utils';
import Stack from '../ui/Stack'

// ADD README

// UPDATE GIT IGNORE FILE

class GamePlay extends Component {
    // Global State, functions and vars
    state = {
        stacksData: [],
        boardData: [],
        isBoardSelected: false,
        selectedStack: null,
        gameComplete: false,
        moves: 0,
        score: null,
        millisecondsElapsed: 0,
        bestScore: 0,
    };

    shuffledData;
    selectBlockPos = null;

    handleStackSelect = this.handleStackSelect.bind(this);
    swapBlocks = this.swapBlocks.bind(this);
    compareData = this.compareData.bind(this);

    // Compnent Mount
    componentDidMount() {
        const dataShuffled = this.shuffleData(data);
        this.shuffledData = this.shuffleData(data);

        const stacksData = this.groupData(this.shuffledData);

        // const bestScore = AsyncStorage.getItem('score').then(score => parseInt(score));

        this.retrieveData();

        this.setState({
            stacksData,
            boardData: dataShuffled,
        });

        this.startTimer();
    }

    async retrieveData() {
        try {
            const bestScore = await AsyncStorage.getItem('score');

            this.setState({
                bestScore: parseInt(bestScore),
            }, () => console.log('bestScore', this.state.bestScore));

        } catch (error) {
            console.log(error.message);
        }
    }

    storeData(score) {
        if (score < this.state.bestScore) {
            AsyncStorage.setItem('score', score.toString());
        }

        return false;
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.setState({
                millisecondsElapsed: this.state.millisecondsElapsed + 1
            })
        }, 1)
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    getMinutes() {
        return (`0${ Math.floor((this.state.millisecondsElapsed / 100) / 60 % 60) }`).slice(-2);
    }

    getSeconds() {
        return (`0${ Math.floor((this.state.millisecondsElapsed / 100) % 60) }`).slice(-2);
    }

    getMilliseconds() {
        return (`0${ this.state.millisecondsElapsed % 100 }`).slice(-2);
    }

    // Shuffle data
    shuffleData = data => {
        const shuffledData = randomiseArray(data);

        emptyStack.forEach(emptyBlock => {
            shuffledData.push(emptyBlock);
        })

        return shuffledData;
    };

    // Reset the state object
    resetState = () => {
        this.setState({
            isBoardSelected: false,
            selectedStack: null,
        });
    }

    // Group the data
    groupData = data => {
        const groupedData = groupArray(data, 3);

        return groupedData;
    }

    // Stack selection
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

    // Swap blocks
    swapBlocks(availableSpace, stackIndex) {
        const { selectedStack } = this.state;

        if(selectedStack !== stackIndex) {
            swapArrayElements(this.shuffledData, availableSpace, this.selectBlockPos);

            this.setState({
                stacksData: this.groupData(this.shuffledData),
                moves: this.state.moves += 1,
            });

            this.resetState();
            this.selectBlockPos = null;
        } else {
            this.resetState();
        }

        this.compareData();
    }

    // Compare block order with original playing board
    compareData() {
        const arr1 = this.shuffledData.map(el => el.id)
        const arr2 = this.state.boardData.map(el => el.id)

        if (compareArrays(JSON.stringify(arr1), JSON.stringify(arr2))) {
            this.endGame();
        }
    }

    // End game
    endGame() {
        const score = this.state.moves * this.state.millisecondsElapsed;
        this.stopTimer();

        this.storeData(score)

        this.setState({
            gameComplete: true,
            score,
        })
    }

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

    // Render the board
    render() {
        const boardData = this.groupData(this.state.boardData);

        return (
            <View style={ styles.container }>
                <View style={ styles.scoreBoard }>
                    <Text style={ styles.score }>Time: { `${this.getMinutes()}:${this.getSeconds()}:${this.getMilliseconds()}` }</Text>
                    <Text style={ styles.score }>Moves: { this.state.moves }</Text>
                    { this.state.bestScore > 0 && <Text style={ styles.score }>Best Score: { this.state.bestScore }</Text>}
                </View>
                { this.state.score && (
                    <View style={ styles.scoreBoard }>
                        <Text style={ styles.score }>Your Score: { this.state.score }</Text>
                    </View>
                ) }
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
    scoreBoard: {
        height: 72,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingTop: 6,
        paddingBottom: 6,
    },
    score: {
        flex: 1,
        textAlign: 'center',
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

// const mapStateToProps = state => {
//     return {
//         gameCompleted: getGameStatus(state.gameCompleted)
//     }
// }

export default GamePlay;
