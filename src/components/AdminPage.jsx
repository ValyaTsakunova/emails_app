import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { sendEmail, getAllEmails, formats, modules } from '../services';
import 'react-quill/dist/quill.snow.css';
import '../styles/AdminPage.css';

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileText, setFileText] = useState('');
    const [emptyFields, setEmptyFields] = useState(false);

    const [inputValue, setInputValue] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([])

    useEffect(() => {
        (async () => {
            const res = await getAllEmails();
            if(res){
              setUsers(res)  
            }
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
        console.log(selectedUsers)
        if (!selected.length || !subject || !text) {
            return setEmptyFields(true)
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
        // sendEmail(message)
        setSubject('');
        setText('');
        setSelected('');
        setFileName('');
        setEmptyFields(false)
    }

    const deleteFile = () => {
        setFileName('');
        setFileText('')
    }

    const chooseUser = (user) => {
        const arrOfUsers = [...selectedUsers, user];
        setSelectedUsers(arrOfUsers);
    }

    return (
        <>
            <div className="adminContainer">
 <div className="recieversTitle">Recievers:</div>
                <div className="multiSelectBlock">
                   
                   
                    {/* <div>{selectedUsers.map(user => {return (<span key={user}>{user}, </span>)})}</div> */}
                    <div className="multiSelect">
                        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="userInput" />
                        <div className="scrollList">
                          {inputValue && users.length !== 0 ? users.filter(user => user.toLowerCase()
                        .includes(inputValue.toLowerCase()))
                        .map(user => { return (<div key={user} onClick={() => chooseUser(user)}>{user}</div>) }) : null}  
                        </div>
                        
                    </div>
                    <button className="chooseAllButton">Select all</button>
                </div>
                <div className="textEditor">
                    <div className="subjectBlock">
                        <p className="subjectTitle">Subject:</p>
                        <input className="subjectInput" value={subject} onChange={(e) => setSubject(e.target.value)}></input>
                    </div>
                    <ReactQuill theme="snow" value={text} onChange={(txt) => setText(txt)} formats={formats} modules={modules} />
                    <div className="sendBlock">
                        <input type="file" name="file" id="file" className="inputfile" onChange={(e) => onUploadFileChange(e)} multiple />
                        {!fileName ?
                            <label htmlFor="file" className="chooseFile">Choose a file</label> :
                            <div><FontAwesomeIcon icon={faCopy} size="3x" color="rgb(35, 35, 107)" />
                                <p>{fileName}</p>
                                <button className="deleteFile" onClick={deleteFile}>Delete file</button>
                            </div>}
                        <button onClick={sendMessage} className="sendButton">Send</button>
                    </div>
                </div>
            </div>
            {emptyFields && (!selected.length || !subject || !text) ? <div className="emptyRecievers">Recievers, subject and message are requared fields</div> : null}
        </>
    )
}

export default AdminPage;