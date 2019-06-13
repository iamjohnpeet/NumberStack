import React, { PureComponent } from 'react';
import { SafeAreaView, AsyncStorage, View, StyleSheet, Text, Button, Modal, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'
import { updateHasGameEnded } from '../../state/actions/gameStatus';
import { data, emptyStack } from '../../data';
import { compareArrays, swapArrayElements, randomiseArray, groupArray } from '../../lib/utils';
import Timer from '../ui/Timer'
import Stack from '../ui/Stack'

// ADD README

// UPDATE GIT IGNORE FILE

class GameScreen extends PureComponent {
    // Global State, functions and vars
    state = {
        stacksData: [],
        boardData: [],
        isBoardSelected: false,
        selectedStack: null,
        gameComplete: false,
        moves: 0,
        score: null,
        bestScore: 0,
        modalVisible: false,
    };

    shuffledData;
    selectBlockPos = null;

    handleStackSelect = this.handleStackSelect.bind(this);
    swapBlocks = this.swapBlocks.bind(this);
    compareData = this.compareData.bind(this);

    // Compnent Mount
    componentDidMount() {
        this.startGame();
    }

    async retrieveData() {
        try {
            const bestScore = await AsyncStorage.getItem('score');

            if (bestScore !== null) {
                this.setState({
                    bestScore: parseInt(bestScore),
                }, () => console.log('bestScore', this.state.bestScore));
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    storeData(score) {
        const { bestScore } = this.state;

        if (bestScore === 0 || score < bestScore) {
            AsyncStorage.setItem('score', score.toString());
        }

        return false;
    }

    setModalVisible(visible) {
      this.setState({ modalVisible: visible });
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

    // Reset the state object
    resetMoves = () => {
        this.setState({
            moves: 0,
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

    // start game
    startGame() {
        const dataShuffled = this.shuffleData(data);
        this.shuffledData = this.shuffleData(data);

        const stacksData = this.groupData(this.shuffledData);

        this.retrieveData();

        this.setState({
            stacksData,
            boardData: dataShuffled,
        });

        this.resetState();
        this.resetMoves();
        this.setModalVisible(false);
    }

    // End game
    endGame() {
        const score = this.props.time;

        this.storeData(score)
        this.setModalVisible(true);

        this.setState({
            gameEnded: true,
            score,
        })

        this.props.updateHasGameEnded(true);
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
            <SafeAreaView style={ styles.container }>

                <View style={ styles.scoreBoard }>
                    <View style={ styles.moves }>
                        <Timer />
                    </View>
                    { <Text style={ styles.moves }>Best time: { this.state.bestScore.toLocaleString() }</Text>}
                </View>

                <View style={ styles.topSection }>
                    <View style={ styles.topSectionBoard }>
                        <View style={ styles.stacks }>
                            { this.renderStacks(boardData) }
                        </View>
                    </View>
                </View>
                <View style={ styles.bottomSection }>
                    <View style={ styles.stacks }>
                        { this.renderStacks(this.state.stacksData, true) }
                    </View>
                </View>

                <Modal
                    animationType="fade"
                    transparent
                    visible={ this.state.modalVisible }
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            width: 260,
                            height: 180,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            { this.state.score && (
                                <View>
                                    <View>
                                        <Text style={ styles.score }>Your Score: { this.state.score.toLocaleString() }</Text>
                                    </View>
                                    <View>
                                        { this.state.score < (this.state.bestScore + 1000000) && <Text style={ styles.score }>Best score yet! 🎉</Text>}
                                    </View>
                                </View>
                            ) }
                            <View style={{ flexDirection: "row" }}>
                                <TouchableHighlight
                                    style={ styles.button }
                                    onPress={() => {
                                    this.startGame();
                                }}>
                                    <Text style={{ fontWeight: 'bold' }}>New game</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scoreBoard: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingTop: 6,
        paddingBottom: 6,
    },
    moves: {
        flex: 1,
        textAlign: 'center',
    },
    score: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },
    topSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingTop: 20,
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
    },
    button: {
        borderColor: 'black',
        borderWidth: 3,
        padding: 10,
        margin: 4,
    }
});

const mapDispatchToProps = {
    updateHasGameEnded,
};

const mapStateToProps = state => ({
    time: state.timer.time,
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
