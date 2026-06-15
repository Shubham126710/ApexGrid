import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.expenses.getAll().then(data => {
            setExpenses(data);
            setLoading(false);
        }).catch(err => {
            console.error("Failed to load expenses", err);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="p-8 text-textSecondary animate-pulse">Loading Financial Ledger...</div>;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
    };

    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="p-8 max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-2">Financial Ledger</h1>
            <p className="text-textSecondary mb-8">Track constructor spending, FIA cost cap compliance, and logistics costs.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#111] border border-white/5 rounded-xl p-6">
                    <div className="text-textSecondary text-sm mb-2 flex items-center gap-2"><TrendingUp size={16}/> Total YTD Spend</div>
                    <div className="text-4xl font-mono text-white tracking-tight">{formatCurrency(totalSpent)}</div>
                </div>
                <div className="bg-[#111] border border-accent/20 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-1 bg-accent"></div>
                    <div className="text-textSecondary text-sm mb-2 flex items-center gap-2 text-accent"><AlertCircle size={16}/> Cost Cap Remaining</div>
                    <div className="text-4xl font-mono text-white tracking-tight">{formatCurrency(135000000 - totalSpent)}</div>
                </div>
            </div>
            
            <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-textSecondary uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Description</th>
                            <th className="px-6 py-4 font-medium">Category</th>
                            <th className="px-6 py-4 font-medium">Team</th>
                            <th className="px-6 py-4 font-medium text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {expenses.map(exp => (
                            <tr key={exp.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4 text-textSecondary">{new Date(exp.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 font-medium text-white">{exp.description}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded bg-white/5 text-xs text-textSecondary border border-white/10">{exp.category}</span>
                                </td>
                                <td className="px-6 py-4 text-textSecondary">{exp.team?.name}</td>
                                <td className="px-6 py-4 text-right font-mono font-medium text-accent">{formatCurrency(exp.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {expenses.length === 0 && <div className="p-8 text-center text-textSecondary">No expense records found.</div>}
            </div>
        </div>
    );
};

export default Expenses;
