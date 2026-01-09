import { useState } from 'react';

const AuthLayout = ({ children }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        setMousePosition({
            x: (clientX / innerWidth) * 15,
            y: (clientY / innerHeight) * 15,
        });
    };

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

            {/* Content Card container */}
            <div className="relative z-20 w-full max-w-md p-6">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden p-8 sm:p-10">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
