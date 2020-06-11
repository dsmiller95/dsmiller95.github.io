/* Vendor imports */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
/* App imports */

import NonogramExample from './nonogram-example';
import style from './random-nonogram-example.module.less'

class RandomExample extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      grid: getRandomGrid(this.props.height, this.props.width)
    };
  }

  // TODO: actually reset the grid. currently it does not reset when the grid is reset because the ManualGrid
  //    keeps the grid in its own state. could use a callback.
  render() {
    return (
      <div className={style.exampleContainer}>
        <NonogramExample
          gridString={this.state.grid}
          cellSize={this.props.cellSize}
          hideColumnKey={this.props.hideColumnKey}
          hideRowKey={this.props.hideRowKey}
        >
        </NonogramExample>
        <button onClick={() => {
          this.setState({
            grid: getRandomGrid(this.props.height, this.props.width)
          });
        }}>Generate new nonogram</button>
      </div>)
  }

}

function getRandomGrid(height, width){
  let grid = '';
  for (let rowIndex = 0; rowIndex < height; rowIndex++) {;
    for (let colIndex = 0; colIndex < width; colIndex++) {
      grid += (Math.random() > 0.5 ? 'X' : 'O');
    }
    grid += '\n';
  }
  return grid;
}

RandomExample.propTypes = {
  cellSize: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  hideColumnKey: PropTypes.bool,
  hideRowKey: PropTypes.bool,
}

RandomExample.defaultProps = {
  cellSize: 40
}

export default RandomExample
