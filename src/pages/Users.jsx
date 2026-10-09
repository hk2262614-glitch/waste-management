import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { users as initialUsers } from '../data/mockData';
import Modal from '../components/Modal';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';

const wasteCategoryColors = {
  Organic: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  Plastic: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  Metal: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  Hazardous: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

const emptyUser = { name: '', address: '', contact: '', wasteCategory: 'Organic' };

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState(emptyUser);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.address.toLowerCase().includes(search.toLowerCase()) ||
      u.wasteCategory.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingUser(null);
    setFormData(emptyUser);
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, address: user.address, contact: user.contact, wasteCategory: user.wasteCategory });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.address || !formData.contact) return;
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...formData, avatar: formData.name.split(' ').map(n => n[0]).join('') } : u)));
    } else {
      const newUser = {
        ...formData,
        id: Math.max(...users.map(u => u.id)) + 1,
        avatar: formData.name.split(' ').map(n => n[0]).join(''),
      };
      setUsers([...users, newUser]);
    }
    setModalOpen(false);
  };

  const confirmDelete = () => {
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    setDeleteModal(false);
    setUserToDelete(null);
  };

  if (loading) return <LoadingState message="Loading users..." />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage registered users and their waste preferences</p>
        </div>
        <button onClick={openAdd} className="btn-primary" id="add-user-btn">
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name, address, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
            id="user-search"
          />
        </div>

        {filteredUsers.length === 0 ? (
          <EmptyState title="No users found" description="Try adjusting your search or add a new user." />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full" id="users-table">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-3.5 text-left">User</th>
                  <th className="px-6 py-3.5 text-left">Address</th>
                  <th className="px-6 py-3.5 text-left">Contact</th>
                  <th className="px-6 py-3.5 text-left">Category</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg gradient-eco flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                          {user.avatar}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{user.name}</span>
                      </div>
                    </td>
                    <td className="table-cell max-w-xs truncate">{user.address}</td>
                    <td className="table-cell">{user.contact}</td>
                    <td className="table-cell">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${wasteCategoryColors[user.wasteCategory] || ''}`}>
                        {user.wasteCategory}
                      </span>
                    </td>
                    <td className="table-cell text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEdit(user)}
                          className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setUserToDelete(user); setDeleteModal(true); }}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingUser ? 'Edit User' : 'Add New User'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Address</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Contact</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Waste Category</label>
            <select
              className="input-field"
              value={formData.wasteCategory}
              onChange={(e) => setFormData({ ...formData, wasteCategory: e.target.value })}
            >
              <option>Organic</option>
              <option>Plastic</option>
              <option>Metal</option>
              <option>Hazardous</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} className="btn-primary flex-1 justify-center">
              {editingUser ? 'Save Changes' : 'Add User'}
            </button>
            <button onClick={() => setModalOpen(false)} className="btn-secondary flex-1 justify-center">
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)} title="Delete User">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-7 h-7 text-red-500" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-1">
            Are you sure you want to delete <span className="font-semibold">{userToDelete?.name}</span>?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">This action cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={confirmDelete} className="btn-danger flex-1 justify-center">
              Delete
            </button>
            <button onClick={() => setDeleteModal(false)} className="btn-secondary flex-1 justify-center">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
