import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Styled from '../assets/styled';
import { getHistorys } from '../store/modules/Post/actions';

const PostView = ({ post, historys, loading, error, user, getHistory, onClose }) => {

  const handleWarningButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClose(e);
  };

  useEffect(() => {
    getHistory(post?.id)
  }, []);


  return (
    <Styled.Modal>
      <Styled.ModalContent>
        <Styled.PostHeader>
          <Styled.Title>Historico</Styled.Title>
          <Styled.CloseButton type="button" onClick={handleWarningButtonClick}>
            <Styled.CloseIcon />
          </Styled.CloseButton>
        </Styled.PostHeader>
        <Styled.CommentList>
          {historys &&
            historys.map((history, index) => (
              <Styled.CommentItem key={history.id}>
                <Styled.Description>{`${history.title}`}</Styled.Description>
                <Styled.Description>{`${history.description}`}</Styled.Description>
              </Styled.CommentItem>
            ))}
        </Styled.CommentList>
      </Styled.ModalContent>
    </Styled.Modal>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.post.loading,
  error: state.post.error,
  historys: state.post.historys
});

const mapDispatchToProps = (dispatch) => ({
  getHistory: (postId) => dispatch(getHistorys(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);