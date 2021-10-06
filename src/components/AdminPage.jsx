import React, {useState} from 'react';
import MultiSelect from './MultiSelect';

function AdminPage(){
    const [selected, setSelected] = useState([]);
    const options = [
        { value: "1", label: "Jimmy" },
        { value: "2", label: "Laura" },
        { value: "3", label: "Tommy" },
        { value: "4", label: "Jane" },
        { value: "5", label: "Mike" }
    ];
    return(
        <div >
           <MultiSelect options={options} value={selected} onChange={setSelected} />
        </div>
    )
}

export default AdminPage;
