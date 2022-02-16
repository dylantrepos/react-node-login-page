export default function FormField ({type, name, placeholder, children}) {

    return <div className="form-group">
                <label htmlFor={name}>{children}</label>
                <input type={type} name={name} id={name} placeholder={placeholder} required/>
            </div>
}