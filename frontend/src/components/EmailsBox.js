/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import checkPng from '../assets/check.png';
import cancelPng from '../assets/cancel.png';

const RenderStatus = ({ status }) => {
    let content;
    if (status === 'not-an-email') {
        content = (
            <span style={{ color: 'red' }}>
                Not an email{' '}
                <img
                    alt="cancel"
                    src={cancelPng}
                    css={{ width: '15px', height: 'auto', marginLeft: '4px', marginRight: '2px' }}
                />{' '}
            </span>
        );
    } else if (status === 'send_failure') {
        content = (
            <span css={{ color: 'red' }}>
                Could not send email
                <img
                    alt="cancel"
                    src={cancelPng}
                    css={{ width: '15px', height: 'auto', marginLeft: '4px', marginRight: '2px' }}
                />{' '}
            </span>
        );
    } else {
        content = (
            <span css={{ color: 'green' }}>
                Sent successfully
                <img
                    alt="check"
                    src={checkPng}
                    css={{ width: '15px', height: 'auto', marginLeft: '4px', marginRight: '2px' }}
                />
            </span>
        );
    }

    return (
        <span css={{ marginLeft: '8px', display: 'inline-flex', alignItems: 'center' }}>
            {content}
        </span>
    );
};

RenderStatus.propTypes = {
    status: PropTypes.oneOf(['not-an-email', 'send_failure']).isRequired,
};

const EmailItem = (props) => {
    const { email, status } = props;

    return (
        <li>
            {email}
            {status && <RenderStatus status={status} />}
        </li>
    );
};

EmailItem.propTypes = {
    email: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['not-an-email', 'send_failure']).isRequired,
};

const EmailsBox = (props) => {
    const { emails = [], statuses = {} } = props;

    if (emails.length === 0) return null;

    return (
        <div css={{ margin: '16px' }}>
            <h4>Emails to be sent:</h4>
            <ul
                css={{
                    listStyleType: 'none',
                    padding: 0,
                    margin: 0,

                    '& li': {
                        marginBottom: '4px',
                        padding: '4px',
                        borderBottom: '1px solid #cbcbcb',
                    },
                }}
            >
                {emails.map((email) => (
                    <EmailItem key={email} email={email} status={statuses[email]} />
                ))}
            </ul>
        </div>
    );
};

EmailsBox.propTypes = {
    emails: PropTypes.arrayOf(PropTypes.string).isRequired,
    statuses: PropTypes.objectOf(PropTypes.oneOf(['not-an-email', 'send_failure'])).isRequired,
};

export default EmailsBox;
