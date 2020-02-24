import React, {Component} from 'react'
import { Page, Text, View, Image, Document, Font, StyleSheet, PDFViewer } from '@react-pdf/renderer'
import { connect } from 'react-redux'
import Puzzle from './Puzzle'


Font.register({ family: 'Oswald', src: "https://fonts.gstatic.com/s/oswald/v30/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvsUZiYySUhiCXAA.woff" });
// Font.register({ family: 'Montserrat', src: "https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2" });

const styles = StyleSheet.create({
    port: {width:"50%", height:"600px", marginLeft:"25%"},
    section: { margin: 30, display: "flex"},
    title: { fontFamily: 'Oswald', fontSize: 18},
    author: { fontFamily: 'Oswald', fontSize: 12},
    intro: {width: '50%'},
    image: {width: '50%'}
})

class PrintPage extends Component {

    render() { 
        return (
            <PDFViewer style={styles.port}>
                <Document>
                    <Page style={styles.section}>
                    <View style={styles.intro}>
                        <Text style={styles.title}>{this.props.puzzle.title.toUpperCase()}</Text>
                        <Text style={styles.author}>{`by ${this.props.puzzle.constructor.first_name} ${this.props.puzzle.constructor.last_name}`}</Text>
                    </View>
                    <View style={styles.image}>
                        <Image src={this.props.imgSource} />
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