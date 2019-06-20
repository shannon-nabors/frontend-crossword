import React, { Component, Fragment } from 'react'
import { Container, Dimmer, Loader,
         Header, Segment, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { toggleInteractionType } from '../redux/actions/createPuzzle.js'
import Next from '../components/FormNextButton'
import Puzzle from './Puzzle'

class ShadePage extends Component {

  handleInteractionChange(interactionType) {
    this.props.toggleInteractionType(interactionType)
  }

  isEditable() {
    return (this.props.interaction === "letter")
  }

  isShadeable() {
    return (this.props.interaction === "shade")
  }

  render() {
    return(
      <Fragment>
        <Container id="shade-header">
          <Header
            as="h2"
            id="enter-header"
            attached="top">
            Step 2: Shade squares and enter letters
          </Header>
          <Segment attached>
            When shading, click any square to toggle the color.  When entering letters, type and backspace as you would normally.  You can tab to the next clue, and click the active square to toggle the direction you're typing.
          </Segment>
        </Container>
        <Container textAlign="center" id="form-toggler">
          <Button.Group color="black">
            <Button
              onClick={() => this.handleInteractionChange("shade")}
            >Shade</Button>
            <Button
              onClick={ () => this.handleInteractionChange("letter")}
            >Letter</Button>
          </Button.Group>
        </Container>
        <Container id="shade-sizer">
          <div>
            <Puzzle
              puzzle={this.props.puzzle}
              editable={this.isEditable()}
              shadeable={this.isShadeable()}
            />
          </div>
          <div>
            <Next/>
          </div>
        </Container>

        <Dimmer active={this.props.loading ? true : false}>
          <Loader size='large'>Creating puzzle</Loader>
        </Dimmer>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    puzzle: state.newPuzzle,
    interaction: state.interactionType,
    loading: state.loading
  }
}

export default connect(mapStateToProps, { toggleInteractionType })(ShadePage)
