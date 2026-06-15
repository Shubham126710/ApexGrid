import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Calendar, Map, Flag, MapPin } from 'lucide-react';

const Races = () => {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.races.getAll().then(data => {
            setRaces(data);
            setLoading(false);
        }).catch(err => {
            console.error("Failed to load races", err);
            setLoading(false);
        });
    }, []);

    const getCountryCode = (country) => {
        const codes = {
            'Bahrain': 'bh', 'Saudi Arabia': 'sa', 'Australia': 'au', 'Japan': 'jp', 'China': 'cn',
            'USA': 'us', 'United States': 'us', 'Italy': 'it', 'Monaco': 'mc', 'Canada': 'ca', 'Spain': 'es',
            'Austria': 'at', 'UK': 'gb', 'United Kingdom': 'gb', 'Hungary': 'hu', 'Belgium': 'be', 'Netherlands': 'nl',
            'Singapore': 'sg', 'Azerbaijan': 'az', 'Mexico': 'mx', 'Brazil': 'br', 'Qatar': 'qa', 'UAE': 'ae', 'United Arab Emirates': 'ae'
        };
        return codes[country] || 'un';
    };

    if (loading) return <div className="p-8 text-textSecondary animate-pulse">Loading Race Calendar...</div>;

    return (
        <div className="p-8 max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-2">Race Calendar</h1>
            <p className="text-textSecondary mb-8">Upcoming events, circuit details, and event logistics.</p>
            
            <div className="space-y-4">
                {races.map(race => {
                    const date = new Date(race.date);
                    return (
                        <div key={race.id} className="bg-[#111] border border-white/5 p-6 rounded-xl flex flex-col md:flex-row gap-6 items-center hover:bg-[#151515] transition-colors">
                            <div className="bg-accent/10 border border-accent/20 w-24 h-24 rounded-lg flex flex-col items-center justify-center text-accent flex-shrink-0">
                                <span className="text-xs uppercase font-bold tracking-widest">{date.toLocaleString('default', { month: 'short' })}</span>
                                <span className="text-3xl font-black">{date.getDate()}</span>
                            </div>
                            
                            <div className="flex-grow">
                                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                                    {race.name}
                                    {date > new Date() && <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs rounded border border-green-500/20 uppercase tracking-wider">Upcoming</span>}
                                </h2>
                                
                                <div className="grid grid-cols-2 gap-4 text-sm text-textSecondary mt-4">
                                    <div className="flex items-center gap-2"><MapPin size={16} className="text-accent"/> {race.circuit?.name}</div>
                                    <div className="flex items-center gap-2">
                                        {race.circuit?.country && (
                                            <img src={`https://flagcdn.com/w20/${getCountryCode(race.circuit.country)}.png`} alt={race.circuit.country} className="w-5 h-auto rounded-sm shadow-sm" />
                                        )}
                                        {race.circuit?.city}, {race.circuit?.country}
                                    </div>
                                    <div className="flex items-center gap-2"><Map size={16} className="text-accent"/> Track Length: {race.circuit?.length} km</div>
                                </div>
                            </div>
                            
                            <div className="flex-shrink-0 flex gap-2">
                                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm rounded transition-colors border border-white/10">View Logistics</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Races;
