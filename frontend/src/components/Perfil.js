import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as Styled from '../assets/styled';
import { deleteUser, updateUser } from '../store/modules/User/actions';


const Perfil = ({ user, loading, error, updateUser, deleteUser, onClose }) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };



    useEffect(() => {
        // Preencha o estado local com os dados do usuário ao abrir o modal
        setUserData({
            name: user.name,
            email: user.email,
            password: '',
        });
    }, [user]);

    const handleUpdate = (e) => {
        e.preventDefault();
        updateUser({ ...userData, id: user.id });
        onClose();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleteUser({ userId: user.id });
        onClose();
    };

    return (
        <Styled.Modal>
            <Styled.ModalContent>
                <Styled.FormContainer>
                    <Styled.PostHeader>

                        <Styled.Title>{`Meus Dados`}</Styled.Title>
                        <Styled.CloseButton type="button" onClick={onClose}>
                            <Styled.CloseIcon />
                        </Styled.CloseButton>
                    </Styled.PostHeader>
                    <Styled.Form onSubmit={handleUpdate}>
                        <Styled.InputField
                            type="text"
                            id="name"
                            placeholder='Nome'
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                        />
                        <Styled.InputField
                            type="email"
                            id="email"
                            name="email"
                            placeholder='E-mail'
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                        <Styled.InputField
                            type="password"
                            id="password"
                            placeholder='Senha'
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                        />

                        <Styled.SubmitButton type="submit" disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar'}
                        </Styled.SubmitButton>
                    </Styled.Form>
                    <Styled.DangerButton type="button" onClick={handleDelete} >
                        Deletar conta
                    </Styled.DangerButton>
                    {error && <Styled.ErrorMessage>{error}</Styled.ErrorMessage>}
                </Styled.FormContainer>
            </Styled.ModalContent>
        </Styled.Modal>
    );
};
const mapStateToProps = (state) => ({
    user: state.user.user,
    loading: state.user.loading,
    error: state.user.error
});

const mapDispatchToProps = (dispatch) => ({
    updateUser: (user) => dispatch(updateUser(user)),
    deleteUser: (user) => dispatch(deleteUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
