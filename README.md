# CrossPost

Platform for constructing & solving crossword puzzles.  Frontend is React-Redux; backend is Rails API.  Styled with Semantic React.

## Current features:
- Create a puzzle.  You can choose from a set of standard grid sizes (5x5 up to 23x23) and toggle between shading/lettering before moving on to cluing.  Progress is auto-saved and you can also save manually.
- A built-in search feature (using the Datamuse API) allows you to find words that fit with already-present fill.
- Access your created, saved and solved puzzles through your profile page.
- Solve puzzles created by other users.
- Key controls for both solving and creating puzzles are similar to other standard crossword apps (tabbing, backspacing, etc).
- Print out a formatted pdf version of a puzzle (using [react-pdf](https://github.com/diegomura/react-pdf))

## In progress:
- Flesh out the options for the search feature.

## Future:
- Add ability to check cell/word/puzzle as you solve
- Add a way to save different versions of a puzzle
- Add ability to collaborate on a puzzle with another user

# Installation:

Not yet deployed; if you'd like to use the app, you can get instructions for installing and running the backend [here](https://github.com/shannon-nabors/backend-crossword).  Please follow the instructions to set up the API before proceeding.

## How to install:

```sh
git clone git@github.com:shannon-nabors/frontend-crossword.git
```
In the crossword directory:
```sh
npm i
npm start
```
