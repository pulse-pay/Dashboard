import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../components/common/Input';
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

    const inputFields = [
         {
            id: 'fullName',
            name: 'fullName',
            type: 'text',
            label: 'Full Name',
            placeholder: 'John Doe',
            required: true,
            value: formData.fullName,
            onChange: handleChange,
        },
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
            id: 'phone',
            name: 'phone',
            type: 'tel',
            label: 'Phone Number',
            placeholder: '+1234567890',
            required: true,
            value: formData.phone,
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
        }
    ];

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-white font-bold text-3xl sm:text-4xl mb-2 tracking-tight">Create Account</h1>
                <p className="text-blue-100 text-sm sm:text-base font-light opacity-90">Get started with your dashboard</p>
            </div>

            <form className="space-y-6" onSubmit={handleSignup}>
                {inputFields.map((field) => (
                    <Input 
                        key={field.id}
                        {...field}
                    />
                ))}

                {error && (
                    <p className="text-red-400 text-sm text-center">
                        {error.data?.message || 'Signup failed. Please try again.'}
                    </p>
                )}

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-blue-100 text-sm">
                    Already have an account? <button onClick={onToggle} className="font-semibold text-white hover:underline">Sign in</button>
                </p>
            </div>
        </>
    );
}

export default Signup;
