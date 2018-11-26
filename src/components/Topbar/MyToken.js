import React from 'react';

/* Material ui components */
import Tooltip from '@material-ui/core/Tooltip';

/* Images */
import rainbowToken from '../../static/svg/CircleTokenRainbow.svg';

const MyToken = ({ color, size, boxShadowSize, borderSize, score }) => {
  const parenthesisString = `(${color.r}, ${color.g}, ${color.b})`;
  const tokenStyle = {
    backgroundImage: `url(${rainbowToken})`,
    backgroundColor: `rgb${parenthesisString}`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    // boxShadow: `${boxShadowSize}px ${boxShadowSize}px rgba(10, 10, 10, 0.9)`,
    // border: `${borderSize}px solid rgb(50, 50, 50)`,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
  const strokeDashOffset = score * 157.079632679 / 100;
  return (
    <Tooltip
      disableFocusListener
      disableTouchListener
      title={`RGB${parenthesisString}`}
      placement="right"
    >
      <div id='tokenWrapper'>
        <div
          className='token'
          style={tokenStyle}
        >
        </div>
        <svg id="scoreBorder" width="50" height="50" >
          <circle id="bar" fill="transparent" strokeDashoffset={strokeDashOffset} ></circle>
        </svg>
      </div >
    </Tooltip>
  )
}

export default MyToken
