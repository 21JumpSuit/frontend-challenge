import React, { useState } from "react";

const Challenge = ({ users, toggleView, setUsers }) => {
  const [search, setSearch] = useState("");

  const handleDeleteUser = (clickedCell) => {
    setUsers(users.filter((user) => user.cell !== clickedCell));
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const filterUser = (val) => {
    if (search === "") {
      return val;
    } else if (val.name.first.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  };

  return users.length !== 0 ? (
    <div className="flex flex-wrap items-center justify-around min-w-full mt-6 sm:w-full">
      <div className="w-full p-6 mt-6 text-left border rounded-xl">
        <div className="text-center">
          <input
            className="px-3 py-2 mb-8 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outlineshadow focus:shadow-outline"
            type="text"
            placeholder="Search by name.."
            onChange={onChange}
          />
        </div>
        {toggleView ? (
          <div className="overflow-x-auto">
            <table className="m-auto border border-separate table-auto border-slate-400">
              <thead>
                <tr>
                  <th className="border lg:p-1 border-slate-300">Name</th>
                  <th className="border border-slate-300">City</th>
                  <th className="border border-slate-300">Latitude</th>
                  <th className="border border-slate-300">Longitude</th>
                  <th className="border border-slate-300">Country</th>
                  <th className="border border-slate-300">Postcode</th>
                  <th className="border border-slate-300">State</th>
                  <th className="border border-slate-300">Street</th>
                  <th className="border border-slate-300">Timezone</th>
                </tr>
              </thead>
              <tbody>
                {users.filter(filterUser).map((user) => (
                  <tr
                    key={user.cell}
                    className="font-mono"
                    onClick={() => handleDeleteUser(user.cell)}
                  >
                    <td className="border border-slate-300">
                      {user.name.first} {user.name.last}
                    </td>
                    <td className="border border-slate-300">
                      {user.location.city}
                    </td>
                    <td className="border border-slate-300">
                      {user.location.coordinates.latitude}
                    </td>
                    <td className="border border-slate-300">
                      {user.location.coordinates.longitude}
                    </td>
                    <td className="border border-slate-300">
                      {user.location.country}
                    </td>
                    <td className="border border-slate-300">
                      {user.location.postcode}
                    </td>
                    <td className="border border-slate-300">
                      {user.location.state}
                    </td>
                    <td className="border border-slate-300">
                      {user.location.street.number} {user.location.street.name}
                    </td>
                    <td className="border border-slate-300">
                      {user.location.timezone.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-4 justify-items-center">
            {users.filter(filterUser).map((user) => (
              <div
                className="flex flex-col items-center shadow-lg shadow-gray-500/50"
                key={user.cell}
                onClick={() => handleDeleteUser(user.cell)}
              >
                <img
                  className="w-40"
                  src={user.picture.medium}
                  alt={user.name.last}
                />
                <p className="font-mono">
                  {user.name.first} {user.name.last}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="w-full p-6 mt-6 text-center border rounded-xl">
      <h2>No persons...</h2>
    </div>
  );
};

export default Challenge;
