import { useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../../services/api';

const AddEventModal = ({ isOpen, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        circuitId: 1 // Default or we could fetch circuits
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.races.create({
                ...formData,
                date: new Date(formData.date).toISOString(),
                circuitId: parseInt(formData.circuitId)
            });
            onRefresh && onRefresh();
            onClose();
            setFormData({ name: '', date: '', circuitId: 1 });
        } catch (err) {
            console.error("Failed to add event", err);
            alert("Failed to add event");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#121212] border border-border rounded-xl w-full max-w-md shadow-2xl">
                <div className="flex justify-between items-center p-6 border-b border-border">
                    <h2 className="text-xl font-bold text-white">Add Event</h2>
                    <button onClick={onClose} className="text-textSecondary hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-textSecondary uppercase tracking-wider block">Event Name</label>
                        <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-white/20"
                            placeholder="Grand Prix of..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-textSecondary uppercase tracking-wider block">Date</label>
                        <input 
                            type="datetime-local" 
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-textSecondary uppercase tracking-wider block">Circuit ID</label>
                        <input 
                            type="number" 
                            required
                            min="1"
                            value={formData.circuitId}
                            onChange={(e) => setFormData({...formData, circuitId: e.target.value})}
                            className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-textSecondary hover:text-white transition-colors">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="bg-accent hover:bg-[#c90500] text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
                            {isSubmitting ? 'Adding...' : 'Add Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEventModal;
