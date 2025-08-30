import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
export default function Events({ role }) {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', date: '', venue: '' });
  const isAdmin = role === 'admin';
  const load = async () => {
    const { data } = await api.get('/api/events'); setEvents(data);
  };
  useEffect(() => { load(); }, []);
  const createEvent = async () => {
    if (!isAdmin) return;
    await api.post('/api/events', form);
    setForm({ title: '', description: '', date: '', venue: '' }); load();
  };
  const remove = async (id) => {
    if (!isAdmin) return;
    await api.delete(`/api/events/${id}`); load();
  };
  return (
    <div>
      <h2>Events</h2>
      {isAdmin && (
        <div style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
          <input placeholder="Title" value={form.title} onChange={e=>setForm({ ...form, title: e.target.value })} />
          <input placeholder="Description" value={form.description} onChange={e=>setForm({ ...form, description: e.target.value })} />
          <input type="date" value={form.date} onChange={e=>setForm({ ...form, date: e.target.value })} />
          <input placeholder="Venue" value={form.venue} onChange={e=>setForm({ ...form, venue: e.target.value })} />
          <button onClick={createEvent}>Create Event</button>
        </div>
      )}
      <ul style={{ display: 'grid', gap: 12, padding: 0 }}>
        {events.map(ev => (
          <li key={ev._id} style={{ listStyle: 'none', border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
            <b>{ev.title}</b> — {ev.venue || 'TBA'}<br/>
            <small>{new Date(ev.date).toLocaleDateString()}</small>
            <p>{ev.description}</p>
            {isAdmin && <button onClick={()=>remove(ev._id)}>Delete</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
