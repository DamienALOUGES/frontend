import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { register } from '../../actions/auth';
import LoginForm from './LoginForm';

class RegisterForm extends Component {
    renderField = ({ input, placeholder, type, meta: { touched, error } }) => {
        return (
            <div className={`field ${touched && error ? 'error' : ''}`}>

                <input {...input} type={type} placeholder={placeholder} />
                {touched && error && (
                    <span className='ui pointing red basic label'>{error}</span>
                )}
            </div>
        );
    };

    renderSelectField(field) {
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error' : ''}`;
        return (
            <div className={className}>
                <label>{field.myLabel}</label>


                <select  {...field.input}  >
                    {field.children}
                </select>

                <div className="error">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }
    onSubmit = formValues => {
        this.props.register(formValues);
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/' />;
        }
        return (
            <div className='ui container'>
                <div className='ui segment'>
                    <form
                        onSubmit={this.props.handleSubmit(this.onSubmit)}
                        className='ui form'
                    >
                        <Field
                            name='first_name'
                            type='text'
                            component={this.renderField}
                            placeholder='Prénom'
                            validate={[required, minLength3]}
                        />
                        <Field
                            name='last_name'
                            type='text'
                            component={this.renderField}
                            placeholder='Nom de Famille'
                            validate={[required, minLength3]}
                        />
                        <Field
                            name='username'
                            type='text'
                            component={this.renderField}
                            placeholder='Pseudo'
                            validate={[required, minLength3, maxLength15]}
                        />
                        <Field
                            name='email'
                            type='email'
                            component={this.renderField}
                            placeholder='E-mail'
                            validate={required}
                        />
                        <Field name="status" label='Statut :' component={this.renderSelectField}>

                            <option value="0" selected>Select Status</option>
                            <option value='11'>Etudiant</option>
                            <option value='12'>Entreprise</option>
                            <option value='13'>Professionnel</option>

                        </Field>

                        <Field
                            name='student_code'
                            type='text'
                            component={this.renderField}
                            placeholder='Code Etudiant'
                            validate={[required, minLength3]}
                        />
                        <Field
                            name='password'
                            type='password'
                            component={this.renderField}
                            placeholder='Nouveau Mot de Passe'
                            validate={required}
                        />
                        <Field
                            name='password2'
                            type='password'
                            component={this.renderField}
                            placeholder='Vérification mot de passe'
                            validate={[required, passwordsMatch]}
                        />
                        <button className='ui primary button'>INSCRIPTION</button>
                    </form>
                    <p style={{ marginTop: '1rem' }}>
                        Vous avez dejà un compte ? <Link to='/login'>Se Connecter</Link>
                    </p>
                </div>
            </div >
        );
    }
}

var StatusOptions = [(11, "Etudiant"), (12, "Professeur"), (13, "Entreprise")];
const required = value => (value ? undefined : 'Required');

const minLength = min => value =>
    value && value.length < min
        ? `Saisissez ${min} lettres minimum`
        : undefined;

const minLength3 = minLength(3);

const maxLength = max => value =>
    value && value.length > max ? `Saisissez ${max} lettres minimum` : undefined;

const maxLength15 = maxLength(15);

const passwordsMatch = (value, allValues) =>
    value !== allValues.password ? 'Les mots de passe sont différents' : undefined;

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

RegisterForm = connect(
    mapStateToProps,
    { register }
)(RegisterForm);

export default reduxForm({
    form: 'registerForm'
})(RegisterForm);