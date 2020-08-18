import React from "react";
import { useHistory, Link } from 'react-router-dom'

function Landing(props) {
console.log('Landing', props)

const history = useHistory();
return (
    <div>
        <Link id="formLink" to="pizza">
            Pizza
        </Link>
        Landing
    </div>
);
}

export default Landing;