import { useState } from "react";
import WpsPageLayout from "@/components/WpsPageLayout";
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  X,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function Companies() {
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null);

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "BlueWave Technologies LLC",
      tradeLicense: "LIC-45789",
      employees: 132,
      active: true,
    },
    {
      id: 2,
      name: "Golden Falcon Trading Co.",
      tradeLicense: "LIC-98211",
      employees: 58,
      active: true,
    },
    {
      id: 3,
      name: "Oceanic Foods Industries",
      tradeLicense: "LIC-77456",
      employees: 240,
      active: false,
    },
  ]);

  const [newCompany, setNewCompany] = useState({
    name: "",
    tradeLicense: "",
    employees: "",
    status: "Active",
  });

  const handleAddCompany = (e) => {
    e.preventDefault();
    if (!newCompany.name || !newCompany.tradeLicense || !newCompany.employees)
      return alert("Please fill in all fields.");

    setCompanies((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: newCompany.name,
        tradeLicense: newCompany.tradeLicense,
        employees: parseInt(newCompany.employees),
        active: newCompany.status === "Active",
      },
    ]);
    setShowModal(false);
    setNewCompany({ name: "", tradeLicense: "", employees: "", status: "Active" });
  };

  const toggleCompanyStatus = (id) => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, active: !c.active } : c
      )
    );
    setConfirmModal(null);
  };

  return (
    <WpsPageLayout
      title="Companies"
      subtitle="View and manage the list of registered companies."
    >
      <div className="flex flex-col gap-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#2E3092]">
              Registered Companies
            </h2>
            <p className="text-sm text-gray-500">
              Manage company profiles and registration details.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition"
          >
            <Plus size={16} />
            Add Company
          </button>
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-md border border-[#d9dbff]/60 shadow-sm rounded-xl overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#2E3092] text-white text-left">
              <tr>
                <th className="py-3 px-4">Company Name</th>
                <th className="py-3 px-4">Trade License</th>
                <th className="py-3 px-4">Employees</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr
                  key={c.id}
                  className={`border-t border-[#e5e7ff]/60 transition ${
                    c.active
                      ? "hover:bg-[#f8f9ff] bg-white"
                      : "bg-gray-100 text-gray-500 opacity-80"
                  }`}
                >
                  <td className="py-3 px-4 font-medium text-[#1a1c3b]">{c.name}</td>
                  <td className="py-3 px-4 text-gray-600">{c.tradeLicense}</td>
                  <td className="py-3 px-4 text-gray-600">{c.employees}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        c.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {c.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-4 text-[#2E3092]">
                      {/* iOS Toggle */}
                      <button
                        onClick={() => setConfirmModal(c)}
                        className="relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none"
                        style={{
                          backgroundColor: c.active ? "#22c55e" : "#d1d5db",
                        }}
                      >
                        <span
                          className={`absolute left-[2px] top-[2px] w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                            c.active ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>

                      <button className="hover:text-[#1e217a]" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="hover:text-red-600" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Confirm Modal */}
        {confirmModal && (
          <>
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setConfirmModal(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center animate-fade-in border border-[#d9dbff]/60">
                {confirmModal.active ? (
                  <AlertTriangle
                    size={50}
                    className="text-red-500 mx-auto mb-3"
                  />
                ) : (
                  <CheckCircle2
                    size={50}
                    className="text-green-500 mx-auto mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold text-[#2E3092] mb-2">
                  {confirmModal.active
                    ? "Deactivate Company?"
                    : "Activate Company?"}
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Are you sure you want to{" "}
                  <span className="font-semibold">
                    {confirmModal.active ? "deactivate" : "activate"}
                  </span>{" "}
                  <span className="text-[#2E3092]">{confirmModal.name}</span>?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setConfirmModal(null)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => toggleCompanyStatus(confirmModal.id)}
                    className={`px-4 py-2 text-sm rounded-lg shadow-sm transition text-white ${
                      confirmModal.active
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {confirmModal.active ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Add Company Modal */}
        {showModal && (
          <>
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setShowModal(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#cfd3ff]/70 p-6 relative animate-fade-in">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-[#2E3092] transition"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="text-[#2E3092]" size={22} />
                  <h2 className="text-lg font-semibold text-[#2E3092]">
                    Add New Company
                  </h2>
                </div>

                <form onSubmit={handleAddCompany} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={newCompany.name}
                      onChange={(e) =>
                        setNewCompany({ ...newCompany, name: e.target.value })
                      }
                      placeholder="Enter company name"
                      className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3092]/40"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trade License Number
                    </label>
                    <input
                      type="text"
                      value={newCompany.tradeLicense}
                      onChange={(e) =>
                        setNewCompany({
                          ...newCompany,
                          tradeLicense: e.target.value,
                        })
                      }
                      placeholder="e.g. LIC-12345"
                      className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3092]/40"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employees Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newCompany.employees}
                      onChange={(e) =>
                        setNewCompany({
                          ...newCompany,
                          employees: e.target.value,
                        })
                      }
                      placeholder="Enter number of employees"
                      className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3092]/40"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={newCompany.status}
                      onChange={(e) =>
                        setNewCompany({ ...newCompany, status: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-[#d0d4ff]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3092]/40"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm bg-[#2E3092] hover:bg-[#23246e] text-white rounded-lg shadow-sm transition"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </WpsPageLayout>
  );
}
