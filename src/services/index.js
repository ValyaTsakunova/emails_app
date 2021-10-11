export const login = async(admin) => {
    return await fetch(`http://orendatribedev-env.eba-w9vfhmpi.eu-north-1.elasticbeanstalk.com/Users/login`, {
        method: 'POST',
        body: JSON.stringify(admin),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
};

export const getAllEmails = async() => {
    return await fetch(`http://orendatribedev-env.eba-w9vfhmpi.eu-north-1.elasticbeanstalk.com/Emails/getAll`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
    })
    .then(res => res.json())
    // .then(res => {
    //     for(let i = 0; i < res.length; i++) {
    //         let el = { value: `${i.index}`, label: `${i}`};
    //         console.log(el)
    //     }
    // });
};

export const sendEmail = async(data) => {
    console.log(data);
    return await fetch(`http://orendatribedev-env.eba-w9vfhmpi.eu-north-1.elasticbeanstalk.com/Emails/send`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
    })
    // .then(res => res.json());
};


