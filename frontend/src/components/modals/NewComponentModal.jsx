import { useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../../services/api';

const NewComponentModal = ({ isOpen, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        type: 'Engine',
        status: 'Active'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            await api.components.create({
                ...formData,
                teamId: user.teamId
            });
            onRefresh && onRefresh();
            onClose();
            // Optional: reset form
            setFormData({ type: 'Engine', status: 'Active' });
        } catch (err) {
            console.error("Failed to create component", err);
            alert("Failed to create component");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#121212] border border-border rounded-xl w-full max-w-md shadow-2xl">
                <div className="flex justify-between items-center p-6 border-b border-border">
                    <h2 className="text-xl font-bold text-white">New Component</h2>
                    <button onClick={onClose} className="text-textSecondary hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-textSecondary uppercase tracking-wider block">Component Type</label>
                        <select 
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        >
                            <option value="Engine">Engine</option>
                            <option value="Gearbox">Gearbox</option>
                            <option value="Front Wing">Front Wing</option>
                            <option value="Rear Wing">Rear Wing</option>
                            <option value="Chassis">Chassis</option>
                            <option value="Tires">Tires</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-textSecondary uppercase tracking-wider block">Initial Status</label>
                        <select 
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        >
                            <option value="Active">Active</option>
                            <option value="Spare">Spare</option>
                            <option value="Damaged">Damaged</option>
                        </select>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-textSecondary hover:text-white transition-colors">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="bg-accent hover:bg-[#c90500] text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
                            {isSubmitting ? 'Adding...' : 'Add Component'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewComponentModal;
