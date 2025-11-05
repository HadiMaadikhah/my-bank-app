export default function AccountList() {
  const profiles = [
    {
      id: 1,
      name: "Personal Profile",
      accounts: [
        { id: 1, type: "Savings", number: "123-456-789", salary: true },
        { id: 2, type: "Joint Account", number: "987-654-321", salary: false },
      ],
    },
    {
      id: 2,
      name: "Business Profile",
      accounts: [
        { id: 3, type: "Corporate", number: "112-233-445", salary: false },
      ],
    },
  ];

  return (
    <div className="p-4 w-full max-w-[100vw] overflow-x-hidden">
      {profiles.map((profile) => (
        <div key={profile.id} className="mb-4 border-b pb-3">
          <h3 className="text-lg font-semibold text-[#2E3092] mb-2">
            {profile.name}
          </h3>

          <ul className="space-y-1">
            {profile.accounts.map((acc) => (
              <li
                key={acc.id}
                className="flex justify-between items-center border rounded-md px-3 py-2 bg-white shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="font-medium text-sm sm:text-base">{acc.type}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{acc.number}</p>
                </div>

                {acc.salary && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Salary
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
