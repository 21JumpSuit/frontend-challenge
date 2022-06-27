import NoPersons from './NoPersons';
const UserTable = ({ users }) => {
    return users && users.length ? (
        <table className='border-collapse border border-slate-500'>
            <tr>
                <th className='border border-slate-500 p-3'>User Name</th>
                <th className='border border-slate-500 p-3'>User Address</th>
            </tr>
            {users.map((user, index) => {
                return (
                    <tr key={index}>
                        <td className='border border-slate-500 p-3'>
                            {user.name.title} {user.name.first} {user.name.last}
                        </td>
                        <td className='border border-slate-500 p-3'>
                            {user.location.street.number}{' '}
                            {user.location.street.name} {user.location.city},{' '}
                            {user.location.state} {user.location.postcode}
                        </td>
                    </tr>
                );
            })}
        </table>
    ) : (
        <NoPersons />
    );
};

export default UserTable;
