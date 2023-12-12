import Unit from "./Unit";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const AddUnits = ({ units, setUnits }) => {
    const [newUnitCode, setNewUnitCode] = useState("");
    const [newUnitTitle, setNewUnitTitle] = useState("");
    const handleUnitChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === "code") {
            setNewUnitCode(value);
        } else if (name === "title") {
            setNewUnitTitle(value);
        }
    };
    const addUnit = (event) => {
        event.preventDefault();
        const unitObject = {
            id: units[units.length - 1].id + 1,
            code: newUnitCode,
            title: newUnitTitle,
            offering: "S1",
        };
        console.log("unitObject", unitObject);
        axios
            .post("http://localhost:3001/units", unitObject)
            .then((response) => {
                console.log("Post response" + response.data);
                setUnits(units.concat(unitObject));
                setNewUnitCode("");
                setNewUnitTitle("");
                console.log("New unit added");
                console.log("unitObject", unitObject);
            });
    };
    return (
        <header className="App-header">
            <h1>Add Unit</h1>
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
    );
};

function App() {
    const [units, setUnits] = useState([]);

    const Home = () => {
        return (
            <div>
                <header className="App-header">
                    <h1>COMP3120: Advanced Web Development</h1>
                    <p>Welcome to our Unit App. You have not logged in</p>
                </header>
            </div>
        );
    };

    const Units = () => {
        return (
            <div>
                <header className="App-header">
                    <h1>Units</h1>
                    {units.map((u) => (
                        <Unit
                            key={u.id}
                            id={u.id}
                            code={u.code}
                            title={u.title}
                        />
                    ))}
                </header>
            </div>
        );
    };

    useEffect(() => {
        console.log("effect is being run");
        axios.get("http://localhost:3001/units").then((response) => {
            console.log("we have a response", response);
            setUnits(response.data);
        });
    }, []);

    console.log("Rendering the App component");

    return (
        <div className="App">
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/units">Units</Link>
                        </li>
                        <li>
                            <Link to="/add-units">Add Units</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/units" element={<Units />} />
                    <Route
                        path="/add-units"
                        element={<AddUnits units={units} setUnits={setUnits} />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
