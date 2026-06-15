import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Truck, Plane, MapPin, ArrowRight } from 'lucide-react';

const Logistics = () => {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.shipments.getAll().then(data => {
            setShipments(data);
            setLoading(false);
        }).catch(err => {
            console.error("Failed to load shipments", err);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="p-8 text-textSecondary animate-pulse">Loading Global Logistics...</div>;

    return (
        <div className="p-8 max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-2">Global Logistics</h1>
            <p className="text-textSecondary mb-8">Monitor freight, chassis transport, and personnel travel worldwide.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shipments.map(ship => (
                    <div key={ship.id} className="bg-[#111] border border-white/5 rounded-xl p-5 hover:border-white/20 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-accent/10 text-accent rounded-lg">
                                {ship.description.toLowerCase().includes('freight') ? <Plane size={20}/> : <Truck size={20}/>}
                            </div>
                            <span className={`text-xs px-2 py-1 rounded border ${
                                ship.status === 'Delivered' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                                ship.status === 'In Transit' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                                'bg-orange-500/10 text-orange-500 border-orange-500/20'
                            }`}>
                                {ship.status}
                            </span>
                        </div>
                        
                        <h3 className="font-bold text-lg mb-4">{ship.description}</h3>
                        
                        <div className="bg-black/30 rounded-lg p-3 text-sm flex items-center justify-between mb-4 border border-white/5">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-textSecondary uppercase tracking-wider">Origin</span>
                                <span className="flex items-center gap-1"><MapPin size={12} className="text-accent"/> {ship.origin}</span>
                            </div>
                            <ArrowRight size={16} className="text-white/20"/>
                            <div className="flex flex-col gap-1 text-right">
                                <span className="text-[10px] text-textSecondary uppercase tracking-wider">Destination</span>
                                <span className="flex items-center justify-end gap-1"><MapPin size={12} className="text-accent"/> {ship.destination}</span>
                            </div>
                        </div>
                        
                        <div className="text-xs text-textSecondary flex justify-between items-center">
                            <span>Team: <strong className="text-white font-normal">{ship.team?.name}</strong></span>
                            {ship.race && <span>Event: <strong className="text-white font-normal">{ship.race.name}</strong></span>}
                        </div>
                    </div>
                ))}
            </div>
            {shipments.length === 0 && <div className="text-center text-textSecondary mt-12">No active shipments.</div>}
        </div>
    );
};

export default Logistics;
