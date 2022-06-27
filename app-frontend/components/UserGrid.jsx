import User from './User';

const UserGrid = ({ users, deleteUser }) => {
    return users && users.length ? (
        <div className='grid grid-cols-4'>
            {users.map((user, index) => {
                return <User key={index} user={user} deleteUser={deleteUser} />;
            })}
        </div>
    ) : (
        <div>no users found</div>
    );
};

export default UserGrid;
