import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { MultiSelect, formats, modules } from './MultiSelect';
import { sendEmail}  from '../services';
import 'react-quill/dist/quill.snow.css';
import '../styles/AdminPage.css';

function AdminPage() {
    const [selected, setSelected] = useState([]);
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileText, setFileText] = useState('');
    const [chooseRecievers, setChooseRecievers] = useState(false)

    const options = [
        { value: "1", label: "vtsakunova@mail.ru" },
        { value: "2", label: "Laura" },
        { value: "3", label: "Tommy" },
        { value: "4", label: "Jane" },
        { value: "5", label: "Mike" }
    ];

    const onUploadFileChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await fileToBase64(file);
        const indexOfBase64 = base64.indexOf('base64');
        const stringBase64 = base64.slice(indexOfBase64+7);
        setFileName(file.name)
        setFileText(stringBase64);
    }

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
      
            fileReader.onload = () => {
              resolve(fileReader.result);
            };
      
            fileReader.onerror = (error) => {
              reject(error);
            };
          });
      }

    const sendMessage = () => {
        if(!selected.length){
            return setChooseRecievers(true)
        }
        let receivers = selected.map(el => el.label)
        let message = {
            receivers: receivers,
            subject: subject,
            content: text,
            attachments: [
                {
                    name: fileName,
                    file: fileText
                }
            ]
        }
        sendEmail(message)
        setSubject('');
        setText('');
        setChooseRecievers(false)
    }

    return (
        <div className="adminContainer">
            <div className="textEditor">
                <div className="subjectBlock">
                    <p className="subjectTitle">Subject:</p>
                    <input className="subjectInput" value={subject} onChange={(e) => setSubject(e.target.value)}></input>
                </div>
                <ReactQuill theme="snow" value={text} onChange={(txt) => setText(txt)} formats={formats} modules={modules} />
                <div className="sendBlock">
                <input type="file" name="file" id="file" className="inputfile" onChange={(e) => onUploadFileChange(e)} multiple />
                <label htmlFor="file">Choose a file</label>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
            <div className="multiSelect">
                <MultiSelect options={options} value={selected} onChange={setSelected} />
                {chooseRecievers ? <div>Plese, choose receivers</div> : null }
            </div>
        </div>
    )
}

export default AdminPage;
