/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    const { children, onClick, primary } = props;
    return (
        <button
            type="button"
            css={{
                borderRadius: '14px',
                padding: '8px 12px',
                border: 'none',
                fontSize: '18px',
                backgroundColor: primary ? '#1900e5' : '#6b7278',
                color: 'white',
                margin: '15px',
                cursor: 'pointer',
            }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            onClick={onClick}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    onClick: PropTypes.func.isRequired,
    // eslint-disable-next-line react/require-default-props
    primary: PropTypes.bool,
};

Button.defaultProps = {
    primary: false,
};

export default Button;
