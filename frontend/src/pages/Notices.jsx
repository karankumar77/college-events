import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
export default function Notices({ role }) {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: '', body: '', category: 'General' });
  const isAdmin = role === 'admin';
  const load = async () => {
    const { data } = await api.get('/api/notices'); setNotices(data);
  };
  useEffect(() => { load(); }, []);
  const createNotice = async () => {
    if (!isAdmin) return;
    await api.post('/api/notices', form);
    setForm({ title: '', body: '', category: 'General' }); load();
  };
  return (
    <div>
      <h2>Notices</h2>
      {isAdmin && (
        <div style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
          <input placeholder="Title" value={form.title} onChange={e=>setForm({ ...form, title: e.target.value })} />
          <textarea placeholder="Body" value={form.body} onChange={e=>setForm({ ...form, body: e.target.value })} />
          <select value={form.category} onChange={e=>setForm({ ...form, category: e.target.value })}>
            <option>General</option>
            <option>Academic</option>
            <option>Placement</option>
          </select>
          <button onClick={createNotice}>Add Notice</button>
        </div>
      )}
      <ul style={{ display: 'grid', gap: 12, padding: 0 }}>
        {notices.map(n => (
          <li key={n._id} style={{ listStyle: 'none', border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
            <b>{n.title}</b> — <small>{n.category}</small>
            <p>{n.body}</p>
            <small>{new Date(n.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
