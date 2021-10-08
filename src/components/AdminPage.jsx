import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import MultiSelect from './MultiSelect';
import 'react-quill/dist/quill.snow.css';
import '../styles/AdminPage.css';
import {sendEmail} from '../services'

function AdminPage() {
    const [selected, setSelected] = useState([]);
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileText, setFileText] = useState('');

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
        setFileName(file.name)
        setFileText(base64);
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
        let message = {
            receivers: [selected[0].label],
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
        console.log(fileText)
    }
    
    const formats = [
        "width",
        "height",
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "align",
        "alt",
        "style",
    ];

    const modules = {
        toolbar: {
            container: [
                [
                    { header: "1" },
                    { header: "2" },
                    { header: [3, 4, 5, 6] },
                    { font: [] },
                ],
                ["bold", "italic", "underline"],
                [
                    { align: "" },
                    { align: "center" },
                    { align: "right" },
                    { align: "justify" },
                ],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
                ["code-block"],
            ],
        },
    };

    return (
        <div className="adminContainer">
            <div className="textEditor">
                <div className="subjectBlock">
                    <p className="subjectTitle">Subject:</p>
                    <input className="subjectInput" value={subject} onChange={(e) => setSubject(e.target.value)}></input>
                </div>
                <ReactQuill theme="snow" value={text} onChange={(txt) => setText(txt)} formats={formats} modules={modules} />
                <div className="sendBlock">
                {/* <input type="file" name="file" id="file" className="inputfile" onChange={e => handleFileChosen(e.target.files[0])} multiple /> */}
                <input type="file" name="file" id="file" className="inputfile" onChange={(e) => onUploadFileChange(e)} multiple />
                <label htmlFor="file">Choose a file</label>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
            <div className="multiSelect">
                <MultiSelect options={options} value={selected} onChange={setSelected} />
            </div>
        </div>
    )
}

export default AdminPage;
