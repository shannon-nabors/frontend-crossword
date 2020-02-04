import React from 'react'
import { Page, Text, View, Image, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer'
import { connect } from 'react-redux'
import { renderToStaticMarkup } from 'react-dom/server'
import Puzzle from './Puzzle'
import Logo from '../components/WelcomeLogo'

const styles = StyleSheet.create({
    port: {width:"50%", height:"600px", marginLeft:"25%"},
    page: { },
    section: {textAlign: 'center', margin: 30}
})

const PrintPage = (props) => {
    return (
        <PDFViewer style={styles.port}>
            <Document>
                <Page style={styles.page}>
                <View style={styles.section}>
                    <Text>{props.puzzle.title}</Text>
                    <Text>{`by ${props.puzzle.constructor.first_name} ${props.puzzle.constructor.last_name}`}</Text>
                    <Image src="PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTc5LjIiIHdpZHRoPSIxNzkuMiI+Cgk8Zz4KCQk8cGF0aCB0cmFuc2Zvcm09InNjYWxlKDAuMSwtMC4xKSB0cmFuc2xhdGUoMCwtMTUzNikiIGQ9Ik0xNTM2IDIyNHY3MDRxMCA0MCAtMjggNjh0LTY4IDI4aC03MDRxLTQwIDAgLTY4IDI4dC0yOCA2OHY2NHEwIDQwIC0yOCA2OHQtNjggMjhoLTMyMHEtNDAgMCAtNjggLTI4dC0yOCAtNjh2LTk2MHEwIC00MCAyOCAtNjh0NjggLTI4aDEyMTZxNDAgMCA2OCAyOHQyOCA2OHpNMTY2NCA5Mjh2LTcwNHEwIC05MiAtNjYgLTE1OHQtMTU4IC02NmgtMTIxNnEtOTIgMCAtMTU4IDY2dC02NiAxNTh2OTYwcTAgOTIgNjYgMTU4dDE1OCA2NmgzMjAgcTkyIDAgMTU4IC02NnQ2NiAtMTU4di0zMmg2NzJxOTIgMCAxNTggLTY2dDY2IC0xNTh6IiBzdHlsZT0iJiMxMDsgICAgZmlsbDogIzAzYTlmNDsmIzEwOyIvPgoJPC9nPgo8L3N2Zz4="/>
                </View>
                </Page>
            </Document>
        </PDFViewer>
   )
}

const mapStateToProps = (state, ownProps) => {
    return {
      puzzle: [...state.userPuzzles, ...state.unsolvedPuzzles, ...state.solvedPuzzles].find(p => p.id === parseInt(ownProps.match.params.puzzleID)),
      imageSource: ownProps.match.params.svgString,
      user: state.currentUser
    }
}

export default connect(mapStateToProps)(PrintPage)