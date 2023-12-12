import "./App.css";
import { useState } from "react";

function Unit({ code, title, offering }) {
    const [unitName, setUnitName] = useState(title);

    const clickUpper = () => {
        setUnitName(title.toUpperCase());
    };

    const clickLower = () => {
        setUnitName(title.toLowerCase());
    };

    return (
        <div>
            <p>
                {code}: {unitName}
            </p>
            <div onClick={clickUpper}>
                <p>Upper Case</p>
            </div>
            <div onClick={clickLower}>
                <p>Lower Case</p>
            </div>
        </div>
    );
}

function App() {
    const units = [
        {
            code: "COMP1010",
            title: "Fundamentals of Computer Science",
            offering: ["S1", "S2"],
        },
        {
            code: "COMP1750",
            title: "Introduction to Business Information Systems",
            offering: ["S1"],
        },
        { code: "COMP2110", title: "Web Technology", offering: ["S1", "S2"] },
        {
            code: "COMP2750",
            title: "Applications Modelling and Development",
            offering: ["S1"],
        },
        { code: "MMCC2045", title: "Interactive Web Design", offering: ["S2"] },
        {
            code: "COMP3120",
            title: "Advanced Web Development",
            offering: ["S2"],
        },
        {
            code: "COMP3130",
            title: "Mobile Application Development",
            offering: ["S1"],
        },
    ];
    const courses = [];
    for (let i = 0; i < units.length; i++) {
        courses.push(<Unit code={units[i].code} title={units[i].title}></Unit>);
    }
    return (
        <div className="App">
            <header className="App-header">{courses}</header>
        </div>
    );
}

export default App;
