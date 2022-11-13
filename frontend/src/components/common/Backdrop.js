/** @jsxImportSource @emotion/react */
import { keyframes } from '@emotion/react';
import React from 'react';
import PropTypes from 'prop-types';
import loadingPng from '../../assets/loading.png';

const spinner = keyframes`
0%{
    -webkit-transform:rotate(0deg);
    -moz-transform:rotate(0deg);
    -ms-transform:rotate(0deg);
    transform:rotate(0deg);
}
100%{
    -webkit-transform:rotate(360deg);
    -moz-transform:rotate(360deg);
    -ms-transform:rotate(360deg);
    transform:rotate(360deg);
}
`;

const Backdrop = (props) => {
    const { open } = props;

    if (!open) return null;

    return (
        <div
            css={{
                position: 'fixed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                right: 0,
                bottom: 0,
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                zIndex: 1201,
                '@keyframes animation-backrop': {},
            }}
        >
            <span
                css={{
                    display: 'inline-block',
                    width: '60px',
                    height: '60px',
                    animation: `${spinner} 1.4s linear infinite;`,
                }}
            >
                <img alt="loading" src={loadingPng} css={{ width: '60px', height: '60px' }} />
            </span>
        </div>
    );
};

Backdrop.propTypes = {
    open: PropTypes.bool.isRequired,
};

export default Backdrop;
