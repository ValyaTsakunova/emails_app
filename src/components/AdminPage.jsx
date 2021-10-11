import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { MultiSelect, formats, modules } from './MultiSelect';
import { sendEmail, getAllEmails } from '../services';
import 'react-quill/dist/quill.snow.css';
import '../styles/AdminPage.css';

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileText, setFileText] = useState('');
    const [chooseRecievers, setChooseRecievers] = useState(false);

    useEffect(() => { 
        (async () => { 
            const res = await getAllEmails();
            let usersArr = [];
            for(let i = 0; i < res.length; i++) {
                let el = { value: `${i}`, label: `${res[i]}`};
                usersArr.push(el)
            }
            setUsers(usersArr)
        })() 
    }, [])

    const onUploadFileChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await fileToBase64(file);
        const indexOfBase64 = base64.indexOf('base64');
        const stringBase64 = base64.slice(indexOfBase64 + 7);
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
        if (!selected.length) {
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
            <div className="multiSelectBlock">
                <p className="recieversTitle">Recievers:</p>
                <div className="multiSelect"><MultiSelect options={users} value={selected} onChange={setSelected} /></div>
            </div>
            {chooseRecievers && !selected.length ? <div className="emptyRecievers">Plese, choose receivers</div> : null}
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

        </div>
    )
}

export default AdminPage;