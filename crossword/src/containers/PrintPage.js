import React, {Component} from 'react'
import { Page, Text, View, Image, Document, Font, StyleSheet, PDFViewer } from '@react-pdf/renderer'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { URL } from '../redux/constants'


Font.register({ family: 'Oswald', src: "https://fonts.gstatic.com/s/oswald/v30/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvsUZiYySUhiCXAA.woff" })
Font.register({ family: 'Montserrat', src: "https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2" })
Font.register({ family: 'Raleway', src: "https://fonts.gstatic.com/s/raleway/v14/1Ptsg8zYS_SKggPNwE44TYFqL_KWxQ.woff2" })
Font.register({ family: 'Muli-Regular', src: "https://fonts.gstatic.com/s/muli/v20/7Aulp_0qiz-aVz7u3PJLcUMYOFmQkEk30e6fwniDtzM.woff" })
Font.register({ family: "Muli-Bold", src: "https://fonts.gstatic.com/s/muli/v20/7Aulp_0qiz-aVz7u3PJLcUMYOFkpl0k30e6fwniDtzM.woff"})
Font.register({ family: 'Muli-Extra-Bold', src: "https://fonts.gstatic.com/s/muli/v20/7Aulp_0qiz-aVz7u3PJLcUMYOFlOl0k30e6fwniDtzM.woff"})

const styles = StyleSheet.create({
    port: {width:"50%", height:"600px", marginLeft:"25%"},
    section: { margin: 30},
    row: {display: 'flex', flexDirection: 'row', width: "540px"},
    column: {display: 'flex', flexDirection: 'column'},
    title: { fontFamily: 'Oswald', fontSize: 20},
    author: { fontFamily: 'Muli-Bold', fontSize: 10},
    clueText: {fontFamily: 'Muli-Regular', fontSize: 10},
    clueNumber: {fontFamily: 'Muli-Bold'}
})

class PrintPage extends Component {
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
        if (!this.props.imgSource) {this.setState({redirect: true})}
        this.getPuzzle(this.props.puzzleId)
    }

    render() {
        let {puzzle} = this.state
        if (this.state.redirect) {
            return <Redirect to={`/puzzles/${this.props.puzzleId}/printdata`}/>
        }
        return (
            this.state.puzzle ?
            <PDFViewer style={styles.port}>
                <Document>
                    <Page style={styles.section}>
                        <View style={styles.row}>
                            <View style={[styles.column, {width: "180px"}]}>
                                <Text style={[styles.title, {paddingRight: "10px"}]}>{puzzle.title.toUpperCase()}</Text>
                                <Text style={styles.author}>
                                    {`BY ${puzzle.constructor.first_name.toUpperCase()} ${puzzle.constructor.last_name.toUpperCase()}`}
                                </Text>
                                <Text style={styles.author}>DOWN</Text>
                                {puzzle.across_clues.map(clue => {
                                    return <Text key={clue.id} style={styles.clueText}><Text style={styles.clueNumber}>{clue.number + "  "}</Text>{clue.content}</Text>
                                })}
                                <Text style={styles.author}>ACROSS</Text>
                                {puzzle.down_clues.map(clue => {
                                    return <Text key={clue.id} style={styles.clueText}><Text style={styles.clueNumber}>{clue.number + "  "}</Text>{clue.content}</Text>
                                })}
                            </View>
                            <View style={[styles.column, {width: "360px"}]}>
                                <Image src={this.props.imgSource} />
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer> : null
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
    // puzzle: [...state.userPuzzles, ...state.unsolvedPuzzles, ...state.solvedPuzzles].find(p => p.id === parseInt(ownProps.match.params.puzzleID)),
    // user: state.currentUser,
        puzzleId: ownProps.match.params.puzzleID,
        imgSource: state.printImage
    }
}

export default connect(mapStateToProps)(PrintPage)