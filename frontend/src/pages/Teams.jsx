import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Users, MapPin, Flag } from 'lucide-react';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.teams.getAll().then(data => {
            setTeams(data);
            setLoading(false);
        }).catch(err => {
            console.error("Failed to load teams", err);
            setLoading(false);
        });
    }, []);

    const getTeamLogo = (teamName) => {
        const name = teamName.toLowerCase();
        if (name.includes('red bull')) return '/red_bull_logo.png';
        if (name.includes('mercedes')) return '/Mercedes_Logo.png';
        if (name.includes('ferrari')) return '/ferrari_logo.png';
        if (name.includes('mclaren')) return '/McLaren_logo.svg';
        if (name.includes('aston martin')) return '/aston_martin_logo.svg';
        if (name.includes('alpine')) return '/alpine_logo.png';
        if (name.includes('williams')) return '/williams_logo.svg';
        if (name.includes('vcarb') || name.includes('racing bulls')) return '/VCARB_logo.png';
        if (name.includes('haas')) return '/haas_logo.png';
        if (name.includes('audi') || name.includes('sauber')) return '/audi_logo.svg';
        if (name.includes('cadillac') || name.includes('andretti')) return '/cadillac_logo.png';
        return null;
    };

    const getTeamEstYear = (teamName) => {
        const name = teamName.toLowerCase();
        if (name.includes('ferrari')) return 1950;
        if (name.includes('mclaren')) return 1966;
        if (name.includes('williams')) return 1977;
        if (name.includes('red bull')) return 2005;
        if (name.includes('mercedes')) return 2010;
        if (name.includes('haas')) return 2016;
        if (name.includes('aston martin')) return 2021;
        if (name.includes('alpine')) return 2021;
        if (name.includes('vcarb') || name.includes('racing bulls')) return 2024;
        if (name.includes('audi') || name.includes('sauber')) return 1993; // Using Sauber's original entry
        if (name.includes('cadillac') || name.includes('andretti')) return 2026;
        return new Date(team.createdAt).getFullYear();
    };

    if (loading) return <div className="p-8 text-textSecondary animate-pulse">Loading Teams Database...</div>;

    return (
        <div className="p-8 max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-2">Racing Teams</h1>
            <p className="text-textSecondary mb-8">Manage active constructor entities, base operations, and personnel.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {teams.map(team => (
                    <div key={team.id} className="bg-[#111] border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-accent/30 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-[100px] -z-10 group-hover:bg-accent/10 transition-colors"></div>
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-bold">{team.name}</h2>
                            {getTeamLogo(team.name) && (
                                <img src={getTeamLogo(team.name)} alt={team.name} className="h-8 object-contain" />
                            )}
                        </div>
                        
                        <div className="flex gap-6 mb-6 text-sm text-textSecondary">
                            <div className="flex items-center gap-2"><Flag size={16} className="text-accent"/> {team.nationality}</div>
                            <div className="flex items-center gap-2"><MapPin size={16} className="text-accent"/> {team.baseCity}</div>
                        </div>
                        
                        <div className="bg-black/30 rounded-lg p-4 mb-4">
                            <h3 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2"><Users size={16}/> Active Drivers</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {team.drivers?.map(driver => (
                                    <div key={driver.id} className="bg-white/5 px-3 py-2 rounded text-sm flex justify-between items-center">
                                        <span>{driver.firstName} {driver.lastName}</span>
                                        <span className="font-mono text-accent font-bold">{driver.number}</span>
                                    </div>
                                ))}
                                {(!team.drivers || team.drivers.length === 0) && <div className="text-xs text-textSecondary">No drivers registered.</div>}
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-textSecondary mt-4 pt-4 border-t border-white/5">
                            <span>Staff Headcount: {team.staff?.length || 0}</span>
                            <span>Est. {getTeamEstYear(team.name)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teams;
