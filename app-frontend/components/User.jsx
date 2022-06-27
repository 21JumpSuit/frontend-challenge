const User = ({ user, deleteUser }) => {
    return user ? (
        <div className='user-row' onClick={() => deleteUser(user.email)}>
            <img
                className='photo'
                src={user.picture.thumbnail}
                alt={user.name.last}
            ></img>
            <div className='name'>
                {user.name.first} {user.name.last}
            </div>
        </div>
    ) : null;
};

export default User;
