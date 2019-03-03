// Libs
import React from "react";
import PropTypes from 'prop-types';

/* Material ui components */
import Tooltip from "@material-ui/core/Tooltip";

/* Images */
import rainbowToken from "../../static/svg/CircleTokenRainbow.svg";

const UserToken = ({
    color,
    size,
    boxShadowSize,
    borderSize,
    score,
    radius,
    strokeWidth
}) => {
    const parenthesisString = `(${color.r}, ${color.g}, ${color.b})`;
    const tokenWrapperStyle = {
        position: "relative"
    };
    const tokenStyle = {
        backgroundImage: `url(${rainbowToken})`,
        backgroundColor: `rgb${parenthesisString}`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        marginLeft: `${strokeWidth}px`,
        marginTop: `${strokeWidth}px`,
        zIndex: 30
    };
    const scoreBorderStyle = {
        zIndex: 29,
        position: "absolute",
        top: 0,
        width: `${2 * Number(radius) + Number(strokeWidth)}px`,
        height: `${2 * Number(radius) + Number(strokeWidth)}px`,
        transform: "rotate(-90deg)"
    };
    const strokeDasharray = 2 * radius * Math.PI;
    const strokeDashoffset = (1 - score / 100) * strokeDasharray;
    const bComponent = (1 - score / 100) * 255;
    const gComponent = (score / 100) * 255;
    const circleStyle = {
        zIndex: 29,
        r: radius,
        cx: Number(radius) + Number(strokeWidth) / 2,
        cy: Number(radius) + Number(strokeWidth) / 2,
        strokeDasharray,
        strokeWidth: `${strokeWidth}px`,
        strokeDashoffset,
        stroke: `rgb(0, ${gComponent}, ${bComponent})`
    };
    return (
        <Tooltip
            disableFocusListener
            disableTouchListener
            title={
                <div>
                    <p>
                        RGB
                        {parenthesisString}
                    </p>
                    <p>score: {score}%</p>
                </div>
            }
            placement="right"
        >
            <div id="tokenWrapper" style={tokenWrapperStyle}>
                <div className="token" style={tokenStyle} />
                <svg id="scoreBorder" style={scoreBorderStyle}>
                    <circle id="bar" fill="none" style={circleStyle} />
                </svg>
            </div>
        </Tooltip>
    );
};

UserToken.propTypes = {
  color: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired,
  boxShadowSize: PropTypes.string.isRequired,
  borderSize: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  radius: PropTypes.string.isRequired,
  strokeWidth: PropTypes.string.isRequired,
}

export default UserToken
