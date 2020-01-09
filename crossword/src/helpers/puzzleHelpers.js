
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

export { unshadedCells,
         allCellsFilled,
         generateEnteredLetters,
         orderedById }