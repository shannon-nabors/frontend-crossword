import { orderedById } from './puzzleHelpers'

function shiftBackward(cell, word) {
    let prev = word.filter(c => c.id < cell.id)
    return word.find(c => c.id < cell.id) ? prev[prev.length - 1]: cell
}

function shiftForward(cell, allCells, enteredLetters, direction) {
    let word = findWord(cell, allCells, direction)
    let next = findNextBlankCell(word, cell, enteredLetters)
    if (!next) { next = firstBlankCell(word, enteredLetters) }
    if (!next) { next = findNextCell(word, cell) }
    return next ? next : cell
}

function findWord(thisCell, allCells, direction) {
    let clue = cellClueForCurrentDirection(thisCell, direction)
    let word = cellsHavingClue(clue, allCells)
    return orderedById(word)
}

function findNextClue(clueId, puzzle, direction) {
    return clues(direction, puzzle).find(clue => clue.id > clueId)
}

function firstClue(direction, puzzle) {
    return clues(direction, puzzle)[0]
}

function clues(direction, puzzle) {
    return (direction === "across" ? puzzle.across_clues : puzzle.down_clues)
}

function findNextBlankCell(cells, currentCell, letters) {
    return orderedById(cells).find(cell => {
        return cell.id > currentCell.id && cellIsBlank(cell, letters)
    })
}

function firstBlankCell(cells, letters) {
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

function cellIsFilled(cell, letters) {
    return !!letters[cell.id]
}

function cellsHavingClue(clue, cells) {
    return cells.filter(cell => {
        return cellHasClue(clue, cell)
    })
}

function currentCellHasLetter(cell, enteredLetters) {
    return enteredLetters[cell.id]
}

function opposite(direction) {
    return (direction === "across" ? "down" : "across")
}

function findNextCellWithClue(cells, clueId) {
    return cells.find(cell => cell.clues.find(clue => clue.id === clueId))
}

export { shiftBackward,
         currentCellHasLetter,
         shiftForward,
         findNextClue,
         firstClue,
         firstBlankCell,
         clues,
         findNextBlankCell,
         findNextCellWithClue,
         cellClueForCurrentDirection,
         cellIsFilled,
         opposite,
         findWord }