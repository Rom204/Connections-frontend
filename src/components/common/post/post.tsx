import PostView from "./postView";
import PostModel from "../../../models/post_model";
import axios from "axios";
import { useAppSelector } from "../../../redux/hooks";
import { useState } from "react";
import FullPostView from "./FullPostView";
import config from "../../../utils/config";

interface PostProps extends PostModel {
	loading?: boolean;
}

const Post = (props: PostProps) => {
	const user = useAppSelector((state) => state.user);
	const [likes, setLikes] = useState([]);
	const [comments, setComments] = useState([]);

	const [uploadingComment, setUploadingComment] = useState(false);
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const openFullPostView = () => {
		setOpen(true);
	};
	const handleLikeAction = async () => {
		try {
			await axios
				.put(`${config.liveBackendURL}/post/api/handle-like`, {
					postID: props.id,
					likeAuthor: user.id,
				})
				.then((response) => {
					setLikes(response.data);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const handleCommentAction = async (comment: string) => {
		setUploadingComment(true);
		try {
			await axios
				.post(`${config.liveBackendURL}/post/create-comment`, {
					postID: props.id,
					commentAuthor: user.id,
					comment: comment,
				})
				.then((response) => {
					setComments(response.data);
					setUploadingComment(false);
				});
		} catch (error) {
			console.log(error);
		}
	};
	if (open) {
		return (
			<FullPostView
				isOpen={open}
				handleClose={handleClose}
				likeAction={handleLikeAction}
				commentAction={handleCommentAction}
				id={props.id}
				createdAt={props.createdAt}
				secure_url={props.secure_url}
				title={props.title}
				body={props.body}
				author={{
					id: props.author.id,
					username: props.author.username,
				}}
				likes={[]}
				comments={comments && comments.length > 0 ? comments : props.comments}
			/>
		);
	}
	return (
		<PostView
			loading={props.loading}
			likeAction={handleLikeAction}
			commentAction={handleCommentAction}
			id={props.id}
			createdAt={props.createdAt}
			secure_url={props.secure_url}
			title={props.title}
			body={props.body}
			author={{
				id: props.author.id,
				username: props.author.username,
			}}
			likes={likes && likes.length > 0 ? likes : props.likes}
			comments={comments && comments.length > 0 ? comments : props.comments}
			uploadingComment={uploadingComment}
			loggedUserID={user.id}
			openFullPostView={openFullPostView}
		/>
	);
};
export default Post;
