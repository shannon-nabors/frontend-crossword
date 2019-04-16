import React, { Component } from "react"
import LineChart from "react-linechart"
import { connect } from 'react-redux'

class TimeChart extends Component {

  returnUserChartObjects() {
    let points = []
    let i = 1
    this.props.solves.forEach(s => {
      points.push({x: i, y: s.time})
      i++
    })
    return points
  }

  returnAverageChartObjects() {
    let points = []
    let i = 1
    this.props.solves.forEach(s => {
      points.push({x: i, y: s.puzzle.average_solve_time})
      i++
    })
    return points
  }

  render() {
    let data = [
            {
                color: "#8B99A4",
                points: this.returnUserChartObjects()
            },
            {
                color: "#FFA414",
                points: this.returnAverageChartObjects()
            }
        ];
        return (
            <div>
                <div className="App">
                    <LineChart
                        width={600}
                        height={400}
                        data={data}
                        hideXLabel={true}
                        hideYLabel={true}
                        pointRadius={3}
                    />
                </div>
            </div>
        )
  }
}

const mapStateToProps = (state) => {
  return {
    solves: state.solves
  }
}

export default connect(mapStateToProps)(TimeChart)
