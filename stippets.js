// APP.JS

handleStackSelect(block, stack, stackIndex, emptySpace) {
    const {
        selectedStack,
        isBoardSelected,
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
            selectedBlock: block,
        }, );
    }

    if (emptySpace) {
        this.emptySpace = emptySpace;
    }

    if ( isBoardSelected && emptySpace ) {
        this.moveElementInArray(stackIndex)
    }
}




moveElementInArray(stackId) {
    let array = this.shuffledData;
    const value = this.state.selectedBlock;
    const oldIndex = array.indexOf(value);

    if (oldIndex > -1) {
        let newIndex = ((stackId * 3) + this.emptySpace);

        if (newIndex < 0){
            newIndex = 0
        } else if (newIndex >= array.length){
            newIndex = array.length;
        }

        let arrayClone = array.slice();
        arrayClone.splice(oldIndex,1);

        arrayClone.splice(newIndex,0,value);

        this.setState({
            stacksData: this.groupData(arrayClone),
        });
    }

    this.setState({
        isBoardSelected: false,
        selectedStack: null,
    });

    return array;
}

// this.moveElementInArray(this.shuffledData, block, stacksDataBlockIndex)

    // moveElementInArray = (array, value, positionChange) => {
    //     const oldIndex = array.indexOf(value);

    //     if (oldIndex > -1) {
    //         let newIndex = (oldIndex + positionChange);

    //         if (newIndex < 0){
    //             newIndex = 0
    //         } else if (newIndex >= array.length){
    //             newIndex = array.length
    //         }

    //         let arrayClone = array.slice();
    //         arrayClone.splice(oldIndex,1);

    //         arrayClone.splice(newIndex,0,value);

    //         return arrayClone
    //     }

    //     return array
    // }





// STACK.JS


    renderBlocks = () => {
        const stack = this.props.stack;

        const blocks = stack.map((block, key) => {
            if (block.isEmpty === true) {
                this.emptySpace.push(key);
            }

            return <Block key={ key } block={ block } />
        });

        return blocks;
    };

    handleClick = () => {
        const stack = this.props.stack;
        const { isBoardSelected } = this.props;

        const blocks = stack.find(block => {
            if (block.isEmpty == null) {
                return block;
            }
        });

        if (!blocks) {
            this.props.moveSelectedBlock(this.props.id);
            return;
        }

        this.props.handleStackSelect(blocks, stack, this.props.id, this.emptySpace[this.emptySpace.length - 1]);
    }
