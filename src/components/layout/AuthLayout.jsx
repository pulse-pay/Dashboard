import { useState } from 'react';
import Navbar from '../common/Navbar';
import Landing from '../../pages/Landing';

const AuthLayout = ({ children, isgetStarted, setIsgetStarted }) => {
    return (
        <div className="min-h-screen w-full relative flex flex-col bg-gray-50">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                 <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl opacity-50"></div>
                 <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar setIsgetStarted={setIsgetStarted} />
                
                <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    {!isgetStarted ? (
                        <Landing setIsgetStarted={setIsgetStarted} />
                    ) : (
                        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 p-8 sm:p-10 animate-fade-in-up">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
