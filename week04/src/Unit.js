// 2. Add a new Component called Unit to display a unit

import { useState } from "react";

const Unit = (props) => {
    return (
        <div className="unit">
            <h2>
                {props.code} {props.title}
            </h2>
        </div>
    );
};

export default Unit;
