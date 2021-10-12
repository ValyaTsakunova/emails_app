const URL = 'http://orendatribedev-env.eba-w9vfhmpi.eu-north-1.elasticbeanstalk.com';

export const login = async(admin) => {
    const resp = await fetch(`${URL}/Users/login`, {
        method: 'POST',
        body: JSON.stringify(admin),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    if(resp.status == "200"){
        const json = await resp.json();
        return json
    }
};

export const getAllEmails = async() => {
    return await fetch(`${URL}/Emails/getAll`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
    })
    .then(res => res.json())
};

export const sendEmail = async(data) => {
    console.log(data);
    return await fetch(`${URL}/Emails/send`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
    })
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
      // handlers: {
        image: {
          width: 100, // default
        // }
     },
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
