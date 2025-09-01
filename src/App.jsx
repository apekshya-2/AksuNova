import Header from './components/Header'
import FileUpload from './components/FileUpload'
import Summary from './components/Summary'
import { useState } from 'react'
function App() {
  const [uploadedFile, setUploadFile] = useState(null);

  return (
    <>
    <main className='container'>
      <Header />
      {
        uploadedFile ?
        <Summary /> :
         <FileUpload/>
      }
   

    </main>

    </>
  )
}

export default App
