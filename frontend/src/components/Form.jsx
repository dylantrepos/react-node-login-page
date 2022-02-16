import { useState } from 'react';
import FormField from './FormField';

export default function Form () {

    const [form, setForm] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
      }

    return <form action="/" method="post">
                <div className="form">
                    <FormField type={'text'} name={'username'} placeholder={'Your username...'}>Username</FormField>
                    <FormField type={'password'} name={'password'} placeholder={'Your password...'}>Password</FormField>
                    <FormField type={'text'} name={'name'} placeholder={'Your name...'}>Name</FormField>
                    <FormField type={'email'} name={'email'} placeholder={'Your email...'}>Email</FormField>
                    <input type="button" value="Create my account" className='btn-primary' onSubmit={handleSubmit}/>
                </div>
            </form>
}