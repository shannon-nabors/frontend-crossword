import {findWord } from './typingHelpers'

function unshadedCells(puzzle) {
    return puzzle.cells.filter( cell => !cell.shaded )
}

function percentShaded(puzzle) {
    let shadedLength = puzzle.cells.length - unshadedCells(puzzle).length
    return (shadedLength / puzzle.cells.length) * 100
}

function allCellsFilled(puzzle) {
    return !unshadedCells(puzzle).find(cell => {
      return !cell.letter
    })
}

function orderedById(cells) {
    return cells.sort((a, b) => a.id - b.id)
}

function firstCell(puzzle) {
    let cells = orderedById(unshadedCells(puzzle))
    return cells[0]
}

function firstAcrossWord(puzzle) {
    return findWord(firstCell(puzzle), puzzle.cells, "across")
}

function generateEnteredLetters(puzzle) {
    let letters = {}
    unshadedCells(puzzle).forEach(cell => {
        letters[cell.id] = cell.letter
    })
    return letters
}

function cellsInWord(highlighted, selected) {
    let cells = highlighted
    if (!cells.find(cell => cell.id === selected.id)){
        cells.push(selected)
    }
    return orderedById(cells)
}

function lettersInWord(letters, highlighted, selected) {
    let cells = cellsInWord(highlighted, selected)
    return cells.map(cell => ({id: cell.id, letter: letters[cell.id]}))
}

export { unshadedCells,
         percentShaded,
         allCellsFilled,
         generateEnteredLetters,
         lettersInWord,
         firstCell,
         firstAcrossWord,
         orderedById }