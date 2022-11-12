import React from 'react';
import { css } from '@emotion/react'

const RenderStatus = ({ status }) => {
    if (status === 'not-an-email') {
        return <span style={{ color: 'red' }}>Not an email</span>
    } else if (status === 'send_failure') {
        return <span style={{ color: 'red' }}>Could not send</span>
    } else {
        return <span style={{ color: 'green' }}>Sent</span>
    }
}

const EmailItem = (props) => {
    const { email, status } = props;

    return <li>
        {email}
        {status && <RenderStatus status={status} />}
    </li>
}

const EmailsBox = (props) => {
    const { emails = [], statuses = {} } = props;
    console.log({ statuses })

    if (emails.length === 0) return null;

    return <div>
        <div className={
            css`color:red`
        }>Emails to be sent:</div>
        <ul>
            {emails.map(email => <EmailItem key={email} email={email} status={statuses[email]} />)}
        </ul>
    </div>
}

export default EmailsBox;