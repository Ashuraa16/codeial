import styles from "../styles/home.module.css";
import getTimeAgo from "../utils/giveTime";
const Comment = ({ cmt }) => {
  return (
    <div className={styles.postCommentsList}>
      <div className={styles.postCommentsItem}>
        <div className={styles.postCommentHeader}>
          <span className={styles.postCommentAuthor}>{cmt.user.name}</span>
          <span className={styles.postCommentTime}>
            {getTimeAgo(cmt.createdAt)}
          </span>
          <span className={styles.postCommentLikes}>
            <div className={styles.postLike} >
              <img style={{width:10,paddingTop: 2}}
                src="https://pixlok.com/wp-content/uploads/2021/10/Heart_Icon_93nfsm_SVG.png"
                alt="likes-icon"
              />
              <span style={{marginLeft: 2}}>{cmt.likes.length}</span>
            </div>
          </span>
        </div>
        <div className={styles.postCommentContent}>{cmt.content}</div>
      </div>
    </div>
  );
};
export default Comment;
