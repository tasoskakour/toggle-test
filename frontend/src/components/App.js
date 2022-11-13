/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Global } from '@emotion/react';
import DragDropFile from './DragDropFile';
import { extractEmailsFromFile, unique } from '../utilities';
import EmailsBox from './EmailsBox';
import { API_SEND_URL } from '../constants';
import Button from './common/Button';
import Backdrop from './common/Backdrop';

const App = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statuses, setStatuses] = useState({});

    const handleFiles = async (readFiles) => {
        if (readFiles.length === 0) return;
        const fileEmails = await Promise.all(
            Array.from(readFiles).map(async (file) => {
                const emails = await extractEmailsFromFile(file);
                return { fileName: file.name, emails };
            })
        );
        setFiles(fileEmails);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_SEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emails: unique(files.map(({ emails }) => emails).flat()) }),
            });
            if (response.ok) {
                setStatuses(
                    files
                        .map(({ emails }) => emails)
                        .flat()
                        .reduce(
                            (acc, email) => ({
                                ...acc,
                                [email]: 'sent',
                            }),
                            {}
                        )
                );
            } else {
                const json = await response.json();
                const { error, emails: errorEmails = [] } = json;
                if (error === 'not-an-email') {
                    setStatuses(
                        errorEmails.reduce(
                            (acc, email) => ({
                                ...acc,
                                [email]: 'not-an-email',
                            }),
                            {}
                        )
                    );
                } else if (error === 'send_failure') {
                    setStatuses(
                        files
                            .map(({ emails }) => emails)
                            .flat()
                            .reduce(
                                (acc, email) => ({
                                    ...acc,
                                    [email]: errorEmails.includes(email) ? 'send_failure' : 'sent',
                                }),
                                {}
                            )
                    );
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Global
                styles={{
                    '*': {
                        fontFamily: '"Fira Sans", sans-serif',
                    },
                }}
            />
            <div
                css={{
                    padding: '16px',
                    border: '1px solid #424242',
                    borderRadius: 4,
                    maxWidth: ['600px'],
                    margin: 'auto',
                }}
            >
                <Backdrop open={loading} />
                <h2
                    css={{
                        textAlign: 'center',
                        padding: 0,
                        margin: 0,
                        letterSpacing: 2,
                        color: '#6a6a6a',
                    }}
                >
                    SEND EMAILS APP
                </h2>
                <DragDropFile handleFiles={handleFiles} />
                {files.length > 0 && (
                    <>
                        <EmailsBox files={files} statuses={statuses} />
                        <div css={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                onClick={() => handleSubmit()}
                                css={{ backgroundColor: '#1900e5' }}
                            >
                                Send Emails
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default App;
