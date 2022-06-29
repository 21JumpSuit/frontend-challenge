import React, { useEffect, useMemo, useState } from "react";

// Fetch *count* of users from the API and update the state array
// as well as generating the headers for the table columns
const fetchUsers = async ({ users, setUsers, setTableHeaders, count }) => {
  try {
    const response = await fetch(
      `https://randomuser.me/api/?results=${count}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => res.json());

    const updatedUsers = [...users, ...response.results];
    setUsers(updatedUsers);

    if (count === 10) {
      setTableHeaders([
        "Full Name",
        ...Object.keys(flatten(updatedUsers[0].location)),
      ]);
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

// Flatten the given object
const flatten = (object) => {
  const flattened = {};

  Object.keys(object).forEach((key) => {
    const value = object[key];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flatten(value));
    } else {
      flattened[key] = value;
    }
  });

  return flattened;
};

// Render the array of users, filtered by search input, into one of two views
const RenderedUsers = ({
  users,
  setUsers,
  filter,
  alternateView,
  tableHeaders,
}) => {
  if (users.length > 0) {
    // Filter based on search input
    const filteredUsers = () => {
      if (filter === "") {
        return users;
      } else {
        return users
          .map((user) => {
            if (
              (
                user.name.first.toLowerCase() +
                " " +
                user.name.last.toLowerCase()
              ).includes(filter.toLowerCase())
            ) {
              return user;
            } else {
              return;
            }
          })
          .filter((data) => typeof data !== "undefined");
      }
    };

    if (filteredUsers().length > 0) {
      if (!alternateView) {
        // Grid View
        return (
          <div className="grid grid-cols-4 gap-5">
            {filteredUsers().map((user, index) => {
              return (
                <div
                  onClick={() => removeUser({ users, setUsers, index })}
                  key={user.login.uuid}
                  className="flex flex-col gap-5 bg-white m-auto p-3 shadow-md shadow-slate-300 items-center cursor-pointer group hover:bg-slate-200 ease-in-out duration-150 active:shadow-none active:bg-slate-400"
                >
                  <img
                    src={user.picture.large}
                    alt={user.name.last}
                    width="128"
                    height="128"
                    className="w-full md:w-44 lg:w-72 group-hover:grayscale ease-in-out duration-150 group-active:brightness-50"
                  />
                  <h3 className="capitalize inline group-hover:text-red-700 ease-in-out duration-150 text-xl">
                    {user.name.first} {user.name.last}
                  </h3>
                </div>
              );
            })}
          </div>
        );
      } else {
        // Table view
        return (
          <div className="overflow-auto">
            <table className="table-auto">
              <thead>
                <tr className="capitalize">
                  <Headers tableHeaders={tableHeaders} />
                </tr>
              </thead>
              <tbody>
                {filteredUsers().map((user, index) => {
                  const flattened = flatten(user.location);
                  return (
                    <tr
                      onClick={() => removeUser({ users, setUsers, index })}
                      key={user.login.uuid}
                      className="odd:bg-white even:bg-slate-50 hover:bg-slate-200 cursor-pointer group ease-in-out duration-150 active:bg-slate-400"
                    >
                      <td className="whitespace-nowrap border border-slate-400 p-2 grou-hover:text-red-700 ">
                        {user.name.first} {user.name.last}
                      </td>
                      {Object.keys(flattened).map((key) => {
                        return (
                          <td
                            key={user.login.uuid + key}
                            className={`${
                              ["latitude", "longitude", "offset"].indexOf(
                                key
                              ) >= 0
                                ? "text-right"
                                : "text-left"
                            } p-2 border border-slate-400 group-hover:text-red-700`}
                          >
                            {flattened[key]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }
    }
  } else {
    // Fallback if no user data is available
    return <div className="text-center text-2xl">No persons...</div>;
  }
};

const Headers = ({ tableHeaders }) => {
  if (tableHeaders.length > 0) {
    return tableHeaders.map((header) => {
      return (
        <th key={`header-${header}`} className="text-center text-base px-2">
          {header}
        </th>
      );
    });
  }
};

const removeUser = ({ users, setUsers, index }) => {
  // const alteredUsers = [...users.slice(0, index), ...users.slice(index + 1)]
  const alteredUsers = users.filter((_, i) => i !== index);
  setUsers(alteredUsers);
};

const changeView = ({ alternateView, setAlternateView }) => {
  setAlternateView(!alternateView);
};

const filterUsers = ({ e, setFilter }) => {
  setFilter(e.target.value);
};

const Challenge = () => {
  const [users, setUsers] = useState([]);
  const [alternateView, setAlternateView] = useState(false);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchUsers({ users, setUsers, setTableHeaders, count: 10 });
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-around min-w-full mt-6 sm:w-full">
      <div className="flex flex-col gap-5 bg-slate-100 p-6 mt-6 text-left border w-full rounded-xl">
        <div className="flex items-baseline justify-between gap-5">
          <div className="flex gap-5">
            <button
              id="switcher"
              onClick={() => changeView({ alternateView, setAlternateView })}
              className="w-32 h-12 p-1 bg-indigo-600 text-white text-xl rounded-md hover:bg-indigo-800 active:bg-indigo-900 shadow-md shadow-slate-400 active:shadow-none"
            >
              {!alternateView ? "Table View " : "Grid View"}
            </button>
            <button
              id="addition"
              onClick={() => fetchUsers({ users, setUsers, count: 1 })}
              className="w-32 h-12 p-1 bg-indigo-600 text-white text-xl rounded-md hover:bg-indigo-800 active:bg-indigo-900 shadow-md shadow-slate-400 active:shadow-none"
            >
              Add User
            </button>
          </div>
          <label htmlFor="filter" className="">
            Search:
            <input
              type="text"
              value={filter}
              id="filter"
              onChange={(e) => filterUsers({ e, setFilter })}
              className="mx-3 border-2 border-solid border-slate-300 rounded-sm text-lg"
            />
          </label>
        </div>
        {!alternateView ? (
          <RenderedUsers
            users={users}
            setUsers={setUsers}
            filter={filter}
            alternateView={alternateView}
          />
        ) : (
          <>
            <RenderedUsers
              users={users}
              setUsers={setUsers}
              filter={filter}
              alternateView={alternateView}
              tableHeaders={tableHeaders}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Challenge;
