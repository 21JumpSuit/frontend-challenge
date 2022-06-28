import React from 'react';
import { useState, useEffect } from 'react';


const Challenge = () => {
	const [people, setPeople] = useState([]);
	const [table, setTable] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredList, setFilteredList] = useState([]);

	async function fetchPeople(){
		let fetchList = await fetch("https://randomuser.me/api/?results=10")
		let data = await fetchList.json();
		setPeople(data.results)
	}

	async function addPerson(){
		let fetchNewPerson = await fetch("https://randomuser.me/api/")
		let data = await fetchNewPerson.json();
		setPeople([...people, data.results[0]])
	}

	const removePerson=(person)=>()=>{
		const newList = people.filter((peopleList)=> peopleList !== person)
		setPeople(newList)
	}

	useEffect(()=>{
		fetchPeople();   // fetch 10 random people on app start
	},[])
	
	useEffect(()=>{
		const filteredData = people.filter((person)=> 	
			`${person.name.first} ${person.name.last}`.toLowerCase().includes(searchTerm.toLocaleLowerCase())		// filter by first name first
			+ `${person.name.last} ${person.name.first}`.toLowerCase().includes(searchTerm.toLocaleLowerCase())		// ...or filter by last name first
		);
		setFilteredList(filteredData);
	},[people, searchTerm])		// call this everytime there is change to people or searchterm states
	return (
		<div className='flex flex-wrap items-center justify-around min-w-full mt-6 sm:w-full'>
			<div className='p-6 mt-6 text-left border w-full rounded-xl'>
				<div className='flex justify-evenly mb-2'>
					<div className='flex items-center'>
						<input placeholder='Search Name' onChange={(e)=>setSearchTerm(e.target.value)} className='border-2 border-black'/>
					</div>
					
					<button onClick={()=>setTable(!table)} id='switcher' className='bg-blue-900 text-white px-2 py-1 hover:bg-blue-500 hover:text-black rounded-xl'>
						{table ? 'Switch to Grid' : 'Switch to Table'}
					</button>
					<button onClick={addPerson} id='addition' className='bg-blue-900 text-white px-2 py-1 hover:bg-blue-500 hover:text-black rounded-xl'>
						Add New Person
					</button>
				</div>
				{(filteredList.length > 0) &&  // There are people 
					<div>
						{!table &&		// Grid
							<div className='w-full flex flex-wrap justify-evenly'> 
							{filteredList.map((person)=>(
								<div onClick={removePerson(person)} className='w-1/5 h-700 bg-gray-300 flex flex-col items-center justify-center my-1 mx-1 py-2 rounded hover:bg-gray-700 hover:text-white'>
									<img src={person.picture.large} alt={person.name.last}/>
									<h1>{person.name.first} {person.name.last}</h1>
								</div>
							))}
							</div>
						}
						{table &&		// Table
							<div>
								<table className='w-full border-collapse border border-slate-500'>
									<thead>
										<tr className='bg-gray-900 text-white'>
											<th className='border border-slate-600 '>Name</th>
											<th className='border border-slate-600 '>Street</th>
											<th className='border border-slate-600 '>City</th>
											<th className='border border-slate-600 '>State</th>
											<th className='border border-slate-600 '>Postcode</th>
											<th className='border border-slate-600 '>Country</th>
										</tr>
									</thead>
									{filteredList.map((person)=>(
										<tbody>
											<tr onClick={removePerson(person)} className='bg-gray-300 hover:bg-gray-700 hover:text-white'>
												<td className='border border-slate-700'>{person.name.first} {person.name.last}</td>
												<td className='border border-slate-700'>{person.location.street.number} {person.location.street.name}</td>
												<td className='border border-slate-700'>{person.location.city}</td>
												<td className='border border-slate-700'>{person.location.state}</td>
												<td className='border border-slate-700'>{person.location.postcode}</td>
												<td className='border border-slate-700'>{person.location.country}</td>
											</tr>
										</tbody>
									))}
								</table>
							</div>
						}
					</div>
					
				}
				{filteredList.length < 1 &&	// No people left
					<div>
						No persons...
					</div>
				}
				
			</div>
		</div>
	);
};

export default Challenge;
