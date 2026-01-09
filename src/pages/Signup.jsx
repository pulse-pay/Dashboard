import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { User, Mail, Phone, Lock } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useSignupMutation } from '../store/api/userApi';
import { setCredentials } from '../store/slices/authSlice';

const Signup = ({ onToggle, setIsLoggedIn }) => {
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '' });
    const [signup, { isLoading, error }] = useSignupMutation();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const result = await signup(formData).unwrap();
            dispatch(setCredentials({ user: result.data, token: result.token }));
            if (setIsLoggedIn) setIsLoggedIn(true);
        } catch (err) {
            console.error('Signup failed:', err);
        }
    };

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h1 className="text-gray-900 font-bold text-3xl mb-2 tracking-tight">Create Account</h1>
                <p className="text-gray-500 text-sm">Get started with your dashboard today</p>
            </div>

            <form className="space-y-4" onSubmit={handleSignup}>
                <Input 
                    id="fullName"
                    name="fullName"
                    type="text"
                    label="Full Name"
                    placeholder="John Doe"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    leftIcon={<User className="w-5 h-5" />}
                />

                <Input 
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address"
                    placeholder="name@company.com"
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
