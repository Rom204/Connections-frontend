import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../redux/hooks";
import Post from "../components/common/post/post";
import PostModel from "../models/post_model";
import config from "../utils/config";

const Feed = () => {
	const user_state = useAppSelector((state) => state.user);
	const [followedUsersPosts, setFollowedUsersPosts] = useState<PostModel[]>([]);
	const [loading, setLoading] = useState(true);

	console.log("this is the feed component");

	useEffect(() => {
		if (user_state?.id?.length > 0) {
			try {
				getPosts(user_state.id);
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("no user initialized");
		}
	}, [user_state]);

	const getPosts = async (user_id: string) => {
		await axios
			.post(`${config.liveBackendURL}/user/followed-users-posts`, {
				id: user_id,
			})
			.then((response) => {
				console.log(response);
				setFollowedUsersPosts(response.data);
				setTimeout(() => setLoading(false),1000)
			});
	};
	console.log(followedUsersPosts);

	return (
		<Box sx={{ display: "flex", flexWrap: "wrap",overflowY:"scroll", "&::-webkit-scrollbar": { display: "none"}, justifyContent: "center", textAlign: "center", alignItems: "center", position: "relative", color: "white", height:"100%",width:"100%" }}>
			{followedUsersPosts.map((post) => {
				return (
					<Post
						key={post.id}
						id={post.id}
						createdAt={post.createdAt}
						secure_url={post.secure_url}
						title={post.title}
						body={post.body}
						author={{
							id: post.author.id,
							username: post.author.username,
						}}
						likes={post.likes}
						comments={post.comments}
						loading={loading}
					/>
				);
			})}
		</Box>
	);
};

export default Feed;
