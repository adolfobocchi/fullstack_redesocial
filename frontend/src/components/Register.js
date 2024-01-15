import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Styled from '../assets/styled';
import { registerUser } from '../store/modules/User/actions';



const Register = ({ onClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    e.stopPropagation()
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.stopPropagation()
    e.preventDefault();
    dispatch(registerUser(userData));
    onClose(false)
  };

  return (
    <Styled.FormContainer>
      <Styled.Title style={{ margin: '10px 0' }}>FullStack Social</Styled.Title>
      <Styled.DescriptionSmall style={{ margin: '10px 0' }}>Cadastre-se para ver o que seus amigos fullstack estão compartilhando</Styled.DescriptionSmall>
      <Styled.Form onSubmit={handleRegister}>
        <Styled.InputField
          type="text"
          id="name"
          placeholder='Nome'
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          required
          maxLength={100}
        />
        <Styled.InputField
          type="email"
          id="email"
          name="email"
          placeholder='E-mail'
          value={userData.email}
          onChange={handleInputChange}
          required
          maxLength={191}
        />
        <Styled.InputField
          type="password"
          id="password"
          placeholder='Senha'
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          required
          minLength={8}
        />

        <Styled.DescriptionSmall style={{ marginBottom: '10px' }}>
          Ao se cadastrar, você concorda com nossos Termos, Política de Privacidade e Política de Cookies.
        </Styled.DescriptionSmall>

        <Styled.SubmitButton type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastre-se'}
        </Styled.SubmitButton>
      </Styled.Form>

      {error && <Styled.ErrorMessage>{error}</Styled.ErrorMessage>}
    </Styled.FormContainer>
  );
};

export default Register;
