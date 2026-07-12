import React from 'react'

function Sidebar({ users, selectedUserId, setselectedUserId, currentUser }) {
  return (
    <div className="w-80 bg-slate-900 text-white flex flex-col border-r border-slate-800">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">💬 ChatApp</h1>
        <p className="text-sm text-slate-400 mt-1">
          Real-time Messaging
        </p>
      </div>

      {/* Logged User */}
      <div className="p-4 border-b border-slate-700 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
          {currentUser?.username?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="font-semibold">{currentUser?.username}</h2>
          <p className="text-green-400 text-sm">Online</p>
        </div>
      </div>

      {/* Users */}
      <div className="flex-1 overflow-y-auto">

        {users.map((user) => (

          <div
            key={user._id}
            onClick={() => setselectedUserId(user._id)}
            className={`cursor-pointer px-5 py-4 flex items-center gap-3 transition
            ${
              selectedUserId === user._id
                ? "bg-blue-700"
                : "hover:bg-slate-800"
            }`}
          >

            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-slate-600 flex items-center justify-center font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>

              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900
                ${
                  user.isOnline
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              />
            </div>

            <div>
              <h3>{user.username}</h3>

              <p className="text-sm text-slate-400">
                {user.isOnline ? "Online" : "Offline"}
              </p>
            </div>

          </div>

        ))}

      </div>
    </div>
  );
}

export default Sidebar;
