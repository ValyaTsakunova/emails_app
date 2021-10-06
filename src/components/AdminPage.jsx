import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import MultiSelect from './MultiSelect';
import 'react-quill/dist/quill.snow.css';
import '../styles/AdminPage.css'

// let toolbarOptions = [
//     ['bold', 'italic', 'underline', 'strike'], // toggled buttons
//     ['blockquote', 'code-block'],
    
//     [{ 'header': 1 }, { 'header': 2 }], // custom button values
//     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//     [{ 'script': 'sub'}, { 'script': 'super' }], // superscript/subscript
//     [{ 'indent': '-1'}, { 'indent': '+1' }], // outdent/indent
//     [{ 'direction': 'rtl' }], // text direction
    
//     [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
//     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//     [ 'link', 'image', 'video', 'formula' ], // add's image support
//     [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
//     [{ 'font': [] }],
//     [{ 'align': [] }],
    
//     ['clean'] // remove formatting button
//     ];




function AdminPage(){
    const [selected, setSelected] = useState([]);
    const [text, setText] = useState('');

    const options = [
        { value: "1", label: "Jimmy" },
        { value: "2", label: "Laura" },
        { value: "3", label: "Tommy" },
        { value: "4", label: "Jane" },
        { value: "5", label: "Mike" }
    ];
    
    const saveText = (txt) => {
        setText(txt);
        console.log(``)
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

    return(
        <div className="adminContainer">
            <ReactQuill theme="snow" value={text} onChange={(txt) => saveText(txt)}  formats={formats} modules={modules}/>
           <MultiSelect options={options} value={selected} onChange={setSelected} />
           
        </div>
    )
}



export default AdminPage;
