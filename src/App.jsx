import React from 'react';
import EmailsViewer from './components/EmailsViewer/EmailsViewer';
import EmailEditor from './components/EmailEditor';
import Turbo from './components/Turbo';

export const App = () => {
  return (
    <>
      <EmailEditor />
      <EmailsViewer />
      <Turbo />
    </>
  );
};
