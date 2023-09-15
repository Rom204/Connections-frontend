import { Box, Grid, Paper, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserModel from "../models/user_model";
import User_interaction from "../components/common/user_Interaction/user_interaction";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import config from "../utils/config";

const Profile = () => {
	let location = useLocation();
	console.log("this is the profile component");

	const user_state = useAppSelector((state) => state.user);

	const [userProfile, setUserProfile] = useState<UserModel>();
	useEffect(() => {
		if (!userProfile) {
			try {
				getUser();
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	const getUser = async () => {
		try {
			const response = await axios.get(`${config.liveBackendURL}/user/${location.state}`);
			let data = response.data;
			setUserProfile(data);
		} catch (error) {
			console.log(error);
		}
	};
	
	return (
		<Box sx={{ display: "flex", flexWrap: "wrap", overflowY: "scroll", justifyContent: "center", textAlign: "center", alignItems: "center", position: "relative", height: "100%" }}>
			<User_interaction
				key={userProfile?.id}
				interactedUser={userProfile}
				user_id={user_state.id}
			/>
			<Box sx={{ height: "100%", width: "100%" }}>
				<Grid
					container
					rowSpacing={1}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
					{userProfile?.posts?.map((post) => {
						return (
							<Grid
								key={post.id}
								item
								xs={6}>
								<NavLink to={""}>
									<Box sx={{ height: "10rem", backgroundImage: `url(${post.secure_url})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />
								</NavLink>
							</Grid>
						);
					})}
				</Grid>
			</Box>
		</Box>
	);
};

export default Profile;
