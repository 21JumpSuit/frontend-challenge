import NoPersons from './NoPersons';
const UserTable = ({
    displayedUsers: displayedUsers,
    deleteUser: deleteUser,
}) => {
    return displayedUsers && displayedUsers.length ? (
        <table className='border-collapse border border-slate-500 m-auto'>
            <thead className='bg-slate-200'>
                <tr>
                    <th className='border border-slate-500 p-3'>User Name</th>
                    <th className='border border-slate-500 p-3'>
                        User Address
                    </th>
                </tr>
            </thead>
            <tbody>
                {displayedUsers.map((user, index) => {
                    return (
                        <tr key={index} onClick={() => deleteUser(user.email)}>
                            <td className='border border-slate-500 p-3'>
                                {user.name.title} {user.name.first}{' '}
                                {user.name.last}
                            </td>
                            <td className='border border-slate-500 p-3'>
                                {user.location.street.number}{' '}
                                {user.location.street.name} {user.location.city}
                                , {user.location.state} {user.location.postcode}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    ) : (
        <NoPersons />
    );
};

export default UserTable;
