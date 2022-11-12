import React, { useState } from 'react';
import styled from '@emotion/styled';
import DragDropFile from './DragDropFile';
import { extractEmailsFromFile, unique } from './utilities';
import EmailsBox from './EmailsBox';
import { API_SEND_URL } from './constants';

const Title = styled.div({
  fontFamily: '"Fira Sans", sans-serif'
})

function App() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState({});
  const [errors, setErrors] = useState(false);

  const handleFiles = async (files) => {
    if (files.length === 0) return;
    const emails = (await Promise.all(
      Array.from(files).map(async (file) => extractEmailsFromFile(file))))
      .flat()
    const uniqueEmails = unique(emails)
    setEmails(uniqueEmails)
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(API_SEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails })
      })
      if (response.ok) {
        alert("Emails sent successfully");
        setStatuses(emails.reduce((acc, email) => ({
          ...acc,
          [email]: 'sent'
        }), {}))
      } else {
        const json = await response.json()
        const { error, emails: errorEmails = [] } = json;
        if (error === 'not-an-email') {
          alert("Wrong input for some of the emails");
          setStatuses(errorEmails.reduce((acc, email) => ({
            ...acc,
            [email]: 'not-an-email'
          }), {}))
        } else if (error === 'send_failure') {
          alert("Some of the emails could not be sent");
          setStatuses(emails.reduce((acc, email) => ({
            ...acc,
            [email]: errorEmails.includes(email) ? 'send_failure' : 'sent'
          }), {}))
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Title>Select files</Title>
      <DragDropFile handleFiles={handleFiles} />
      {emails.length > 0 && <EmailsBox emails={emails} statuses={statuses} />}
      {emails.length > 0 && <button onClick={() => handleSubmit()}>Submit Emails</button>}
    </div>
  )
}

export default App;

/*
TODO:

Add husky
Add tests

Enable eslint
Add email validation

*/
