import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Challenge from '../components/Challenge';

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [users, setUsers] = useState([]);

	const fetchUserData = () => {
		fetch('https://randomuser.me/api/?results=10')
		.then(response => response.json())
		.then(data => setUsers(data.results))
		.catch(error => {
			console.log(`Error: ${error}`);
			setError(error);

		})
		.finally(() => setLoading(false));
	};

	useEffect(() => {
		fetchUserData();
		
	}, []);

	if (loading) return <div className='flex flex-row justify-center items-center w-sreen h-screen'>Loading...</div>;
	if (error) return 'Error';

	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			<Head>
				<title>Frontend Boilerplate React/NextJS</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
				<Challenge
				  users={users} 
				  setUsers={setUsers}
				  fetchUserData={fetchUserData}
				 />
			</main>
			<Footer />
		</div>
	);
}
