import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Store, User, Mail, Phone, Lock, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useSignupMutation } from '../store/api/storeAccountApi';
import { setCredentials } from '../store/slices/authSlice';

const STORE_TYPES = [
    { value: 'GYM', label: 'Gym' },
    { value: 'EV', label: 'EV Charging' },
    { value: 'WIFI', label: 'WiFi Hotspot' },
    { value: 'PARKING', label: 'Parking' },
];

const STEP_FIELDS = {
    1: [
        { name: 'email', type: 'email', label: 'Email Address', placeholder: 'store@company.com', icon: Mail },
        { name: 'phone', type: 'tel', label: 'Phone Number', placeholder: '+1234567890', icon: Phone },
        { name: 'password', type: 'password', label: 'Password', placeholder: '••••••••', icon: Lock },
    ],
    2: [
        { name: 'ownerName', type: 'text', label: 'Owner Name', placeholder: 'John Doe', icon: User },
        { name: 'storeName', type: 'text', label: 'Store Name', placeholder: 'FitZone Gym', icon: Store },
        { name: 'address', type: 'text', label: 'Address', placeholder: '123 Main St, City', icon: MapPin },
    ],
};

const STEP_LABELS = { 1: 'Account Credentials', 2: 'Store Details' };

const Signup = ({ onToggle, setIsLoggedIn }) => {
    const [step, setStep] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [formData, setFormData] = useState({
        storeName: '', ownerName: '', email: '', phone: '', password: '',
        storeType: 'GYM', location: { address: '', lat: 0, lng: 0 }
    });
    
    const [signup, { isLoading, error }] = useSignupMutation();
    const dispatch = useDispatch();

    const currentFields = STEP_FIELDS[step];
    const animationClass = isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100';

    const getValue = (name) => name === 'address' ? formData.location.address : formData[name];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => name === 'address' 
            ? { ...prev, location: { ...prev.location, address: value } }
            : { ...prev, [name]: value }
        );
    };

    const animateStep = (nextStep) => {
        setIsAnimating(true);
        setTimeout(() => {
            setStep(nextStep);
            setIsAnimating(false);
        }, 200);
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (formData.email && formData.phone && formData.password) {
            animateStep(2);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const result = await signup(formData).unwrap();
            dispatch(setCredentials({ store: result }));
            setIsLoggedIn?.(true);
        } catch (err) {
            console.error('Signup failed:', err);
        }
    };

    const renderFields = () => currentFields.map(({ name, type, label, placeholder, icon: Icon }) => (
        <Input
            key={name}
            id={name}
            name={name}
            type={type}
            label={label}
            placeholder={placeholder}
            required
            value={getValue(name)}
            onChange={handleChange}
            leftIcon={<Icon className="w-5 h-5" />}
        />
    ));

    const renderError = () => error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium animate-pulse">
            {error.data?.message || 'Signup failed. Please check your details.'}
        </div>
    );

    return (
        <div className="w-full overflow-hidden">
            <div className="text-center mb-8">
                <h1 className="text-gray-900 font-bold text-3xl mb-2 tracking-tight">Create Store Account</h1>
                <p className="text-gray-500 text-sm">Register your business on PulsePay</p>
                
                <div className="flex items-center justify-center gap-3 mt-6">
                    {[1, 2].map((s, i) => (
                        <div key={s} className="flex items-center gap-3">
                            {i > 0 && <div className={`w-12 h-1 rounded-full transition-all duration-300 ${step >= s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all duration-300 ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                {s}
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-400 mt-3">{STEP_LABELS[step]}</p>
            </div>

            <form 
                className={`space-y-4 transition-all duration-200 ease-out ${animationClass}`}
                onSubmit={step === 1 ? handleNext : handleSignup}
            >
                {renderFields()}

                {step === 2 && (
                    <div className="space-y-1.5">
                        <label htmlFor="storeType" className="text-sm font-semibold text-gray-700 ml-1">Store Type</label>
                        <select
                            id="storeType"
                            name="storeType"
                            value={formData.storeType}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 font-medium shadow-sm"
                        >
                            {STORE_TYPES.map(({ value, label }) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                )}

                {renderError()}

                {step === 1 ? (
                    <Button type="submit" variant="primary" className="w-full py-3 text-base shadow-xl shadow-blue-600/10 mt-2 flex items-center justify-center gap-2">
                        Next <ArrowRight className="w-4 h-4" />
                    </Button>
                ) : (
                    <div className="flex gap-3 mt-2">
                        <Button type="button" variant="secondary" onClick={() => animateStep(1)} className="py-3 px-4 flex items-center justify-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back
                        </Button>
                        <Button type="submit" variant="primary" isLoading={isLoading} className="flex-1 py-3 text-base shadow-xl shadow-blue-600/10">
                            Create Account
                        </Button>
                    </div>
                )}
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                    Already have an account? <button onClick={onToggle} className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">Sign in</button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
