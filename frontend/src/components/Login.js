import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as Styled from '../assets/styled';
import { loginUser } from '../store/modules/User/actions';


const Login = ({ dispatchLogin }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatchLogin(formData);            
        } catch (error) {
            console.log('error')
        }
    };

    return (
        <Styled.FormContainer>
            <Styled.Title style={{margin: '10px 0'}}>FullStack Social</Styled.Title>
            <Styled.DescriptionSmall style={{margin: '10px 0'}}>Entre e veja o que o seus amigos fullstack estão compartilhando</Styled.DescriptionSmall>
            <Styled.Form onSubmit={handleSubmit}>
                <Styled.InputField
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Styled.InputField
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Styled.SubmitButton type="submit">Login</Styled.SubmitButton>
            </Styled.Form>
        </Styled.FormContainer>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    token: state.user.token,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchLogin: (credenciais) => dispatch(loginUser(credenciais)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
