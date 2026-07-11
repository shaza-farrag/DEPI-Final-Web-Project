import { IoPeopleOutline } from "react-icons/io5";

const users = [  
//     {
//     id: 1,
//     name: "Ahmed Mostafa",
//     email: "ahmed.mostafa@gmail.com",
//     sign_up_at: "10-2-2026",
//   }
];

function Users() {
  return (
    <div className="relative p-6 overflow-x-auto bg-white my-5 shadow-md rounded-xl border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-[#F8ECEC] flex items-center justify-center">
          <IoPeopleOutline className="text-2xl text-[#D797C6]" />
        </div>
        <h1 className="text-2xl font-semibold text-zinc-600">Users</h1>
      </div>

      <div className="rounded-md! shadow-md! border border-[rgba(0,0,0,0.1)] overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse">
          <thead>
            <tr className="bg-[#F8ECEC]!">
              <th className="font-bold! text-[#7a7171]! text-left px-4 py-3">
                ID
              </th>
              <th className="font-bold! text-[#7a7171]! text-left px-4 py-3">
                Name
              </th>
              <th className="font-bold! text-[#7a7171]! text-left px-4 py-3">
                Email
              </th>
              <th className="font-bold! text-[#7a7171]! text-left px-4 py-3">
                Sign up at
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-[#F8ECEC]! transition-all border-b border-[rgba(0,0,0,0.06)]"
              >
                <td className="font-medium! text-gray-500! px-4 py-3">
                  #{user.id}
                </td>
                <td className="font-medium! px-4 py-3">{user.name}</td>
                <td className="px-4 py-3 text-gray-500">{user.email}</td>
                <td className="px-4 py-3 text-gray-500">{user.sign_up_at}</td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-gray-400">
                 No Users Found 
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;