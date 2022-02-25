/**
 * Crate a custom styled button for form
 */
const Submitbutton = ({children}) => {
    return (
        <>
            <input type="submit" value={children} className='btn-primary' />
        </>
    );
}

export default Submitbutton;
