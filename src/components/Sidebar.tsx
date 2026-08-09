import { useEffect, useState } from 'react';
import { fetchNews, type NewsItem } from '../api/news';
import { ACCENT_PAIR } from '../constants';

export function Sidebar() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  return (
    <aside style={{ width: 300, flex: 'none', padding: '35.2px 26.4px', position: 'sticky', top: 66, alignSelf: 'flex-start' }}>
      <h6 className="eyebrow" style={{ color: 'var(--teal)', fontSize: 12 }}>Actualités</h6>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 13.2 }}>
        {news.map((item, i) => (
          <div key={item.id} className="card-dark" style={{ padding: 17.6, borderRadius: 24 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: ACCENT_PAIR[i % 2], marginBottom: 6 }}>
              {item.itemDate}
            </div>
            <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 14, lineHeight: 1.3 }}>{item.title}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
