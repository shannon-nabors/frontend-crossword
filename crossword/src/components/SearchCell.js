import React from 'react'

class SearchCell extends React.Component {
    handleClick() {
        debugger
    }

    render() {
        let {index, cell, select, selected} = this.props
        return(
            <g key={cell.id} onClick={() => select(cell.id)}>
                <rect 
                    x={12 * index + 1}
                    y="1" rx="2" ry="2"
                    width="10" height="10"
                    fill={cell.letter ? "#FFC368" : "none"}
                    stroke={selected ? "#FFA414" : "#1b1c1d"}
                    strokeWidth={selected ? "0.30" : "0.25"}/>
                {cell.letter ?
                <text
                    x={12 * index + 3} y="9"
                    textAnchor="start" fontSize="9"
                    fill="#1b1c1d">
                    {cell.letter}
                </text> : null}
            </g>
        )
    }
}

export default SearchCell