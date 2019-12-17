
function shiftBackward(cell, word) {
    let prev = word.filter(c => c.id < cell.id)
    return word.find(c => c.id < cell.id) ? prev[prev.length - 1]: cell
}

function currentCellHasLetter(cell, enteredLetters) {
    return enteredLetters[cell.id]
}

export { shiftBackward,
        currentCellHasLetter }