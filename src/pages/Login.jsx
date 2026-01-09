import { useState } from 'react';
import Input from '../components/common/Input';
 
const Login = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        setMousePosition({
            x: (clientX / innerWidth) * 15,
            y: (clientY / innerHeight) * 15,
        });
    };

    const inputFields = [
        {
            id: 'email',
            name: 'email',
            type: 'email',
            label: 'Email Address',
            placeholder: 'name@anydomain.com',
            required: true,
        },
        {
            id: 'password',
            name: 'password',
            type: 'password',
            label: 'Password',
            placeholder: '••••••••',
            required: true,
            labelRight: (
                <a href="#" className="text-xs text-blue-200 hover:text-white transition-colors">
                    Forgot password?
                </a>
            ),
        }
    ];

    return (
        <div className="h-screen w-full relative overflow-hidden flex justify-center items-center bg-gray-900" onMouseMove={handleMouseMove}>
            
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/30 z-10" /> {/* Dark overlay for better text contrast/focus */}
                <img 
                    src="https://zqjexxnaxfpdqiewwugv.supabase.co/storage/v1/object/sign/cloud/clouds.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iYjI3ZjU1OS1hNWU1LTQ1YjYtOWMwZC0zNzRkOGNkMjE5YzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbG91ZC9jbG91ZHMuanBnIiwiaWF0IjoxNzY3OTE2NjM4LCJleHAiOjE3NzA1MDg2Mzh9.OXjkANZYPF2z3VLm8okJL2KjmppLNzJhDSXnp_kBz1w" 
                    alt="Background" 
                    className="w-full h-full object-cover scale-110"
                    style={{
                        transform: `scale(1.1) translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)`,
                        transition: 'transform 0.2s ease-out'
                    }}
                />
            </div>

            {/* Login Card */}
            <div className="relative z-20 w-full max-w-md p-6">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden p-8 sm:p-10">
                    
                    <div className="text-center mb-8">
                        <h1 className="text-white font-bold text-3xl sm:text-4xl mb-2 tracking-tight">Welcome Back</h1>
                        <p className="text-blue-100 text-sm sm:text-base font-light opacity-90">Enter your details to access your dashboard</p>
                    </div>

                    <form className="space-y-6">
                        {inputFields.map((field) => (
                            <Input 
                                key={field.id}
                                {...field}
                            />
                        ))}

                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200 mt-2">
                            Sign In
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-blue-100 text-sm">
                            Don't have an account? <a href="#" className="font-semibold text-white hover:underline">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;