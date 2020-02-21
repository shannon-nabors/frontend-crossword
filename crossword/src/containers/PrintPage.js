import React, {Component} from 'react'
import { Page, Text, View, Image, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer'
import { connect } from 'react-redux'
import Puzzle from './Puzzle'

const styles = StyleSheet.create({
    port: {width:"50%", height:"600px", marginLeft:"25%"},
    page: { },
    section: {textAlign: 'center', margin: 30},
    image: {width: "100px"}
})

class PrintPage extends Component {

    render() { 
        return (
            // {this.state.}
            <PDFViewer style={styles.port}>
                <Document>
                    <Page style={styles.page}>
                    <View style={styles.section}>
                        <Text>{this.props.puzzle.title}</Text>
                        <Text>{`by ${this.props.puzzle.constructor.first_name} ${this.props.puzzle.constructor.last_name}`}</Text>
                        <Image src={this.props.imgSource} style={styles.image}/>
                    </View>
                    </Page>
                </Document>
            </PDFViewer>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
    puzzle: [...state.userPuzzles, ...state.unsolvedPuzzles, ...state.solvedPuzzles].find(p => p.id === parseInt(ownProps.match.params.puzzleID)),
    user: state.currentUser,
    imgSource: state.printImage
    }
}

export default connect(mapStateToProps)(PrintPage)