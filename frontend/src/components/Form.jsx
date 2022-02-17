import { appendErrors, useForm } from 'react-hook-form';

export default function Form () {

    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    
    // console.log(watch("firstname"));

    return <form onSubmit={handleSubmit((data) => console.log(data))}>
                <div className="form" >
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input {...register("username", { required: "This is required." })} placeholder="Username..." />
                        <p className='errors'>{errors.username?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input {...register("password", { required: "This is required.", minLength: {
                            value: 4,
                            message: "Min length is 4"
                        }})} placeholder="Password..." />
                        <p className='errors'>{errors.password?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input {...register("name", { required: "This is required." })} placeholder="Name..." />
                        <p className='errors'>{errors.name?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input {...register("email", { required: "This is required.", pattern: {
                                value: /@[.]/g,
                                message: 'Please enter a valid email address' // JS only: <p>error message</p> TS only support string
                                } })} placeholder="Email..." />
                        <p className='errors'>{errors.email?.message}</p>
                    </div>

                    <input type="submit" value="Create my account" className='btn-primary' />
                </div>
            </form>
}
