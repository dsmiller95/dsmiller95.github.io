/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
/* App imports */
import style from './button.module.less'

import { ManualSolveGrid, PixelDisplay, gridFromString } from 'nonogram-grid';

const NonogramExample = ({ children, goal }) => (
  <ManualSolveGrid goalPixels={gridFromString(`
  XXOX
  OOOO
  XOOO
  XXOO
  `)} transitionModel={[PixelDisplay.Unknown, PixelDisplay.Black, PixelDisplay.White]}>
  </ManualSolveGrid>
)

Button.propTypes = {
  goal: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOf(PropTypes.number))),
  buttonStyle: PropTypes.string,
}

Button.defaultProps = {
  buttonStyle: '',
}

export default Button
