# CrossPost

Platform for constructing & solving crossword puzzles.  Frontend is React-Redux; backend is Rails API.  Styled with Semantic React.

## Current features:
- Create a puzzle.  You can choose from a set of standard grid sizes (5x5 up to 23x23) and toggle between shading/lettering before moving on to cluing.  Progress is auto-saved and you can also save manually.
- Access your created, saved and solved puzzles through your profile page.
- Solve puzzles created by other users.
- Key controls for both solving and creating puzzles are similar to other standard crossword apps (tabbing, backspacing, etc).

## In progress:
- Print out a formatted pdf version of a puzzle (using [react-pdf](https://github.com/diegomura/react-pdf))

## Future:
- Add special features to squares (i.e. circled letters, shading and the like for themed puzzles)
- Add a way to construct cryptics (current algorithm for numbering/cluing puzzle won't permit this)

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
