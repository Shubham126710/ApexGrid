import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Users, Truck, Package, Activity, Calendar } from 'lucide-react';

const Dashboard = () => {
    const [data, setData] = useState({ teams: 0, components: 0, shipments: 0, expenses: 0, races: [] });
    const [settings, setSettings] = useState({ autoReroute: true, criticalAlerts: false });
    const [loading, setLoading] = useState(true);

    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        // Generate contextual greeting
        try {
            const userStr = localStorage.getItem('user');
            const user = userStr ? JSON.parse(userStr) : null;
            const firstName = user?.name ? user.name.split(' ')[0] : 'Engineer';

            const hour = new Date().getHours();
            let timeOfDay = 'morning';
            if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
            else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
            else if (hour >= 21 || hour < 5) timeOfDay = 'night';

            const greetings = [
                `Welcome back, ${firstName}!`,
                `Ready to start, ${firstName}?`,
                `Good ${timeOfDay}, ${firstName}!`,
                `Let's tackle down some work, ${firstName}.`,
                `Hello ${firstName}, the grid awaits.`,
                `Hope you're having a great ${timeOfDay}, ${firstName}.`,
                `Glad to see you back, ${firstName}.`,
                `All systems go, ${firstName}.`,
                `Let's push for pole, ${firstName}!`,
                `Telemetry is online, ${firstName}.`,
                `Greetings ${firstName}, ready for the session?`,
                `Another day, another race, ${firstName}.`,
                `Have a great ${timeOfDay}, ${firstName}!`
            ];

            setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
        } catch (e) {
            setGreeting('Welcome back, Engineer!');
        }

        const fetchDashboardData = async () => {
            try {
                const [teams, components, shipments, expenses, races, userSettings] = await Promise.all([
                    api.teams.getAll(),
                    api.components.getAll(),
                    api.shipments.getAll(),
                    api.expenses.getAll(),
                    api.races.getAll(),
                    api.settings.get().catch(() => ({ autoReroute: true, criticalAlerts: false }))
                ]);
                setData({
                    teams: teams.length,
                    components: components.length,
                    shipments: shipments.length,
                    expenses: expenses.reduce((acc, curr) => acc + curr.amount, 0),
                    races: races.slice(0, 3) // Upcoming 3
                });
                setSettings({
                    autoReroute: userSettings.autoReroute || false,
                    criticalAlerts: userSettings.criticalAlerts || false
                });
                setLoading(false);
            } catch (err) {
                console.error("Failed to load dashboard data", err);
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const toggleSetting = async (key) => {
        const newValue = !settings[key];
        setSettings(prev => ({ ...prev, [key]: newValue }));
        try {
            await api.settings.update({ ...settings, [key]: newValue });
        } catch (err) {
            console.error("Failed to update setting", err);
            // Revert on fail
            setSettings(prev => ({ ...prev, [key]: !newValue }));
        }
    };

    const formatCurrency = (amount) => {
        if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
        if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
        return `$${amount}`;
    };

    const getCountryCode = (country) => {
        const codes = {
            'Bahrain': 'bh', 'Saudi Arabia': 'sa', 'Australia': 'au', 'Japan': 'jp', 'China': 'cn',
            'USA': 'us', 'United States': 'us', 'Italy': 'it', 'Monaco': 'mc', 'Canada': 'ca', 'Spain': 'es',
            'Austria': 'at', 'UK': 'gb', 'United Kingdom': 'gb', 'Hungary': 'hu', 'Belgium': 'be', 'Netherlands': 'nl',
            'Singapore': 'sg', 'Azerbaijan': 'az', 'Mexico': 'mx', 'Brazil': 'br', 'Qatar': 'qa', 'UAE': 'ae', 'United Arab Emirates': 'ae'
        };
        return codes[country] || 'un';
    };

    if (loading) return <div className="p-8 text-textSecondary animate-pulse">Loading Telemetry Data...</div>;

    const stats = [
        { title: 'YTD Spend', value: formatCurrency(data.expenses), icon: <Activity size={14}/>, delta: '+12%', points: "0,24 12,22 24,18 36,20 48,12 60,14 72,10 84,6 96,8" },
        { title: 'Active Teams', value: data.teams, icon: <Users size={14}/>, delta: 'Stable', points: "0,16 12,18 24,14 36,16 48,10 60,12 72,8 84,4 96,6" },
        { title: 'Components', value: data.components, icon: <Package size={14}/>, delta: '+5%', points: "0,20 12,22 24,16 36,14 48,16 60,10 72,12 84,8 96,6" },
        { title: 'Shipments', value: data.shipments, icon: <Truck size={14}/>, delta: 'Active', points: "0,12 12,14 24,10 36,12 48,8 60,10 72,6 84,4 96,2" },
    ];

    return (
        <div className="p-8 w-full max-w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2 font-display text-white">{greeting}</h1>
                    <p className="text-textSecondary">Oversee operations and track your telemetry.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <article key={i} className="halo-stat">
                      <header className="halo-stat-head">
                        <span className="halo-stat-label">{stat.title}</span>
                        <div className="halo-stat-icon">
                          {stat.icon}
                        </div>
                      </header>
                      <p className="halo-stat-value">{stat.value}</p>
                      <footer className="halo-stat-meta">
                        <span className="halo-stat-delta">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M7 14l5-5 5 5"></path>
                          </svg>
                          {stat.delta}
                        </span>
                        <svg
                          className="halo-stat-spark"
                          viewBox="0 0 96 32"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points={stat.points}></polyline>
                        </svg>
                      </footer>
                    </article>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                <div className="lg:col-span-2 xl:col-span-3 bg-[#121212] border border-border p-6 rounded-[16px]">
                    <h3 className="font-semibold mb-6 text-sm uppercase tracking-wider text-textSecondary flex items-center gap-2"><Activity className="text-accent" size={16}/> Telemetry Data</h3>
                    <div className="h-72 rounded flex items-center justify-center overflow-hidden relative group">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                        
                        {/* Placeholder waves for chart */}
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                          <path d="M0,50 Q25,20 50,50 T100,50" fill="none" stroke="#e10600" strokeWidth="0.5" opacity="0.8" />
                          <path d="M0,60 Q25,90 50,60 T100,60" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.6" />
                          <path d="M0,40 Q25,10 50,40 T100,40" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.7" />
                        </svg>

                        <div className="bg-[#1a1a24] border border-border rounded-lg p-3 z-10 shadow-2xl flex flex-col gap-2">
                          <div className="text-xs font-bold text-white mb-1">Live Feed</div>
                          <div className="flex items-center gap-2 text-xs"><span className="w-2 h-2 rounded-full bg-accent"></span> Peak: 323 km/h</div>
                          <div className="flex items-center gap-2 text-xs"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Avg: 245 km/h</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <article className="penumbra-notice" role="status" aria-live="polite">
                      <div className="penumbra-notice__icon" aria-hidden="true">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
                          <path
                            d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
                          ></path>
                        </svg>
                      </div>
                      <div className="penumbra-notice__body">
                        <p className="penumbra-notice__eyebrow">Urgent</p>
                        <h3 className="penumbra-notice__title">Shipment <em>Delayed</em></h3>
                        <p className="penumbra-notice__text">
                          Freight to Bahrain is currently experiencing delays due to customs clearance.
                        </p>
                        <div className="penumbra-notice__actions">
                          <button
                            className="penumbra-notice__action penumbra-notice__action--primary"
                            type="button"
                          >
                            Resolve
                          </button>
                          <button className="penumbra-notice__action" type="button">Dismiss</button>
                        </div>
                      </div>
                    </article>

                    <div className="voltura-toggle-card">
                      <div className="voltura-toggle-row">
                        <div className="voltura-toggle-row__meta">
                          <span className="voltura-toggle-row__eyebrow">Logistics</span>
                          <span className="voltura-toggle-row__title">Auto-Reroute</span>
                          <span className="voltura-toggle-row__sub"
                            >Switch carriers if delay &gt; 24h</span>
                        </div>
                        <label className="voltura-toggle">
                          <input type="checkbox" className="voltura-toggle__input" checked={settings.autoReroute} onChange={() => toggleSetting('autoReroute')} />
                          <span className="voltura-toggle__track">
                            <span className="voltura-toggle__thumb"></span>
                          </span>
                        </label>
                      </div>
                      <div className="voltura-toggle-divider"></div>
                      <div className="voltura-toggle-row">
                        <div className="voltura-toggle-row__meta">
                          <span className="voltura-toggle-row__eyebrow">Telemetry</span>
                          <span className="voltura-toggle-row__title">Critical Alerts</span>
                          <span className="voltura-toggle-row__sub"
                            >Notify when engine heat exceeds 90%</span
                          >
                        </div>
                        <label className="voltura-toggle">
                          <input type="checkbox" className="voltura-toggle__input" checked={settings.criticalAlerts} onChange={() => toggleSetting('criticalAlerts')} />
                          <span className="voltura-toggle__track">
                            <span className="voltura-toggle__thumb"></span>
                          </span>
                        </label>
                      </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#121212] border border-border p-6 rounded-[16px]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-textSecondary flex items-center gap-2"><Calendar className="text-accent" size={16}/> Upcoming Events</h3>
                </div>
                <div className="space-y-4">
                    {data.races.map(race => {
                        const date = new Date(race.date);
                        return (
                            <div key={race.id} className="flex gap-6 items-center p-4 hover:bg-surfaceHighlight rounded-xl border border-transparent hover:border-border transition-all">
                                <div className="flex flex-col items-center justify-center bg-[#0a0a0a] border border-border w-14 h-14 rounded-lg flex-shrink-0 shadow-inner">
                                    <span className="text-[10px] text-accent uppercase font-bold tracking-widest">{date.toLocaleString('default', { month: 'short' })}</span>
                                    <span className="font-bold text-lg">{date.getDate()}</span>
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                    <div>
                                        <div className="font-bold text-sm text-white mb-1">{race.name}</div>
                                        <div className="text-xs text-textSecondary">{race.circuit?.name}</div>
                                    </div>
                                    <div className="hidden md:flex flex-col text-xs text-textSecondary justify-center">
                                        <div className="mb-1">Location</div>
                                        <div className="text-white flex items-center gap-2">
                                            {race.circuit?.country && (
                                                <img src={`https://flagcdn.com/w20/${getCountryCode(race.circuit.country)}.png`} alt={race.circuit.country} className="w-5 h-auto rounded-sm shadow-sm" />
                                            )}
                                            {race.circuit?.city}, {race.circuit?.country}
                                        </div>
                                    </div>
                                    <div className="hidden md:flex justify-end">
                                        <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 text-xs rounded-full uppercase font-bold tracking-wider">Scheduled</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {data.races.length === 0 && <div className="text-sm text-textSecondary text-center py-8">No upcoming events</div>}
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
