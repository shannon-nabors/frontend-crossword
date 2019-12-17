
function unshadedCells(puzzle) {
    return puzzle.cells.filter( cell => !cell.shaded )
}

function allCellsFilled(puzzle) {
    return !unshadedCells(puzzle).find(cell => {
      return !cell.letter
    })
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
        generateEnteredLetters }