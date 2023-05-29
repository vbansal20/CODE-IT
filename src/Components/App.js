import React, { useState, useEffect } from 'react';
import Editor from "./Editor";
import useLocalStorage from '../hooks/useLocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [html, setHtml] = useLocalStorage('html', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [js, setJs] = useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html
      `)
    }, 1000)
    return () => clearTimeout(timeOut);
  }, [html, css, js])

  const handleResetButton = () => {
    setHtml('');
    setCss('');
    setJs('');
  }

  return (
    <>
      <div>
        <nav class="navbar navbar-dark bg-dark ">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              <FontAwesomeIcon icon={faCode} color='white' style={{ marginRight: '10px' }} />
              CODE-IT
            </a>
            <form class="d-grid d-flex justify-content-md-end">
              <button class="btn btn-success me-2" type="button" onClick={handleResetButton}>Reset</button>
            </form>
          </div>
        </nav>
      </div>

      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JAVASCRIPT"
          value={js}
          onChange={setJs}
        />
      </div>

      <div className="bottom-pane">
        <iframe
          title="output"
          sandbox="allow-scripts"
          height="100%"
          width="100%"
          srcDoc={srcDoc}
        >
        </iframe>
      </div>
    </>
  )
}

export default App;
