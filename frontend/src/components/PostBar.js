import React, { useState } from 'react';
import * as Styled from '../assets/styled';
import PostForm from './PostForm';


const PostBar = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 60,
            left: 0,
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFF'
        }}>
            <Styled.PostBarButton onClick={openModal}>Fazer uma postagem</Styled.PostBarButton>
            {isModalOpen && <PostForm onClose={closeModal} />}
        </div>

    );
};

export default PostBar;
