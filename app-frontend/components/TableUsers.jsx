const TableUsers = (props) => {
    const userInfos = props.userInfos;
    const deleteU = props.delete;
    const fullName = props.fullName;
    const errMsg=props.errMsg;

    let newAr = userInfos.map((user) => {
        return user.location
    })

    return (
        <div className="flex flex-col">
            <div className="w-full">
                {
                    userInfos.length > 0 ?
                        newAr.map((user, index) => (


                            <div key={index} className="flex flex-col" onClick={() => deleteU(index)}>
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full border text-center">
                                                <thead className="border-b">
                                                    <tr>
                                                        <th colSpan="7" className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center border">
                                                            {fullName[index]}
                                                        </th>

                                                    </tr>
                                                    <tr>

                                                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 border-r">
                                                            City
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                                            Coordinates
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                                            Country
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                                            Postcode
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                                            State
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                                            Street
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                                            Timezone
                                                        </th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b">

                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                                            {user.city}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                                            {user.coordinates.latitude + ', ' + user.coordinates.longitude}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {user.country}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {user.postcode}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {user.state}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {user.street.name + '' + user.street.number}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {user.timezone.description + '' + user.timezone.offset}
                                                        </td>
                                                    </tr>


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )) : errMsg

                }</div></div>
    );
}

export default TableUsers;