import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit3,
  X,
  Save,
  Camera,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Hadi Maadikhah",
    email: "hadi.Maadikhah.info@gmail.com",
    phone: "+971-50-123-4567",
    joined: "2023-04-12",
    avatar: "https://i.pravatar.cc/128?img=15",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const [onConfirmAction, setOnConfirmAction] = useState(null);

  const [avatarPreview, setAvatarPreview] = useState(user.avatar);

  const requestConfirm = (action) => {
    setOnConfirmAction(() => action);
    setConfirmModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // -------------------------------
  //         FILE SELECT
  // -------------------------------
  const onAvatarSelected = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    requestConfirm(() => {
      setUser({
        ...user,
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        avatar: avatarPreview,
      });

      setModalOpen(false);
      toast.success("Profile updated successfully!");
    });
  };

  const saveAvatar = () => {
    requestConfirm(() => {
      setUser((prev) => ({
        ...prev,
        avatar: avatarPreview,
      }));

      setAvatarModal(false);
      toast.success("Profile picture updated!");
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#f7f8ff] to-[#e8eaff]">
          <User className="text-[#2E3092]" size={24} />
          <h2 className="text-xl sm:text-2xl font-semibold text-[#2E3092]">
            My Profile
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-8">

          {/* Avatar */}
          <div className="flex items-center gap-5">
            <div className="relative group">
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full border border-gray-300 shadow object-cover"
              />

              <button
                onClick={() => setAvatarModal(true)}
                className="absolute bottom-0 right-0 bg-[#2E3092] text-white p-1.5 rounded-full shadow hover:bg-[#23246e] transition"
              >
                <Camera size={16} />
              </button>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1c1f4a]">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
              <Mail className="text-[#2E3092]" size={20} />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-semibold text-gray-800">{user.email}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
              <Phone className="text-[#2E3092]" size={20} />
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-semibold text-gray-800">{user.phone}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
              <Calendar className="text-[#2E3092]" size={20} />
              <div>
                <p className="text-xs text-gray-500">Joined</p>
                <p className="text-sm font-semibold text-gray-800">{user.joined}</p>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-[#2E3092] hover:bg-[#23246e] text-white px-6 py-2.5 rounded-md text-sm font-medium transition"
            >
              <Edit3 size={16} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* ===================== EDIT PROFILE MODAL ===================== */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl border border-gray-200 p-6 animate-fade-in">

            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="text-lg font-semibold text-[#2E3092]">Edit Profile</h3>
              <button onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#2E3092]/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#2E3092]/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#2E3092]/50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={saveProfile}
                className="flex items-center gap-2 px-5 py-2 bg-[#2E3092] text-white rounded-md text-sm hover:bg-[#23246e]"
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== AVATAR MODAL ===================== */}
      {avatarModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl border border-gray-200 p-6 animate-fade-in">

            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="text-lg font-semibold text-[#2E3092]">
                Change Profile Picture
              </h3>
              <button onClick={() => setAvatarModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-4 mt-4">
              <img
                src={avatarPreview}
                className="w-28 h-28 rounded-full border object-cover shadow"
              />

              <label className="cursor-pointer bg-[#2E3092] hover:bg-[#23246e] text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition">
                <Camera size={16} />
                Choose Image
                <input type="file" className="hidden" onChange={onAvatarSelected} />
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setAvatarModal(false)}
                className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={saveAvatar}
                className="flex items-center gap-2 px-5 py-2 bg-[#2E3092] text-white rounded-md text-sm hover:bg-[#23246e]"
              >
                <CheckCircle size={16} />
                Save Picture
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== CONFIRMATION MODAL ===================== */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-xl border border-gray-200 p-6">

            <h3 className="text-lg font-semibold text-[#2E3092] mb-4">
              Are you sure?
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Do you want to save the changes?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal(false)}
                className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setConfirmModal(false);
                  if (onConfirmAction) onConfirmAction();
                }}
                className="px-5 py-2 bg-[#2E3092] hover:bg-[#23246e] text-white rounded-md text-sm"
              >
                Yes, Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
