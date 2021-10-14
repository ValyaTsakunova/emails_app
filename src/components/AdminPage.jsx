import React, { useState, useEffect, useContext } from 'react';
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";
import { sendEmail, getAllEmails, formats, modules } from '../services';
import { ListOfSelectedUsers } from './ListOfSelectedUsers';
import { ListOfUsers } from './ListOfUsers';
import Context from '../context/context';
import 'react-quill/dist/quill.snow.css';
import '../styles/AdminPage.css';

function AdminPage() {
    const [inputValue, setInputValue] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [allUsers, setAllUsers] = useState(false);
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileText, setFileText] = useState('');

    const [emptyFields, setEmptyFields] = useState(false);
    const [userAlreadySelected, setUserAlreadySelected] = useState(false);

    const context = useContext(Context);
    const { getUsersList, loading } = context;
    let history = useHistory();

    useEffect(() => {
        const message = localStorage.getItem('msg');
        if (message) {
            return setText(message)
        }
    }, [])

    useEffect(() => {
        (async () => {
            loading(true)
            const res = await getAllEmails();
            if (typeof res == 'boolean' || typeof res == 'string') {
                history.push('/')
            } else if (res) {
                getUsersList(res)
                loading(false)
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

    const sendMessage = async () => {
        if (!selectedUsers.length || !subject || !text) {
            return setEmptyFields(true)
        }
        let message = {
            receivers: {
                isAllSelected: allUsers,
                emails: selectedUsers
            },
            subject: subject,
            content: text,
            attachments: fileName && fileText ? [{
                name: fileName,
                file: fileText
            }] : []
        }
        const res = await sendEmail(message);
        if(res !== 'sended'){
            localStorage.setItem("msg", text);
            history.push('/');
        }else{
            localStorage.removeItem('msg')
            setSubject('');
            setText('');
            setSelectedUsers([]);
            setFileName('');
            setEmptyFields(false);
        }
    }

    const deleteFile = () => {
        setFileName('');
        setFileText('')
    }

    const chooseAll = () => {
        setSelectedUsers(['all users are selected']);
        setAllUsers(true);
    }

    return (
        <>
            <div className="adminContainer">
                <div className="recBlock">
                    <div className="recieversTitle">Recievers:</div>
                    <div className="recievers">
                        <ListOfSelectedUsers selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
                    </div>
                </div>
                <div className="multiSelectBlock">
                    <div className="multiSelect">
                        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="userInput" placeholder="Search..." />
                        {inputValue ?
                            <ListOfUsers inputValue={inputValue}
                                setInputValue={setInputValue}
                                setAllUsers={setAllUsers}
                                selectedUsers={selectedUsers}
                                setSelectedUsers={setSelectedUsers}
                                setUserAlreadySelected={setUserAlreadySelected}
                            />: null}
                    </div>
                    <button className="chooseAllButton" onClick={chooseAll}>Select all</button>
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
            {emptyFields && (!selectedUsers.length || !subject || !text) ? <div className="emptyRecievers">Recievers, subject and message are requared fields</div> : null}
            {userAlreadySelected ? <div className="emptyRecievers">Email is already selected</div> : null}
        </>
    )
}

export default AdminPage;