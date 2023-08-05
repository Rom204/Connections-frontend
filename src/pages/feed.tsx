import { Backdrop, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../redux/hooks";
import Post from "../components/common/post/post";
import PostModel from "../models/post_model";
import config from "../utils/config";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";

const Feed = () => {
	const user_state = useAppSelector((state) => state.user);
	const [followedUsersPosts, setFollowedUsersPosts] = useState<PostModel[]>([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigate();


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
		console.log("fetching posts ...");
		await axios
			.post(`${config.liveBackendURL}/user/followed-users-posts`, {
				id: user_id,
			})
			.then((response) => {
				console.log(response);
				setFollowedUsersPosts(response.data);
				setTimeout(() => setLoading(false), 1000);
			});
	};
	console.log(followedUsersPosts);

	if (loading) {
		return (
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}>
				<h1>Fetching posts</h1>
				<MagnifyingGlass
					visible={true}
					height="80"
					width="80"
					ariaLabel="MagnifyingGlass-loading"
					wrapperStyle={{}}
					wrapperClass="MagnifyingGlass-wrapper"
					glassColor="#c0efff"
					color="#e15b64"
				/>
			</Backdrop>
		);
	}

	if (followedUsersPosts.length === 0) {
		return (
			<Box>
				<h1>No posts available</h1>
				<h3>
					try and follow someone :)
					<br />
					<span>
						<Button
							variant="contained"
							onClick={() => navigation("/explore")}>
							explore
						</Button>
					</span>
				</h3>
			</Box>
		);
	}

	return (
		<Box sx={{ display: "flex", flexWrap: "wrap", overflowY: "scroll", "&::-webkit-scrollbar": { display: "none" }, justifyContent: "center", textAlign: "center", alignItems: "center", position: "relative", color: "white", height: "100%", width: "100%" }}>
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
