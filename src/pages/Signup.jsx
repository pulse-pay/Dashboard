import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Store, User, Mail, Phone, Lock, MapPin } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useSignupMutation } from '../store/api/storeAccountApi';
import { setCredentials } from '../store/slices/authSlice';

const Signup = ({ onToggle, setIsLoggedIn }) => {
    const [formData, setFormData] = useState({ 
        storeName: '', 
        ownerName: '', 
        email: '', 
        phone: '', 
        password: '',
        storeType: 'GYM',
        location: { address: '', lat: 0, lng: 0 }
    });
    const [signup, { isLoading, error }] = useSignupMutation();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'address') {
            setFormData({ ...formData, location: { ...formData.location, address: value } });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const result = await signup(formData).unwrap();
            dispatch(setCredentials({ store: result }));
            if (setIsLoggedIn) setIsLoggedIn(true);
        } catch (err) {
            console.error('Signup failed:', err);
        }
    };

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h1 className="text-gray-900 font-bold text-3xl mb-2 tracking-tight">Create Store Account</h1>
                <p className="text-gray-500 text-sm">Register your business on PulsePay</p>
            </div>

            <form className="space-y-4" onSubmit={handleSignup}>
                <Input 
                    id="storeName"
                    name="storeName"
                    type="text"
                    label="Store Name"
                    placeholder="FitZone Gym"
                    required
                    value={formData.storeName}
                    onChange={handleChange}
                    leftIcon={<Store className="w-5 h-5" />}
                />

                <Input 
                    id="ownerName"
                    name="ownerName"
                    type="text"
                    label="Owner Name"
                    placeholder="John Doe"
                    required
                    value={formData.ownerName}
                    onChange={handleChange}
                    leftIcon={<User className="w-5 h-5" />}
                />

                <Input 
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address"
                    placeholder="store@company.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    leftIcon={<Mail className="w-5 h-5" />}
                />

                <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Phone Number"
                    placeholder="+1234567890"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    leftIcon={<Phone className="w-5 h-5" />}
                />

                <div className="space-y-1.5">
                    <label htmlFor="storeType" className="text-sm font-semibold text-gray-700 ml-1">
                        Store Type
                    </label>
                    <select
                        id="storeType"
                        name="storeType"
                        value={formData.storeType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 font-medium shadow-sm"
                    >
                        <option value="GYM">Gym</option>
                        <option value="EV">EV Charging</option>
                        <option value="WIFI">WiFi Hotspot</option>
                        <option value="PARKING">Parking</option>
                    </select>
                </div>

                <Input 
                    id="address"
                    name="address"
                    type="text"
                    label="Address"
                    placeholder="123 Main St, City"
                    required
                    value={formData.location.address}
                    onChange={handleChange}
                    leftIcon={<MapPin className="w-5 h-5" />}
                />

                <Input 
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    leftIcon={<Lock className="w-5 h-5" />}
                />

                {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium animate-pulse">
                        {error.data?.message || 'Signup failed. Please check your details.'}
                    </div>
                )}

                <Button 
                    type="submit" 
                    variant="primary" 
                    isLoading={isLoading}
                    className="w-full py-3 text-base shadow-xl shadow-blue-600/10 mt-2"
                >
                    Create Account
                </Button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                    Already have an account? <button onClick={onToggle} className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">Sign in</button>
                </p>
            </div>
        </div>
    );
}

export default Signup;
