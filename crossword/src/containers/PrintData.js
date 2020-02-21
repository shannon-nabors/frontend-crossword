import React, {Component} from 'react'
import * as html2canvas from 'html2canvas'
import { connect } from 'react-redux'
import Puzzle from './Puzzle'
import { Redirect } from 'react-router-dom'
import { setPrint } from '../redux/actions/changePuzzles'

class PrintData extends Component {
    constructor() {
        super()
        this.state = {redirect: false}
    }
    componentDidMount() {
        let puzzle = document.querySelectorAll('svg')[1]
        console.log(puzzle)
        html2canvas(puzzle)
        .then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        console.log(imgData)
        this.props.setPrint(imgData)
        this.setState({redirect: true})
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={`/puzzles/${this.props.puzzle.id}/print`}/>
        }
        return (
            <div>
                <div style={{height: "800px"}}></div>
                <Puzzle puzzle={this.props.puzzle}/>
            </div>
        )
    }
 
}

const mapStateToProps = (state, ownProps) => {
    return {
    puzzle: [...state.userPuzzles, ...state.unsolvedPuzzles, ...state.solvedPuzzles].find(p => p.id === parseInt(ownProps.match.params.puzzleID)),
    user: state.currentUser
    }
}

export default connect(mapStateToProps, {setPrint})(PrintData)