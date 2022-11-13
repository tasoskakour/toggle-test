import { render } from '@testing-library/react';
import React from 'react';
import EmailsBox from './EmailsBox';

const MOCK_FILES = [
    {
        fileName: 'file1.txt',
        emails: [
            'slagarde@example.fr',
            'ucamacho@example.net',
            'gregoriochacon@example.net',
            'beercarmine@example.org',
        ],
    },
    {
        fileName: 'file2.txt',
        emails: ['heather96@example.org', 'kmorin@example.fr'],
    },
];

const MOCK_STATUSES = {
    'slagarde@example.fr': 'sent',
    'ucamacho@example.net': 'sent',
    'gregoriochacon@example.net': 'send_failure',
    'beercarmine@example.org': 'sent',
    'heather96@example.org': 'send_failure',
    'kmorin@example.fr': 'sent',
};

const textContent = {
    sent: 'Sent successfully',
    send_failure: 'Could not send email ',
    'not-an-email': 'Not an email ',
};

it('shows the files along with parsed emails', () => {
    const { queryByTestId } = render(<EmailsBox files={MOCK_FILES} statuses={MOCK_STATUSES} />);

    expect(queryByTestId('testid-file1.txt').textContent).toEqual('(4) file1.txt:');
    expect(queryByTestId('testid-file2.txt').textContent).toEqual('(2) file2.txt:');

    // eslint-disable-next-line no-restricted-syntax
    for (const email of MOCK_FILES.map(({ emails }) => emails).flat()) {
        expect(queryByTestId(`testid-email-${email}`).textContent).toEqual(email);
        expect(queryByTestId(`testid-email-${email}-status`).textContent).toEqual(
            textContent[MOCK_STATUSES[email]]
        );
    }
});
