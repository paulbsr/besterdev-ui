// import { useEffect, useRef, useState } from 'react';
// import { subscribe } from './ConsoleCapture';

// export default function ConsoleFrame() {
//   const [logs, setLogs] = useState([]);
//   const bodyRef = useRef(null);

//   // subscribe to console logs
//   useEffect(() => {
//     const unsubscribe = subscribe(log => {
//       setLogs(prev => [...prev, log].slice(-200));
//     });
//     return unsubscribe;
//   }, []);

//   // auto-scroll to latest entry
//   useEffect(() => {
//     if (bodyRef.current) {
//       bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
//     }
//   }, [logs]);

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>Console Output</div>
//       <div style={styles.body} ref={bodyRef}>
//         {logs.map((l, i) => (
//           <div key={i} style={{ ...styles.line, ...styles[l.type] }}>
//             [{l.type}] {l.message}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     border: '1px solid #444',
//     borderRadius: 6,
//     background: '#ffffff',
//     color: '#eee',
//     fontFamily: 'Candara',
//     height: 150,
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   body: {
//     padding: 10,
//     overflowY: 'auto',
//     flex: 1,
//   },
//   line: {
//     marginBottom: 4,
//     whiteSpace: 'pre-wrap',
//   },
//   log: { color: '#000' },
//   warn: { color: '#f0ad4e' },
//   error: { color: '#ff5c5c' },
// };


import { useEffect, useRef, useState } from 'react';
import { subscribe } from './ConsoleCapture';

export default function ConsoleFrame() {
  const [logs, setLogs] = useState([]);
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  // Subscribe to console logs
  useEffect(() => {
    const unsubscribe = subscribe(log => {
      setLogs(prev => [...prev, log].slice(-200));
    });
    return unsubscribe;
  }, []);

  // Auto-scroll when open
  useEffect(() => {
    if (open && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs, open]);

  // Collapsed state → discreet icon only
  if (!open) {
    return (
      <div style={styles.fab} onClick={() => setOpen(true)} title="Show console">
        🖥️
      </div>
    );
  }

  // Expanded console
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span>Console Output</span>
        <button style={styles.closeBtn} onClick={() => setOpen(false)}>
          ✕
        </button>
      </div>

      <div style={styles.body} ref={bodyRef}>
        {logs.map((l, i) => (
          <div key={i} style={{ ...styles.line, ...styles[l.type] }}>
            [{l.type}] {l.message}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  /* collapsed icon */
  fab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: '#333',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: 18,
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    zIndex: 9999,
  },

  /* expanded panel */
  container: {
    position: 'fixed',
    bottom: 16,
    right: 16,
    width: 420,
    height: 180,
    border: '1px solid #444',
    borderRadius: 6,
    background: '#fff',
    fontFamily: 'Candara',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9999,
  },
  header: {
    padding: '6px 10px',
    background: '#222',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 13,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: 14,
  },
  body: {
    padding: 8,
    overflowY: 'auto',
    flex: 1,
    background: '#fafafa',
  },
  line: {
    marginBottom: 4,
    whiteSpace: 'pre-wrap',
    fontSize: 12,
  },
  log: { color: '#000' },
  warn: { color: '#f0ad4e' },
  error: { color: '#ff5c5c' },
};