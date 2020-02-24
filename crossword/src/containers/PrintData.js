import React, {Component} from 'react'
import * as html2canvas from 'html2canvas'
import { connect } from 'react-redux'
import Puzzle from './Puzzle'
import { Redirect } from 'react-router-dom'
import { setPrint } from '../redux/actions/changePuzzles'
import { URL } from '../redux/constants'

class PrintData extends Component {
    constructor() {
        super()
        this.state = {redirect: false, puzzle: null}
    }
    
    getPuzzle(id) {
        fetch(`${URL}/puzzles/${id}`)
        .then(res => res.json())
        .then(puzzle => this.setState({puzzle: puzzle}))
    }

    componentDidMount() {
        this.getPuzzle(this.props.puzzleId)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.puzzle && !prevState.puzzle) {
            let puzzle = document.querySelectorAll('svg')[1]
            html2canvas(puzzle).then((canvas) => {
                const imgData = canvas.toDataURL('image/png')
                this.props.setPrint(imgData)
                this.setState({redirect: true})
            })
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={`/puzzles/${this.state.puzzle.id}/print`}/>
        }
        return (
            <div>
                <div style={{height: "800px"}}></div>
                <Puzzle puzzle={this.state.puzzle}/>
            </div>
        )
    }
 
}

const mapStateToProps = (state, ownProps) => {
    return {
        puzzleId: ownProps.match.params.puzzleID
    }
}

export default connect(mapStateToProps, {setPrint})(PrintData)