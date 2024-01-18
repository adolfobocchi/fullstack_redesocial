import React, { useState } from 'react';
import * as Styled from '../assets/styled';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import { likePost, unlikePost, viewPost } from '../store/modules/Post/actions';
import { formatDate } from '../utils';
import PostView from './PostView';
import HistoryView from './HistoryView';

const Post = ({ user, post, likePost, unlikePost, viewPost }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalViewOpen, setModalViewOpen] = useState(false);
    const [isModalHistoryOpen, setModalHistoryOpen] = useState(false);

    const openModal = (e) => {
        e.stopPropagation();
        setModalOpen(true);
    };

    const closeModal = (e) => {
        e.stopPropagation();
        post = null;
        setModalOpen(false);
    };

    const openModalView = (e) => {
        e.stopPropagation();
        post = null;
        setModalViewOpen(true);
    };

    const closeModalView = (e) => {
        e.stopPropagation();
        setModalViewOpen(false);
    };

    const openModalHistory = (e) => {
        
        setModalHistoryOpen(true);
    };

    const closeModalHistory = (e) => {
        e.stopPropagation();
        post = null;
        setModalHistoryOpen(false);
    };

    const handleLike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        likePost(post?.id);
    };

    const handleUnlike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        unlikePost(post?.id);
    };

    const handleView = (e) => {
        e.preventDefault();
        e.stopPropagation();
        viewPost(post?.id);
        openModalView(e)
    };

    return (<>
        <Styled.PostContainer onClick={handleView}>
            <Styled.PostHeader>
                <Styled.Title>{post?.title}</Styled.Title>
                <Styled.PostActions>
                    {post?.user_id === user.id && <Styled.PostAction onClick={(e) => openModal(e)} >
                        <Styled.EditIcon />
                    </Styled.PostAction>}
                    {post?.user_id === user.id && <Styled.PostAction onClick={(e) => openModalHistory(e)} >
                        <Styled.HistoryIcon />
                    </Styled.PostAction>}
                </Styled.PostActions>
            </Styled.PostHeader>
            <Styled.UserInfo>{`Postado por: ${post?.name} em ${formatDate(post?.created_at)}`}</Styled.UserInfo>
            
            <Styled.PostStats>
                <Styled.StatItem onClick={handleLike}>
                    <Styled.LikeIcon />
                    <Styled.DescriptionSmall>{post?.likes}</Styled.DescriptionSmall>
                </Styled.StatItem>
                <Styled.StatItem onClick={handleUnlike}>
                    <Styled.UnlikeIcon />
                    <Styled.DescriptionSmall>{post?.unlikes}</Styled.DescriptionSmall>
                </Styled.StatItem>
                <Styled.StatItem>
                    <Styled.ViewIcon />
                    <Styled.DescriptionSmall>{post?.views}</Styled.DescriptionSmall>
                </Styled.StatItem>
            </Styled.PostStats>

        </Styled.PostContainer>
        
        {isModalOpen && <PostForm onClose={closeModal} post={post} />}
        {isModalViewOpen && <PostView onClose={closeModalView} post={post} />}
        {isModalHistoryOpen && <HistoryView onClose={closeModalHistory} post={post} />}
        </>
    );
};

const mapStateToProps = (state) => ({
    user: state.user.user,
    posts: state.post.posts
});

const mapDispatchToProps = (dispatch) => ({
    likePost: (postId) => dispatch(likePost(postId)),
    unlikePost: (postId) => dispatch(unlikePost(postId)),
    viewPost: (postId) => dispatch(viewPost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
