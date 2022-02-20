import React from 'react';

const Submitbutton = ({children}) => {
    return (
        <>
            <input type="submit" value={children} className='btn-primary' />
        </>
    );
}

export default Submitbutton;
