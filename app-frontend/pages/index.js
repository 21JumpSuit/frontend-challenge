import Head from "next/head";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Challenge from "../components/Challenge";
import { useState, useEffect } from "react";

export default function Home() {
  const [toggleView, setToggleView] = useState(false);
  const [singleUser, setSingleUser] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://randomuser.me/api/?results=10");
      const data = await res.json();
      const usersData = data.results;
      setUsers(usersData);
    }

    fetchData();
    handleAddUser();
  }, []);

  const handleToggleView = () => {
    setToggleView(!toggleView);
  };

  const handleAddUser = async () => {
    const res2 = await fetch("https://randomuser.me/api/");
    const data2 = await res2.json();
    const singleUserData = data2.results;
    setSingleUser(singleUserData);
    singleUser && users.push(singleUser[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Frontend Boilerplate React/NextJS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <Hero />
        <Challenge users={users} toggleView={toggleView} setUsers={setUsers} />
        <div className="w-full my-10 text-center justify-evenly lg:flex">
          <button
            className="px-4 py-2 m-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            id="switcher"
            onClick={handleToggleView}
          >
            {toggleView ? "Image" : "Table"} View
          </button>
          <button
            className="px-4 py-2 m-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            id="addition"
            onClick={handleAddUser}
          >
            Add User
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
