import Unit from "./Unit";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [units, setUnits] = useState([]);

    // const [units, setUnits] = useState([
    //     {
    //         code: "COMP1010",
    //         title: "Fundamentals of Computer Science",
    //         offering: ["S1", "S2"],
    //     },
    //     {
    //         code: "COMP1750",
    //         title: "Introduction to Business Information Systems",
    //         offering: ["S1"],
    //     },
    //     { code: "COMP2110", title: "Web Technology", offering: ["S1", "S2"] },
    //     {
    //         code: "COMP2750",
    //         title: "Applications Modelling and Development",
    //         offering: ["S1"],
    //     },
    //     { code: "MMCC2045", title: "Interactive Web Design", offering: ["S2"] },
    //     {
    //         code: "COMP3120",
    //         title: "Advanced Web Development",
    //         offering: ["S2"],
    //     },
    //     {
    //         code: "COMP3130",
    //         title: "Mobile Application Development",
    //         offering: ["S1"],
    //     },
    // ]);

    const [newUnitCode, setNewUnitCode] = useState("");
    const [newUnitTitle, setNewUnitTitle] = useState("");

    const addUnit = (event) => {
        event.preventDefault();
        const unitObject = {
            id: units.length,
            code: newUnitCode,
            title: newUnitTitle,
            offering: "S1",
        };
        axios
            .post("http://localhost:3001/units", unitObject)
            .then((response) => {
                console.log("Post response" + response.data);
                setUnits(units.concat(unitObject));
                setNewUnitCode("");
                setNewUnitTitle("");
                console.log("New unit added");
            });
    };

    // const addUnit = (event) => {
    //     event.preventDefault();
    //     const unitObject = {
    //         code: newUnitCode,
    //         title: newUnitTitle,
    //         offering: "S1",
    //     };
    //     setUnits(units.concat(unitObject));
    //     setNewUnitCode("");
    //     setNewUnitTitle("");
    // };

    const handleUnitChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === "code") {
            setNewUnitCode(value);
        } else if (name === "title") {
            setNewUnitTitle(value);
        }
    };

    useEffect(() => {
        console.log("effect is being run");
        axios.get("http://localhost:3001/units").then((response) => {
            // const units = response.data;
            console.log("we have a response", response);
            setUnits(response.data);
        });
    }, []);

    console.log("Rendering the App component");

    return (
        <div className="App">
            <header className="App-header">
                <h1>COMP3120: Advanced Web Development</h1>

                <Unit code="COMP3120" title="Advanced Web Development" />

                <h1>Our Units</h1>
                <form onSubmit={addUnit}>
                    <label>Unit Code</label>
                    <input
                        type="text"
                        name="code"
                        value={newUnitCode}
                        onChange={handleUnitChange}
                    ></input>
                    <label>Unit Title</label>
                    <input
                        type="text"
                        name="title"
                        value={newUnitTitle}
                        onChange={handleUnitChange}
                    ></input>
                    <button type="submit">Save</button>
                </form>
            </header>
            {units.map((u) => (
                <Unit key={u.code} code={u.code} title={u.title} />
            ))}
        </div>
    );
}

export default App;
