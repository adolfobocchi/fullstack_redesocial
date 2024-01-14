import React, { useEffect, useState } from 'react';
import * as Styled from '../assets/styled';
import Header from '../components/Header';
import PostBar from '../components/PostBar';
import { connect } from 'react-redux';
import { recentPosts } from '../store/modules/Post/actions';
import Post from '../components/Post';

const PageHome = ({ posts, recentPosts }) => {

    useEffect(() => {
        recentPosts()
        const intervalId = setInterval(recentPosts, 60000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <>
            <Header />
            <Styled.HomeContainer>
                <PostBar />
                {posts && posts?.length > 0 && posts?.map((post, index) => (
                    <Post key={post.id} post={post} />
                ))}
            </Styled.HomeContainer>
        </>
    )
}
const mapStateToProps = (state) => ({
    posts: state.post.posts,
});

const mapDispatchToProps = (dispatch) => ({
    recentPosts: () => dispatch(recentPosts()),
});
export default connect(mapStateToProps, mapDispatchToProps)(PageHome);