
function unshadedCells(puzzle) {
    return puzzle.cells.filter( cell => !cell.shaded )
}

function allCellsFilled(puzzle) {
    return !unshadedCells(puzzle).find(cell => {
      return !cell.letter
    })
}

function orderedById(cells) {
    return cells.sort((a, b) => a.id - b.id)
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
         allCellsFilled,
         generateEnteredLetters,
         lettersInWord,
         orderedById }