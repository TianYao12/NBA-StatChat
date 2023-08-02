import { useState } from 'react';
import axios from 'axios';

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const fetchComments = async () => {
    try {
      const response = await axios.get('/api/comments');
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitComment = async () => {
    try {
      const response = await axios.post('/api/comments', { comment }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`/api/comments/${commentId}`);
      console.log(response.data);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <input
          type='text'
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button onClick={submitComment}>Submit comment</button>
      </div>
      <hr />
      <button onClick={fetchComments}>Load comments</button>
      {comments.map(comment => {
        return (
          <div key={comment.id}>
            {comment.id} {comment.text}
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
}