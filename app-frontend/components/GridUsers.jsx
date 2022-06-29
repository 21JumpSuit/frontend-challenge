const GridUsers = (props) => {
  const userInfos = props.userInfos;
  const deleteU = props.delete;
  const fullName = props.fullName;
  const errMsg=props.errMsg;

  return (
    <div className=" grid grid-cols-4 gap-4">

      {
      userInfos.length > 0 ?
      userInfos.map((user, index) => (

        <div key={index} className="mt-6 group relative" onClick={() => deleteU(index)}>
          <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <img src={user.picture.large} alt={user.name.first +' '+ user.name.last} className="w-full h-full object-center object-cover lg:w-full lg:h-full" />
          </div>
          <div className="mt-4 text-center">
            <div>
              <h3 className="mt-4 text-sm text-gray-700 ">{fullName[index]}</h3>
            </div>
          </div>
        </div>

      )):errMsg
    }
    </div>
  );
}

export default GridUsers;