const User = ({ user, deleteUser }) => {
    return user ? (
        <div
            className='justify-self-stretch'
            onClick={() => deleteUser(user.email)}
        >
            <img
                className='m-auto'
                src={user.picture.thumbnail}
                alt={user.name.last}
            ></img>
            <div className='text-center'>
                {user.name.first} {user.name.last}
            </div>
        </div>
    ) : null;
};

export default User;
