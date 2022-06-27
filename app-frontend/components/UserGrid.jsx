import User from './User';
import NoPersons from './NoPersons';

const UserGrid = ({ users, deleteUser }) => {
    return users && users.length ? (
        <div className='grid grid-cols-4'>
            {users.map((user, index) => {
                return <User key={index} user={user} deleteUser={deleteUser} />;
            })}
        </div>
    ) : (
        <NoPersons />
    );
};

export default UserGrid;
