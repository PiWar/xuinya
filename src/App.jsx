import React from 'react'
import { EmailsViewer } from './components/EmailsViewer/EmailsViewer'
import TextEditor from './components/TextEditor'

export const App = () => {
  return (<>
    <TextEditor/>
    <EmailsViewer/>
  </>)
}