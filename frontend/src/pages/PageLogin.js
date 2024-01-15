import React, { useEffect, useState } from 'react';
import * as Styled from '../assets/styled';
import Register from '../components/Register';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';



const PageLogin = ({ isAuthenticated, token}) => {
    const [showRegister, setShowRegister] = useState(false);
    

    const navigate = useNavigate();
    useEffect(()=> {
        if (isAuthenticated && token !== null) {
            navigate('/');
        }
    }, [isAuthenticated, navigate, token])

    const handleSwitchAuth = () => {
        setShowRegister(!showRegister);
    };

    return (
        <Styled.PageContainer>
            <Styled.AuthContainer>
                {showRegister ? (
                    <>
                        <Register onClose={setShowRegister} />
                        <Styled.DescriptionSmall style={{margin: '10px 0'}}>Tem uma conta? <Styled.SwitchAuthLink onClick={handleSwitchAuth}>Conecte-se.</Styled.SwitchAuthLink></Styled.DescriptionSmall>
                    </>
                ) : (
                    <>
                        <Login />
                        <Styled.DescriptionSmall style={{margin: '10px 0'}}> Não tem uma conta? <Styled.SwitchAuthLink onClick={handleSwitchAuth}>Cadastre-se</Styled.SwitchAuthLink></Styled.DescriptionSmall>
                    </>
                )}
            </Styled.AuthContainer>
        </Styled.PageContainer>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    token: state.user.token,
});
export default connect(mapStateToProps, null)(PageLogin);
