/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
/* App imports */

import { ManualSolveGrid, PixelDisplay, gridFromString } from 'nonogram-grid';
import 'nonogram-grid/dist/index.css';

const NonogramExample = ({gridString, cellSize}) => {
  const divStyle = cellSize ?
    { width: 'fit-content', height: 'fit-content' } :
    { width: '200px', height: '200px' };
  return (
    <div style={divStyle}>
      <ManualSolveGrid
        cellSize={cellSize}
        goalPixels={gridFromString(gridString)}
        transitionModel={[PixelDisplay.Unknown, PixelDisplay.Black, PixelDisplay.White]}>
      </ManualSolveGrid>
    </div>)
}

NonogramExample.propTypes = {
  gridString: PropTypes.string.isRequired,
  cellSize: PropTypes.number
}

NonogramExample.defaultProps = {
  cellSize: 40
}

export default NonogramExample
