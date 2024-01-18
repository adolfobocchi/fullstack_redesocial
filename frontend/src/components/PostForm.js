import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as Styled from '../assets/styled';
import { createPost, deletePost, updatePost } from '../store/modules/Post/actions';


const PostFom = ({ user, post, loading, error, createPost, updatePost, deletePost, onClose }) => {
    const API_URL = process.env.REACT_APP_URL_API;
    const [postData, setPostData] = useState({
        title: '',
        description: '',
        image: null,
        preview: null
    });

    const handleInputChange = (e) => {
        e.stopPropagation()
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    const handleWarningButtonClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        post = null;
        onClose(e);
      };

    const handleFileChange = (e) => {
        e.stopPropagation()
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPostData({
                    ...postData,
                    preview: reader.result,
                    file: file
                });
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        // Preencha o estado local com os dados do usuário ao abrir o modal
        if (post)
            setPostData({
                id: post.id,
                title: post.title,
                description: post.description,
                user_id: post.user_id,
                image: post.imagem,
            });
    }, [post]);

    const handleCreate = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const formData = new FormData();
        if (postData.preview)
            formData.append("image", postData.file);
        formData.append('post', JSON.stringify({ ...postData, user_id: user.id }));
        createPost(formData);
        onClose(e);
    };

    const handleUpdate = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const formData = new FormData();
        if (postData.preview)
            formData.append("image", postData.file);
        formData.append('post', JSON.stringify({ ...postData, user_id: user.id }));
        updatePost(formData);
        onClose(e);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        e.preventDefault();
        deletePost(post);
        onClose(e);
    };

    return (
        <Styled.Modal>
            <Styled.ModalContent>
                <Styled.FormContainer>
                    <Styled.PostHeader>

                        <Styled.Title>{postData.id ? 'Editar Postagem' : 'Nova Postagem'}</Styled.Title>
                        <Styled.CloseButton type="button" onClick={handleWarningButtonClick}>
                            <Styled.CloseIcon />
                        </Styled.CloseButton>
                    </Styled.PostHeader>

                    <Styled.Form encType='multipart/form-data' onSubmit={postData.id ? handleUpdate : handleCreate}>
                        <Styled.InputField
                            type="text"
                            id="title"
                            placeholder='Titulo da postagem'
                            name="title"
                            value={postData.title}
                            onChange={(event) => handleInputChange(event)}
                            required
                            maxLength={100}
                        />
                        <Styled.TextAreaField
                            id="description"
                            name="description"
                            placeholder='Descrição da postagem'
                            value={postData.description}
                            onChange={(event) => handleInputChange(event)}
                            required
                        />
                        {(postData.image || postData.preview) && <Styled.ImagePreview src={postData?.preview ? postData?.preview : `${API_URL}/images/${postData?.image}`} alt='Pré visualização da imagem' />}
                        <Styled.InputFile>
                            <input type="file" id="image" name="image" onChange={(event) => handleFileChange(event)} />
                            <label htmlFor="image">
                                <Styled.ImageIcon />
                            </label>
                        </Styled.InputFile>
                        <Styled.SubmitButton type="submit" disabled={loading}>
                            {loading ? 'Postando...' : 'Postar'}
                        </Styled.SubmitButton>
                    </Styled.Form>
                    {postData.id && <Styled.DangerButton type="button" onClick={handleDelete} >
                        Deletar Postagem
                    </Styled.DangerButton>}

                    {error && <Styled.ErrorMessage>{error}</Styled.ErrorMessage>}
                </Styled.FormContainer>
            </Styled.ModalContent>
        </Styled.Modal>
    );
};
const mapStateToProps = (state) => ({
    user: state.user.user,
    loading: state.post.loading,
    error: state.post.error
});

const mapDispatchToProps = (dispatch) => ({
    createPost: (post) => dispatch(createPost(post)),
    updatePost: (post) => dispatch(updatePost(post)),
    deletePost: (post) => dispatch(deletePost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostFom);
