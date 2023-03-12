import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { privateFormDataRequest, privateRequest } from "../../api/client";
import { payloadResponse } from "../../interfaces/userinterfaces";
import { useLocalStorage } from "../../helpers/useLocalStorage";
import { userItems } from "../../interfaces/user";

export interface userDetailItems {
	city: string;
	state: string;
	country: string;
	build: string;
	height: string;
	bustsize: string;
	orientation: string;
	anal: string;
	oral: string;
	condom: string;
	smoke: string;
	ethnicity: string;
	age: string;
	shorttime: string;
	overnight: string;
	gender: string;
	image: string | Blob;
}

export const Pending = () => {
	const [userInfo, setUserInfo] = useLocalStorage("user");
	const [initial, setInitial] = useState<userDetailItems>({
		city: "",
		state: "",
		country: "",
		build: "",
		height: "",
		bustsize: "",
		orientation: "",
		anal: "",
		oral: "",
		condom: "",
		smoke: "",
		ethnicity: "",
		age: "",
		shorttime: "",
		overnight: "",
		image: "",
		gender: "",
	});
	const [previewImage, setPreviewImage] = useState<
		string | Blob | ArrayBuffer | null | undefined
	>(null);

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

	const haneleImageUpdate = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		try {
			const { data } = await privateFormDataRequest.patch(
				"/user/upload-profile-photo",
				{ image: initial.image }
			);
			console.log(data);
			const response = data as payloadResponse;
			if (response.success) {
				localStorage.removeItem("user");
				localStorage.setItem("user", JSON.stringify(response.user));
				window.location.reload();
				toast("upload success");
			} else {
				toast("An Error Occured on upload");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleProfileUpdateChange = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		console.log(initial);
		try {
			const { data } = await privateRequest.patch(
				"/user/update-escort-profile",
				{
					city: initial.city,
					state: initial.state,
					country: initial.country,
					build: initial.build,
					height: initial.height,
					bustsize: initial.bustsize,
					orientation: initial.orientation,
					anal: initial.anal,
					oral: initial.oral,
					condom: initial.condom,
					smoke: initial.smoke,
					ethnicity: initial.ethnicity,
					age: initial.age,
					shorttime: initial.shorttime,
					overnight: initial.overnight,
				}
			);
			console.log(data);
			const response = data as payloadResponse;
			if (response.success) {
				localStorage.removeItem("user");
				localStorage.setItem("user", JSON.stringify(response.user));
				window.location.reload();
				toast("upload success");
			} else {
				toast("An Error Occured on upload");
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (userInfo && typeof userInfo === "string") {
			const items = JSON.parse(userInfo) as userItems;
			setPreviewImage(items.profilePhoto);
			setInitial({
				city: items.description?.city || "",
				state: items.description?.state || "",
				country: items.description?.country || "",
				build: items.description?.build || "",
				height: items.description?.height || "",
				bustsize: items.description?.BustSize || "",
				orientation: items.description?.orientation || "",
				anal: items.description?.anal || "",
				oral: items.description?.oralSex || "",
				condom: items.description?.condom || "",
				smoke: items.description?.smoke || "",
				ethnicity: items.description?.ethnicity || "",
				age: items.description?.age || "",
				shorttime: items.description?.shortTimeRate || "",
				overnight: items.description?.overNightRate || "",
				image: items.description?.BustSize || "",
				gender: items.description.gender || "",
			});
		}
	}, [userInfo]);
	return (
		<div className='py-10'>
			<div>
				<form action='' onSubmit={haneleImageUpdate}>
					<h2 className='my-4'>Update Profile Image </h2>
					<label htmlFor='image' className='flex flex-col justify-center px-4'>
						<img
							src={
								typeof previewImage === "string"
									? previewImage
									: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
							}
							alt=''
							className='w-20 h-20 rounded-full'
						/>
						<input
							type='file'
							onChange={onInputChange}
							className='hidden'
							name='image'
							id='image'
						/>
					</label>
					<button
						type='submit'
						className='my-4 rounded-lg py-2 px-8 text-md text-center bg-[#4c8bf5] text-white'
					>
						Submit
					</button>
				</form>
			</div>
			<div className='update__itemsContainer'>
				<form action='' onSubmit={handleProfileUpdateChange}>
					<div className='__update__itemContsiner grid lg:grid-cols-2 gap-10'>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='city'>
								City
							</label>
							<input
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								type='text'
								name='city'
								id='city'
								placeholder='city'
								value={initial.city}
								onChange={onInputChange}
							/>
						</div>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='country'>
								Country
							</label>
							<input
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								type='text'
								name='country'
								id='country'
								placeholder='Country'
								value={initial.country}
								onChange={onInputChange}
							/>
						</div>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='state'>
								State
							</label>
							<input
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								type='text'
								name='state'
								id='state'
								placeholder='state'
								value={initial.state}
								onChange={onInputChange}
							/>
						</div>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='shorttime'>
								ShortTime Amount
							</label>
							<input
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								type='text'
								name='shorttime'
								id='shorttime'
								placeholder='ShortTime'
								value={initial.shorttime}
								onChange={onInputChange}
							/>
						</div>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='overnight'>
								Overnight
							</label>
							<input
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								type='text'
								name='overnight'
								id='overnight'
								placeholder='overnight'
								value={initial.overnight}
								onChange={onInputChange}
							/>
						</div>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='gender'>
								Gender
							</label>
							<input
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								type='text'
								name='gender'
								id='gender'
								placeholder='gender'
								value={initial.gender}
								onChange={onInputChange}
							/>
						</div>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='build'>
								Build
							</label>
							<input
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								type='text'
								name='build'
								id='build'
								placeholder='slim or fat'
								value={initial.build}
								onChange={onInputChange}
							/>
						</div>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='height'>
								Height
							</label>
							<input
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								type='text'
								name='height'
								id='height'
								placeholder='height'
								value={initial.height}
								onChange={onInputChange}
							/>
						</div>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='bustsize'>
								BustSize
							</label>
							<input
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								type='text'
								name='bustsize'
								id='bustsize'
								placeholder='bustsize'
								value={initial.bustsize}
								onChange={onInputChange}
							/>
						</div>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='ethnicity'>
								Ethnicity
							</label>
							<input
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								type='text'
								name='ethnicity'
								id='ethnicity'
								placeholder='ethnicity'
								value={initial.ethnicity}
								onChange={onInputChange}
							/>
						</div>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='smoke'>
								smoke
							</label>
							<select
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								name='smoke'
								id='smoke'
								value={initial.smoke}
								onChange={onInputChange}
							>
								<option value=''></option>
								<option value='no'>No</option>
								<option value='yes'>Yes</option>
							</select>
						</div>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='condom'>
								Condom
							</label>
							<select
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								name='condom'
								id='condom'
								value={initial.condom}
								onChange={onInputChange}
							>
								<option value=''></option>
								<option value='no'>No</option>
								<option value='yes'>Yes</option>
							</select>
						</div>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='anal'>
								Anal Sex
							</label>
							<select
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								name='anal'
								id='anal'
								value={initial.anal}
								onChange={onInputChange}
							>
								<option value=''></option>
								<option value='no'>No</option>
								<option value='yes'>Yes</option>
							</select>
						</div>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='oral'>
								Oral Sex
							</label>
							<select
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								name='oral'
								id='oral'
								value={initial.oral}
								onChange={onInputChange}
							>
								<option value=''></option>
								<option value='no'>No</option>
								<option value='yes'>Yes</option>
							</select>
						</div>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='age'>
								Age
							</label>
							<input
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								type='text'
								name='age'
								id='age'
								placeholder='age'
								value={initial.age}
								onChange={onInputChange}
							/>
						</div>
						<div className='update__items__input'>
							<label className='block my-2 text-md ' htmlFor='orientation'>
								Orientation
							</label>
							<input
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								type='text'
								name='orientation'
								id='orientation'
								placeholder='straight , bi or gay'
								value={initial.orientation}
								onChange={onInputChange}
							/>
						</div>
					</div>
					<button
						type='submit'
						className=' px-2.5 py-2.5 mt-4 sm:mt-6 text-xl font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 w-full'
					>
						Update
					</button>
				</form>
			</div>
		</div>
	);
};
