import React from 'react';
import {Navbar} from "../../components";

const handleClick = () => {
    console.log('click');
}

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="home"
                onClick={handleClick}
            >Test</div>
        </>
    )
}

export {Home};