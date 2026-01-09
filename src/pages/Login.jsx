import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../components/common/Input';
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

    const inputFields = [
        {
            id: 'email',
            name: 'email',
            type: 'email',
            label: 'Email Address',
            placeholder: 'name@anydomain.com',
            required: true,
            value: formData.email,
            onChange: handleChange,
        },
        {
            id: 'password',
            name: 'password',
            type: 'password',
            label: 'Password',
            placeholder: '••••••••',
            required: true,
            value: formData.password,
            onChange: handleChange,
            labelRight: (
                <a href="#" className="text-xs text-blue-200 hover:text-white transition-colors">
                    Forgot password?
                </a>
            ),
        }
    ];

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-white font-bold text-3xl sm:text-4xl mb-2 tracking-tight">Welcome Back</h1>
                <p className="text-blue-100 text-sm sm:text-base font-light opacity-90">Enter your details to access your dashboard</p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
                {inputFields.map((field) => (
                    <Input 
                        key={field.id}
                        {...field}
                    />
                ))}

                {error && (
                    <p className="text-red-400 text-sm text-center">
                        {error.data?.message || 'Login failed. Please try again.'}
                    </p>
                )}

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-blue-100 text-sm">
                    Don't have an account? <button onClick={onToggle} className="font-semibold text-white hover:underline">Sign up</button>
                </p>
            </div>
        </>
    );
}

export default Login;