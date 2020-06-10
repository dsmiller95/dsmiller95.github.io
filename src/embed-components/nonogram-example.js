/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
/* App imports */

import { ManualSolveGrid, PixelDisplay, gridFromString } from 'nonogram-grid';
import 'nonogram-grid/dist/index.css';

const NonogramExample = ({gridString, targetGrid, initialGrid, cellSize, hideColumnKey, hideRowKey}) => {
  const divStyle = cellSize ?
    { width: 'fit-content', height: 'fit-content' } :
    { width: '200px', height: '200px' };
  return (
    <div style={divStyle}>
      <ManualSolveGrid
        cellSize={cellSize}
        initialPixels={initialGrid && gridFromString(initialGrid)}
        goalPixels={gridFromString(gridString)}
        verificationPixels={targetGrid && gridFromString(targetGrid)}
        transitionModel={[PixelDisplay.Unknown, PixelDisplay.Black, PixelDisplay.White]}
        hideColKeys={hideColumnKey}
        hideRowKeys={hideRowKey}
      >
      </ManualSolveGrid>
    </div>)
}

NonogramExample.propTypes = {
  gridString: PropTypes.string.isRequired,
  initialGrid: PropTypes.string,
  targetGrid: PropTypes.string,
  cellSize: PropTypes.number,
  hideColumnKey: PropTypes.bool,
  hideRowKey: PropTypes.bool,
}

NonogramExample.defaultProps = {
  cellSize: 40
}

export default NonogramExample
