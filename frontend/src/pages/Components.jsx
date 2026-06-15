import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Settings, ShieldAlert, CheckCircle2, Box } from 'lucide-react';

const Components = () => {
    const [components, setComponents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.components.getAll().then(data => {
            setComponents(data);
            setLoading(false);
        }).catch(err => {
            console.error("Failed to load components", err);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="p-8 text-textSecondary animate-pulse">Loading Component Inventory...</div>;

    const getStatusColor = (status) => {
        switch(status) {
            case 'Active': return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'Damaged': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'Spare': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
            default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'Active': return <CheckCircle2 size={14}/>;
            case 'Damaged': return <ShieldAlert size={14}/>;
            case 'Spare': return <Box size={14}/>;
            default: return <Settings size={14}/>;
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto w-full">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Component Inventory</h1>
                    <p className="text-textSecondary">Track lifecycle and status of engines, gearboxes, and aero parts.</p>
                </div>
                <button className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded font-medium shadow-[0_0_15px_rgba(225,6,0,0.3)] transition-all">Add Component</button>
            </div>
            
            <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-textSecondary uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-6 py-4 font-medium">ID</th>
                            <th className="px-6 py-4 font-medium">Type</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Assigned Team</th>
                            <th className="px-6 py-4 font-medium">Logged Date</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {components.map(comp => (
                            <tr key={comp.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4 font-mono text-textSecondary">#{comp.id.toString().padStart(4, '0')}</td>
                                <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                    <Settings size={16} className="text-accent"/>
                                    {comp.type}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full border text-xs flex items-center gap-1.5 w-fit ${getStatusColor(comp.status)}`}>
                                        {getStatusIcon(comp.status)}
                                        {comp.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-textSecondary">{comp.team?.name || 'Unassigned'}</td>
                                <td className="px-6 py-4 text-textSecondary">{new Date(comp.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-accent hover:text-white transition-colors text-xs uppercase tracking-wider font-bold">Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {components.length === 0 && <div className="p-8 text-center text-textSecondary">No components found in inventory.</div>}
            </div>
        </div>
    );
};

export default Components;
