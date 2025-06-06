import React from 'react';

const handleClick = () => {
    console.log('click');
}

const Home = () => {
    return (
        <>
            <div className="home"
                onClick={handleClick}
            >Test</div>
        </>
    )
}

export default Home;