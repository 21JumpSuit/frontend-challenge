import User from './User';
import NoPersons from './NoPersons';

const UserGrid = ({ displayedUsers: displayedUsers, deleteUser }) => {
    return displayedUsers && displayedUsers.length ? (
        <div className='grid grid-cols-4 justify-items-stretch'>
            {displayedUsers.map((user, index) => {
                return <User key={index} user={user} deleteUser={deleteUser} />;
            })}
        </div>
    ) : (
        <NoPersons />
    );
};

export default UserGrid;
