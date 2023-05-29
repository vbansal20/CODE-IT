import React, {useState} from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';

export default function Editor(props) {

  const { language, displayName, value, onChange } = props;
  const [open, setOpen] = useState(true);

  const handleChange = (editor, data, value) => {
    onChange(value);
  }

  const handleButton = () => {
    setOpen(!open);
  }

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}  `}>
      <div className='editor-title'>
        <div className='editor-name-icon'>
          {displayName}
        </div>
        <button onClick={handleButton} className='btn-style'>
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} color='white'/>
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        options={{
          lineNumbers: true,
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
        }}
      />
    </div>
  )
}
