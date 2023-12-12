import axios from "axios";

const unitDelete = (unit) => {
    console.log("unitObject", unit);
    axios
        .delete("http://localhost:3001/units", { data: unit })
        .then((response) => {
            console.log("Post response", response.data);
            console.log("Unit deleted");
        });
};

const Unit = (props) => {
    const handleDelete = () => {
        unitDelete(props);
    };

    return (
        <div className="unit">
            <h2>
                {props.code} {props.title}
            </h2>
            <button type="submit" onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
};

export default Unit;
