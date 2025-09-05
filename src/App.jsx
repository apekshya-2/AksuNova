import Header from './components/Header'
import FileUpload from './components/FileUpload'
import Summary from './components/Summary'
import { useState } from 'react'
import Chat from './components/Chat';




function App() {
  const [ uploadedFile, setUploadFile] = useState(null);

  return (
    <>
    <main className='container'>
      <Header />
      {
        uploadedFile ?
        <>
        <Summary file={uploadedFile} /> 
        <Chat file={uploadedFile} /> 
        </> :
         <FileUpload setFile={setUploadFile} />
      }
   

    </main>

    </>
  )
}

export default App
