import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Mail, Lock } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useLoginMutation } from '../store/api/userApi';
import { setCredentials } from '../store/slices/authSlice';
 
const Login = ({ onToggle, setIsLoggedIn }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [login, { isLoading, error }] = useLoginMutation();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await login(formData).unwrap();
            dispatch(setCredentials({ user: result.data, token: result.token }));
            if (setIsLoggedIn) setIsLoggedIn(true);
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h1 className="text-gray-900 font-bold text-3xl mb-2 tracking-tight">Welcome Back</h1>
                <p className="text-gray-500 text-sm">Enter your details to access your dashboard</p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
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
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    leftIcon={<Lock className="w-5 h-5" />}
                    labelRight={
                        <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                            Forgot password?
                        </a>
                    }
                />

                {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium animate-pulse">
                        {error.data?.message || 'Login failed. Please verify your credentials.'}
                    </div>
                )}

                <Button 
                    type="submit" 
                    variant="primary" 
                    isLoading={isLoading}
                    className="w-full py-3 text-base shadow-xl shadow-blue-600/10"
                >
                    Sign In
                </Button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                    Don't have an account? <button onClick={onToggle} className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">Sign up</button>
                </p>
            </div>
        </div>
    );
}

export default Login;