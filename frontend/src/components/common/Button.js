/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    const { children, ...rest } = props;

    return (
        <button
            type="button"
            css={{
                borderRadius: '14px',
                padding: '8px 12px',
                border: 'none',
                fontSize: '18px',
                backgroundColor: '#6b7278',
                color: 'white',
                margin: '15px',
                cursor: 'pointer',
            }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            {children}
        </button>
    );
};

Button.propTypes = PropTypes.any;

export default Button;
