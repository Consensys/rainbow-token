import React from 'react';

/* Material ui components */
import Tooltip from '@material-ui/core/Tooltip';

/* Images */
import rainbowToken from '../../../static/svg/CircleTokenRainbow.svg';

const Token = ({ color, size, boxShadowSize, borderSize }) => {
  const parenthesisString = `(${color.r}, ${color.g}, ${color.b})`;
  const tokenStyle = {
    backgroundImage: `url(${rainbowToken})`,
    backgroundColor: `rgb${parenthesisString}`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    boxShadow: `${boxShadowSize}px ${boxShadowSize}px rgba(10, 10, 10, 0.9)`,
    border: `${borderSize}px solid rgb(50, 50, 50)`
  }
  return (
    <Tooltip
      disableFocusListener
      disableTouchListener
      title={`RGB${parenthesisString}`}
      placement="right"
    >
        <div
          className='token'
          style={tokenStyle}
        >
        </div>
    </Tooltip>
  )
}

export default Token;
