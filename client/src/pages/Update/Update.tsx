import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { BottomMenu, MobileHeader } from "../../components/Mobile";
import { IUser, payloadResponse } from "../../interfaces/userinterfaces";
import "./update.css";
import defaultImage from "../../assets/icons8-user-64.png";
import { toast } from "react-toastify";
import { useLocalStorage } from "../../helpers/useLocalStorage";
import axios from "axios";

export interface UpdateUser {
	username: string;
	email: string;
	image: string | Blob;
	password: string;
	phone: string;
	country: string;
	region: string;
	city: string;
}

export const Update = () => {
	const [user, setUser] = useState<IUser>();
	const [userImage, setUserImage] = useState();
	const [initial, setInitial] = useState<UpdateUser>({
		username: "",
		email: "",
		image: "",
		password: "",
		region: "",
		city: "",
		phone: "",
		country: "",
	});
	const [item, setItem] = useLocalStorage("user");
	const [token, setToken] = useLocalStorage("token");
	const [previewImage, setPreviewImage] = useState<
		string | Blob | ArrayBuffer | null
	>("");

	console.log(token);

	const onInputChange = (
		e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setInitial({ ...initial, [name]: value });
		const { files } = e.target;

		if (files) {
			setInitial({ ...initial, image: files[0] });
			const fileName = files[0];
			const reader = new FileReader();

			reader.onloadend = (e) => {
				if (fileName.size / 1024 / 1024 > 1) {
					toast.info("File is greater than 1MB");
					return;
				}

				if (
					fileName.type === "image/png" ||
					fileName.type === "image/jpg" ||
					fileName.type === "image/jpeg"
				) {
					e.target && setPreviewImage(e.target.result);
				} else {
					toast.error(".png, .jpg and .jpeg are the only valid file format");
				}
			};
			reader.readAsDataURL(fileName);
		}
	};

	const onPictureChange = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		if (typeof initial.image !== "object") return;
		console.log(initial.image);
		try {
			const { data } = await axios.patch(
				"http://localhost:2900/api/v1/user/upload-profile-photo",
				{ image: initial.image },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);
			const response = data as unknown as payloadResponse;
			if (response.success) {
				localStorage.removeItem("user911tat");
				localStorage.setItem("user911tat", JSON.stringify(response.user));
				window.location.reload();
			}
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getItems = () => {
			if (item && typeof item === "string") {
				const userData = JSON.parse(item) as unknown as IUser;
				setPreviewImage(userData.profilePhoto);
				setUser(userData);
			}
		};
		getItems();
	}, [item]);

	return (
		<div className='update__userContainer'>
			<MobileHeader />
			<h1>My Profile</h1>
			<p>Profile Picture (avatar)</p>
			<form action='' onSubmit={onPictureChange} className=''>
				<label htmlFor='mobile-image' className='form__updateImageContainer'>
					<img
						src={
							typeof previewImage === "string" && previewImage
								? previewImage
								: defaultImage
						}
						alt=''
					/>
					<input
						id='mobile-image'
						name='image'
						multiple
						type='file'
						hidden
						onChange={onInputChange}
					/>
					<button>Upload New Picture</button>
				</label>
			</form>
			<form action='' className='user_form__container'>
				<div className='form__userContainer'>
					<label htmlFor='username'>Username :</label>
					<input
						type='text'
						id='username'
						value={initial.username}
						onChange={onInputChange}
						name='userrname'
					/>
				</div>
				<div className='form__userContainer'>
					<label htmlFor='phone'>Phone :</label>
					<input
						type='number'
						id='phone'
						value={initial.phone}
						onChange={onInputChange}
						name='phone'
					/>
				</div>
				<div className='form__userContainer'>
					<label htmlFor='country'>Country :</label>
					<input
						type='text'
						name='country'
						value={initial.country}
						onChange={onInputChange}
						id='country'
					/>
				</div>
				<div className='form__userContainer'>
					<label htmlFor='region'>Region :</label>
					<input
						type='text'
						name='region'
						value={initial.region}
						onChange={onInputChange}
						id='region'
					/>
				</div>
				<div className='form__userContainer'>
					<label htmlFor='city'>City :</label>
					<input
						type='text'
						name='city'
						value={initial.city}
						onChange={onInputChange}
						id='city'
					/>
				</div>
				<button>Update</button>
			</form>
			<form action='' className='authForm__container'>
				<div className='change__authContainer'>
					<label htmlFor='email'>Current Email</label>
					<input
						type='email'
						name='email'
						autoComplete='off'
						id='email'
						disabled
						placeholder={user?.email}
					/>
				</div>
				<div className='change__authContainer'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						id='email'
						value={initial.email}
						onChange={onInputChange}
					/>
				</div>
				<button>Update</button>
			</form>
			<form action='' className='authForm__container'>
				<div className='change__authContainer'>
					<label htmlFor='password'>New Password</label>
					<input
						type='password'
						name='password'
						autoComplete='off'
						id='password'
					/>
				</div>
				<div className='change__authContainer'>
					<label htmlFor='new-password'>Retype Password</label>
					<input type='new-password' name='password' id='password' />
				</div>
				<button>Update</button>
			</form>
			<BottomMenu />
		</div>
	);
};
