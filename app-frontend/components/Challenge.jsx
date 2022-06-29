import React, { useState, useEffect } from 'react';

const Challenge = ({ users, setUsers, fetchUserData }) => {
	const [alternateView, setAlternateView] = useState(false);
	const [newUsers, setNewUsers] = useState([]);
	const [searchedUser, setSearchedUser] = useState('');

	const toggleView = () => {
		setAlternateView(alternateView => !alternateView);
	}

	const deleteUser = (id) => {
		setUsers(users.filter(user => user.email !== id));
		setNewUsers(newUsers.filter(user => user.email !== id));
	};

	const addUser = () => {
		if (newUsers.length < 10) {
			fetch('https://randomuser.me/api/?results')
				.then(response => response.json())
				.then(data => {
					let result = data.results[0];

					setUsers([...users, result]);
					setNewUsers([...newUsers, result]);
				})
				.catch(error => {
					console.log(`Error: ${error}`);
				})
		}
	};

	useEffect(() => {
		if (users.length > 0 && !searchedUser) fetchUserData();
		if (!users.length && !searchedUser) fetchUserData();

		const filteredUsers = users.filter(user => user.name.first.toLowerCase().includes(searchedUser.toLowerCase()));

		if (filteredUsers.length && searchedUser.length) {
			setUsers(filteredUsers);
		}
	}, [searchedUser]);

	const usersGrid = users.map((user, i) => (
		<div key={i} className='flex flex-col justify-center items-center'>
			<div className='rounded-full border border-8 border-slate-300'>
				<img className='rounded-full cursor-pointer' src={user.picture.large} alt={user.name.last} onClick={() => deleteUser(user.email)} />
			</div>
			<div className='mt-1 boxShadow.3xl'>{user.name.first} {user.name.last}</div>
		</div>
	));

	const usersTable = users.map((user, i) => (
		<tr key={i} className='cursor-pointer' onClick={() => deleteUser(user.email)}>
			<td className='border border-black text-sm'>{user.name.title}. {user.name.first} {user.name.last}</td>
			<td className='border border-black text-sm'>{user.location.street.number} {user.location.street.name}</td>
			<td className='border border-black text-sm'>{user.location.city}</td>
			<td className='border border-black text-sm'>{user.location.state}</td>
			<td className='border border-black text-sm'>{user.location.postcode}</td>
			<td className='border border-black text-sm'>{user.location.coordinates.latitude}</td>
			<td className='border border-black text-sm'>{user.location.coordinates.longitude}</td>
			<td className='border border-black text-sm'>{user.location.timezone.description}</td>
		</tr>
	));

	return (
		<>
			<input className='m-10 bg-slate-50 rounded-full py-2 pl-5 pr-10 w-96 outline-none' type='text' placeholder='Search users...' onChange={(e) => setSearchedUser(e.target.value.toLowerCase())} />
			<div className='flex flex-col flex-wrap items-center justify-around min-w-full mt-6 sm:w-full'>
				{!alternateView ? (
					<div className='grid grid-cols-4 gap-10'>
						{users.length ? usersGrid : <div className='absolute left-50 ml-4'>No persons... </div>}
					</div>
				) : (
					<div className='flex flex-col flex-wrap items-center justify-around min-w-full sm:w-full'>
						{users.length ? <table className='table-fixed'>
							<thead>
								<tr className='bg-slate-800 text-white'>
									<th className='py-4 w-28'>Name</th>
									<th className='py-4 w-28'>Street</th>
									<th className='py-4 w-28'>City</th>
									<th className='py-4 w-28'>State</th>
									<th className='py-4 w-28'>Postcode</th>
									<th className='py-4 w-28'>Latitude</th>
									<th className='py-4 w-28'>Longitude</th>
									<th className='py-4 w-28'>Timezone</th>
								</tr>
							</thead>
							<tbody className='nth-child:bg-slate-300'>
								{usersTable}
							</tbody>
						</table> : <div>No persons... </div>
						}
					</div>
				)
				}
				<div>
					<button id='switcher' className='m-10 bg-slate-800 text-white py-3 px-7 rounded-full text-sm' onClick={toggleView}>Change View</button>
					<button id='addition' className='m-20 bg-slate-800 text-white py-3 px-10 rounded-full text-sm' onClick={addUser}>Add User</button>
				</div>
			</div>
		</>
	)
}

export default Challenge;
