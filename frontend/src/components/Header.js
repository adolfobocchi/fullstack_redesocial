import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as Styled from '../assets/styled';
import { logoutUser } from '../store/modules/User/actions';
import Perfil from './Perfil';
import { useNavigate } from 'react-router-dom';



const HeaderBar = ({postsReport, user, logoutUser, generateReport }) => {
    const navigate = useNavigate()
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = (e) => {
        e.stopPropagation()
        setModalOpen(true);
    };

    const closeModal = (e) => {
        e.stopPropagation();
        setModalOpen(false);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        try {
            logoutUser();
        } catch (error) {
            console.log('error')
        }
    };

    const handleReport = (e) => {
        navigate('/report')
    }
    return (
        <Styled.HeaderContainer>
            {user && (
                <>
                    <Styled.Description style={{color: '#F2F2F2', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', textTransform: 'capitalize'}}  onClick={openModal}><Styled.PerfilIcon />Bem-vindo, {user.name} </Styled.Description>
                    <div>
                    <Styled.ReportIcon onClick={handleReport} />
                    <Styled.LogoutIcon onClick={handleLogout} />
                    </div>
                    </>
                
            )}
            {isModalOpen && <Perfil user={user} onClose={closeModal} />}
        </Styled.HeaderContainer>
    );
};

const mapStateToProps = (state) => ({
    user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);
