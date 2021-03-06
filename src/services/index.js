const URL = 'http://orendatribedev-env.eba-w9vfhmpi.eu-north-1.elasticbeanstalk.com';

export const login = async (admin) => {
    try {
        const resp = await fetch(`${URL}/Users/login`, {
            method: 'POST',
            body: JSON.stringify(admin),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        if (resp.status == "200") {
            const json = await resp.json();
            return json
        }
    } catch (e) {
        throw new Error(e.message)
    }

};

export const getAllEmails = async () => {
    try {
        const resp = await fetch(`${URL}/Emails/getAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        const json = await resp.json();
        if (resp.status == "200") {
            return json.value
        }
        return json.message
    } 
    catch (e) {
        return false
    }

};

export const sendEmail = async (data) => {
    try {
        const resp =  await fetch(`${URL}/Emails/send`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        if (resp.status == "200") {
            return 'sended'
        }
    } catch (e) {
        return false
    }

};

export const formats = [
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

export const modules = {
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
            ["image"],
        ],
    },
};
