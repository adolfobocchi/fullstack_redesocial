import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as Styled from '../assets/styled';
import { createComment, deleteComment, getComments, updateComment } from '../store/modules/Comment/actions';
import { formatDate } from '../utils';

const PostView = ({ post, comments, loading, error, user, createComment, getComments, deleteComment, updateComment, onClose }) => {
  const API_URL = process.env.REACT_APP_URL_API;

  const [commentText, setCommentText] = useState('');
  const [commentSelected, setCommentSelected] = useState(null);

  const handleWarningButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClose(e);
  };

  useEffect(() => {
    getComments(post?.id)
  }, []);

  useEffect(() => {
    setCommentText(commentSelected?.description || '');
  }, [commentSelected]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (commentSelected?.id) {
      commentSelected.description = commentText;
      updateComment(commentSelected)
    } else {
      const newComment = {
        post_id: post.id,
        user_id: user.id,
        description: commentText,
      };
      createComment(newComment);
    }
    setCommentText('');
  };

  const handleDeleteComment = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    deleteComment(id)
  }

  const handleEditComment = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setCommentText('');
    setCommentSelected(comments[index], () => {
      setCommentText(commentSelected?.description || ''); // Use o valor atualizado
    });


  };

  return (
    <Styled.Modal>
      <Styled.ModalContent>
        <Styled.PostHeader>
          <Styled.Title>{post.title}</Styled.Title>
          <Styled.CloseButton type="button" onClick={handleWarningButtonClick}>
            <Styled.CloseIcon />
          </Styled.CloseButton>
        </Styled.PostHeader>
        <Styled.UserInfo>{`Postado por: ${post.name} as ${formatDate(post.created_at)}`}</Styled.UserInfo>
        <Styled.Description>{post.description}</Styled.Description>
        {post.imagem && <div style={{display: 'flex', justifyContent: 'center'}}><Styled.ImagePreview src={`${API_URL}/images/${post.imagem}`} alt='Imagem Postagem' /></div> }
        <Styled.CommentForm onSubmit={handleCommentSubmit}>
          <Styled.CommentInput
            id="commentText"
            name="commentText"
            placeholder="Deixe o seu comentário"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows="1"
          />
          <Styled.SendButton type="submit" >
            <Styled.SendIcon />
          </Styled.SendButton>
        </Styled.CommentForm>

        <Styled.CommentList>
          {comments &&
            comments.map((comment, index) => (
              <Styled.CommentItem key={comment.id}>
                <Styled.PostHeader>
                  <Styled.TitleSmall>{`${comment.name}`}</Styled.TitleSmall>
                  <Styled.PostActions>
                    {(comment.user_id === user.id) && (
                      <Styled.EditButton onClick={(event) => handleEditComment(event, index)}>
                        <Styled.EditIcon />
                      </Styled.EditButton>
                    )}
                    {(comment.user_id === user.id || post.user_id === user.id) && (
                      <>

                        <Styled.DeleteButton onClick={(event) => handleDeleteComment(event, comment.id)}>
                          <Styled.DeleteIcon />
                        </Styled.DeleteButton>
                      </>
                    )}
                  </Styled.PostActions>
                </Styled.PostHeader>
                <Styled.Description>{`${comment.description}`}</Styled.Description>

              </Styled.CommentItem>
            ))}
        </Styled.CommentList>
      </Styled.ModalContent>
    </Styled.Modal>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.comment.loading,
  error: state.comment.error,
  comments: state.comment.comments
});

const mapDispatchToProps = (dispatch) => ({
  createComment: (comment) => dispatch(createComment(comment)),
  updateComment: (comment) => dispatch(updateComment(comment)),
  getComments: (postId) => dispatch(getComments(postId)),
  deleteComment: (commentId) => dispatch(deleteComment(commentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);