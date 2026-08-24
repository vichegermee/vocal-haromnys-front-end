import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth';
import {
  bulkImportMembers,
  createMember,
  deleteMember,
  fetchMembers,
  type BulkImportResult,
} from '../api/members';
import type { Member } from '../api/auth';
import { ApiError } from '../api/client';

/** "Prénom Nom, email" or "Prénom, email" — one per line. */
function parseBulkList(text: string): { firstName: string; lastName?: string; email: string }[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [namePart, emailPart] = line.split(',').map((part) => part.trim());
      const [firstName, ...rest] = (namePart ?? '').split(/\s+/);
      return {
        firstName: firstName ?? '',
        lastName: rest.length > 0 ? rest.join(' ') : undefined,
        email: emailPart ?? '',
      };
    })
    .filter((row) => row.firstName && row.email);
}

export function Admin() {
  const { loggedIn, initializing, currentMember } = useAuth();

  const [members, setMembers] = useState<Member[] | null>(null);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<number | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const [showImportForm, setShowImportForm] = useState(false);
  const [importText, setImportText] = useState('');
  const [importResults, setImportResults] = useState<BulkImportResult[] | null>(null);
  const [importing, setImporting] = useState(false);

  const isAdmin = currentMember?.role === 'ADMIN';

  useEffect(() => {
    if (loggedIn && isAdmin) fetchMembers().then(setMembers);
  }, [loggedIn, isAdmin]);

  if (initializing) return null;
  if (!loggedIn) return <Navigate to="/connexion" replace />;
  if (!isAdmin) return <Navigate to="/repertoire" replace />;

  function reload() {
    fetchMembers().then(setMembers);
  }

  async function handleAddSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Captured before the `await` below — `e.currentTarget` is nulled out by
    // the browser once the event finishes dispatching, so using it after an
    // await throws (silently landing in the catch block below).
    const form = e.currentTarget;
    const formData = new FormData(form);
    setAdding(true);
    setAddError(null);
    try {
      await createMember({
        firstName: String(formData.get('firstName') ?? ''),
        lastName: String(formData.get('lastName') ?? '') || undefined,
        email: String(formData.get('email') ?? ''),
        role: formData.get('role') === 'ADMIN' ? 'ADMIN' : 'MEMBER',
      });
      form.reset();
      setShowAddForm(false);
      reload();
    } catch (err) {
      setAddError(err instanceof ApiError ? err.message : 'Une erreur est survenue, réessayez.');
    } finally {
      setAdding(false);
    }
  }

  async function handleImportSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const rows = parseBulkList(importText);
    if (rows.length === 0) return;
    setImporting(true);
    setImportResults(null);
    try {
      const results = await bulkImportMembers(rows);
      setImportResults(results);
      reload();
    } finally {
      setImporting(false);
    }
  }

  async function handleDelete(id: number) {
    await deleteMember(id);
    setConfirmingDeleteId(null);
    reload();
  }

  return (
    <section className="section container">
      <h6 className="eyebrow" style={{ color: 'var(--amber)' }}>Super admin</h6>
      <h1 style={{ fontSize: 36, marginBottom: 35.2 }}>Tableau de bord admin</h1>

      <div style={{ display: 'flex', gap: 13.2, flexWrap: 'wrap', marginBottom: 26.4 }}>
        <button type="button" className="btn btn-teal" onClick={() => setShowAddForm((v) => !v)}>
          {showAddForm ? 'Annuler' : 'Ajouter un nouveau membre'}
        </button>
        <button type="button" className="btn btn-outline" onClick={() => setShowImportForm((v) => !v)}>
          {showImportForm ? 'Annuler' : 'Importer plusieurs membres'}
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleAddSubmit}
          className="field card-dark"
          style={{ display: 'flex', flexDirection: 'column', gap: 13.2, padding: 26.4, marginBottom: 26.4, maxWidth: 440 }}
        >
          {addError && (
            <div style={{ padding: '10px 14px', borderRadius: 16, background: 'var(--coral)', color: 'var(--text-on-dark)', fontSize: 13 }}>
              {addError}
            </div>
          )}
          <div>
            <label>Prénom</label>
            <input name="firstName" required placeholder="Prénom" />
          </div>
          <div>
            <label>Nom (si pertinent)</label>
            <input name="lastName" placeholder="Optionnel" />
          </div>
          <div>
            <label>Email</label>
            <input name="email" required type="email" placeholder="pour l'envoi des identifiants" />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8.8, fontSize: 13 }}>
            <input type="checkbox" name="role" value="ADMIN" style={{ width: 'auto' }} />
            Donner aussi le rôle super admin
          </label>
          <button type="submit" disabled={adding} className="btn btn-amber">
            {adding ? 'Création…' : 'Créer le compte'}
          </button>
        </form>
      )}

      {showImportForm && (
        <form
          onSubmit={handleImportSubmit}
          className="field card-dark"
          style={{ display: 'flex', flexDirection: 'column', gap: 13.2, padding: 26.4, marginBottom: 26.4, maxWidth: 560 }}
        >
          <label>Une personne par ligne : « Prénom Nom, email »</label>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            rows={6}
            placeholder={'Marie Dupont, marie.dupont@example.com\nJean Petit, jean.petit@example.com'}
          />
          <button type="submit" disabled={importing} className="btn btn-amber">
            {importing ? 'Import en cours…' : 'Importer'}
          </button>
          {importResults && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6.6, fontSize: 13 }}>
              {importResults.map((r, i) => (
                <div key={i} style={{ color: r.created ? 'var(--teal)' : 'var(--coral)' }}>
                  {r.created ? '✓' : '✗'} {r.firstName} {r.lastName ?? ''} — {r.email}
                  {!r.created && r.error ? ` (${r.error})` : ''}
                </div>
              ))}
            </div>
          )}
        </form>
      )}

      <h2 style={{ fontSize: 22, marginBottom: 17.6 }}>Comptes ({members?.length ?? 0})</h2>
      {!members ? (
        <p style={{ fontSize: 14, opacity: 0.6 }}>Chargement…</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              {['Nom', 'Identifiant', 'Email', 'Rôle', ''].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: 'left',
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(21,33,61,0.6)',
                    padding: 8.8,
                    borderBottom: '1px solid rgba(21,33,61,0.16)',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td style={{ padding: 8.8, borderBottom: '1px solid rgba(21,33,61,0.08)' }}>{m.fullName}</td>
                <td style={{ padding: 8.8, borderBottom: '1px solid rgba(21,33,61,0.08)' }}>{m.username}</td>
                <td style={{ padding: 8.8, borderBottom: '1px solid rgba(21,33,61,0.08)' }}>{m.email ?? '—'}</td>
                <td style={{ padding: 8.8, borderBottom: '1px solid rgba(21,33,61,0.08)' }}>
                  {m.role === 'ADMIN' ? <span className="badge" style={{ background: 'var(--amber)' }}>ADMIN</span> : 'Membre'}
                </td>
                <td style={{ padding: 8.8, borderBottom: '1px solid rgba(21,33,61,0.08)', textAlign: 'right' }}>
                  {confirmingDeleteId === m.id ? (
                    <span style={{ display: 'inline-flex', gap: 8.8 }}>
                      <button type="button" onClick={() => handleDelete(m.id)} className="btn btn-sm" style={{ background: 'var(--coral)', color: 'var(--text-on-dark)' }}>
                        Confirmer
                      </button>
                      <button type="button" onClick={() => setConfirmingDeleteId(null)} className="btn btn-sm btn-outline">
                        Annuler
                      </button>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmingDeleteId(m.id)}
                      disabled={m.id === currentMember?.id}
                      style={{ background: 'none', border: 'none', color: 'var(--coral)', cursor: m.id === currentMember?.id ? 'default' : 'pointer', textDecoration: 'underline', fontSize: 13, opacity: m.id === currentMember?.id ? 0.4 : 1 }}
                    >
                      Supprimer
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
