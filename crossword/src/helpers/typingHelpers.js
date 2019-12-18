import { orderedById } from './puzzleHelpers'

function shiftBackward(cell, word) {
    let prev = word.filter(c => c.id < cell.id)
    return word.find(c => c.id < cell.id) ? prev[prev.length - 1]: cell
}

function shiftForward(cell, allCells, enteredLetters, direction) {
    let word = findWord(cell, allCells, direction)
    let next = findNextBlankCell(word, cell, enteredLetters)
    if (!next) { next = findFirstBlankCell(word, enteredLetters) }
    if (!next) { next = findNextCell(word, cell) }
    return next ? next : cell
}

function findWord(thisCell, allCells, direction) {
    let clue = cellClueForCurrentDirection(thisCell, direction)
    let word = cellsHavingClue(clue, allCells)
    return orderedById(word)
}

function findNextBlankCell(cells, currentCell, letters) {
    return orderedById(cells).find(cell => {
        return cell.id > currentCell.id && cellIsBlank(cell, letters)
    })
}

function findFirstBlankCell(cells, letters) {
    return orderedById(cells).find(cell => {
        return cellIsBlank(cell, letters)
    })
}

function findNextCell(cells, currentCell) {
    return orderedById(cells).find(cell => {
        return cell.id > currentCell.id
    })
}

function cellClueForCurrentDirection(cell, direction) {
    return cell.clues.find(clue => {
        return clue.direction === direction
    })
}

function cellHasClue(thisClue, cell) {
    return !!cell.clues.find(clue => {
        return clue.id === thisClue.id
    })
}

function cellIsBlank(cell, letters) {
    return !letters[cell.id]
}

function cellsHavingClue(clue, cells) {
    return cells.filter(cell => {
        return cellHasClue(clue, cell)
    })
}

function currentCellHasLetter(cell, enteredLetters) {
    return enteredLetters[cell.id]
}

export { shiftBackward,
         currentCellHasLetter,
         shiftForward,
         findWord }