import { comments } from "../../data/comments";
export async function getStaticPaths() {
  return {
    paths: [
      { params: { commentId: "1" } },
      { params: { commentId: "2" } },
      { params: { commentId: "3" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const { commentId } = params;

  const comment = comments.find(
    (comment) => comment.id === parseInt(commentId)
  );
  return { props: { comment } };
}

export default function Comment({ comment }) {
  return (
    <div>
      {comment.id} {comment.text}
    </div>
  );
}
