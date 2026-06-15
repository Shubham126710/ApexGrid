import { useState, useEffect } from 'react';
import { Database as DbIcon, Table2, HardDrive, Cpu, Activity, Play, Download, Search, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

const Database = () => {
    const [activeTab, setActiveTab] = useState('query');
    const [stats, setStats] = useState({
        storageUsed: '0 MB',
        activeConns: 0,
        totalTables: 0,
        tables: [],
        queryLoad: '0%'
    });
    const [queryInput, setQueryInput] = useState(`SELECT\n  "name" AS team_name,\n  "nationality",\n  "baseCity"\nFROM "Team"\nLIMIT 10;`);
    const [queryResults, setQueryResults] = useState([]);
    const [queryError, setQueryError] = useState(null);
    const [isExecuting, setIsExecuting] = useState(false);
    const [searchTable, setSearchTable] = useState('');

    useEffect(() => {
        api.database.getStats().then(data => {
            setStats(data);
        }).catch(err => console.error('Failed to load DB stats', err));
    }, []);

    const handleRunQuery = async () => {
        if (!queryInput.trim()) return;
        setIsExecuting(true);
        setQueryError(null);
        try {
            const data = await api.database.runQuery(queryInput);
            setQueryResults(data.results || []);
            setActiveTab('results');
        } catch (err) {
            setQueryError(err.message || 'Execution failed');
            setQueryResults([]);
            setActiveTab('results');
        } finally {
            setIsExecuting(false);
        }
    };

    const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            handleRunQuery();
        }
    };

    const filteredTables = stats.tables.filter(t => t.toLowerCase().includes(searchTable.toLowerCase()));
    const resultColumns = queryResults.length > 0 ? Object.keys(queryResults[0]) : [];

    return (
        <div className="p-8 max-w-7xl mx-auto w-full h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <DbIcon className="text-accent" size={32} />
                        Database Explorer
                    </h1>
                    <p className="text-textSecondary">Direct access to the ApexGrid PostgreSQL telemetry and operations database.</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-surfaceHighlight px-4 py-2 rounded-lg border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-textSecondary">Connected to <span className="text-white font-mono">prod-telemetry-db</span></span>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-surface border border-white/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-textSecondary mb-2"><HardDrive size={16} /> Storage Used</div>
                    <div className="text-2xl font-bold">{stats.storageUsed}</div>
                </div>
                <div className="bg-surface border border-white/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-textSecondary mb-2"><Cpu size={16} /> Query Load</div>
                    <div className="text-2xl font-bold text-yellow-500">{stats.queryLoad}</div>
                </div>
                <div className="bg-surface border border-white/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-textSecondary mb-2"><Activity size={16} /> Active Conns</div>
                    <div className="text-2xl font-bold">{stats.activeConns}</div>
                </div>
                <div className="bg-surface border border-white/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-textSecondary mb-2"><Table2 size={16} /> Total Tables</div>
                    <div className="text-2xl font-bold">{stats.totalTables}</div>
                </div>
            </div>

            <div className="flex gap-6 flex-1 min-h-0">
                {/* Schema Sidebar */}
                <div className="w-64 flex flex-col bg-surface border border-white/5 rounded-xl overflow-hidden">
                    <div className="p-3 border-b border-white/5 bg-surfaceHighlight/50">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2 text-textSecondary" size={14} />
                            <input 
                                type="text" 
                                placeholder="Filter tables..." 
                                value={searchTable}
                                onChange={(e) => setSearchTable(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded px-8 py-1.5 text-sm text-white focus:outline-none focus:border-accent" 
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        <div className="text-xs font-bold text-textSecondary uppercase px-2 py-2">public schema</div>
                        {filteredTables.map(table => (
                            <button key={table} onClick={() => setQueryInput(`SELECT * FROM "${table}" LIMIT 50;`)} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-left hover:bg-surfaceHighlight rounded text-textSecondary hover:text-white transition-colors">
                                <Table2 size={14} />
                                {table}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Query Area */}
                <div className="flex-1 flex flex-col bg-surface border border-white/5 rounded-xl overflow-hidden">
                    <div className="flex border-b border-white/5 bg-surfaceHighlight/50">
                        <button 
                            className={`px-4 py-2.5 text-sm font-medium border-b-2 ${activeTab === 'query' ? 'border-accent text-white' : 'border-transparent text-textSecondary hover:text-white'}`}
                            onClick={() => setActiveTab('query')}
                        >SQL Editor</button>
                        <button 
                            className={`px-4 py-2.5 text-sm font-medium border-b-2 ${activeTab === 'results' ? 'border-accent text-white' : 'border-transparent text-textSecondary hover:text-white'}`}
                            onClick={() => setActiveTab('results')}
                        >Results {queryResults.length > 0 ? `(${queryResults.length} rows)` : ''}</button>
                    </div>

                    <div className="flex-1 p-0 relative flex flex-col overflow-hidden">
                        {activeTab === 'query' && (
                            <textarea 
                                value={queryInput}
                                onChange={(e) => setQueryInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                spellCheck="false"
                                className="flex-1 bg-[#0a0a0a] p-4 font-mono text-sm leading-relaxed text-white resize-none outline-none focus:ring-1 focus:ring-accent inset-0 w-full"
                            />
                        )}
                        
                        {activeTab === 'results' && (
                            <div className="flex-1 bg-[#0a0a0a] overflow-auto">
                                {queryError ? (
                                    <div className="p-6 text-red-400 flex flex-col items-center justify-center h-full gap-4">
                                        <AlertCircle size={48} className="opacity-50" />
                                        <p className="font-mono text-sm">{queryError}</p>
                                    </div>
                                ) : queryResults.length > 0 ? (
                                    <table className="w-full text-left text-sm whitespace-nowrap">
                                        <thead className="bg-surfaceHighlight/50 sticky top-0 border-b border-white/10 z-10">
                                            <tr>
                                                {resultColumns.map(col => (
                                                    <th key={col} className="px-4 py-2 font-medium text-textSecondary">{col}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {queryResults.map((row, i) => (
                                                <tr key={i} className="hover:bg-white/5">
                                                    {resultColumns.map(col => (
                                                        <td key={col} className="px-4 py-2 font-mono text-textSecondary">
                                                            {row[col] !== null ? String(row[col]) : <span className="text-white/20 italic">NULL</span>}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-6 text-textSecondary text-center flex items-center justify-center h-full">
                                        No results. Run a query to see output.
                                    </div>
                                )}
                            </div>
                        )}
                        
                        <div className="h-14 border-t border-white/5 bg-surfaceHighlight/30 flex items-center justify-between px-4 shrink-0">
                            <div className="text-xs text-textSecondary">Ctrl+Enter to execute</div>
                            <div className="flex gap-2">
                                <button className="btn-primary px-4 py-1.5 text-sm flex items-center gap-2 disabled:opacity-50" onClick={handleRunQuery} disabled={isExecuting}>
                                    <Play size={14} fill="currentColor" /> {isExecuting ? 'Running...' : 'Run Query'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Database;
