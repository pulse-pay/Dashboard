import Navbar from '../common/Navbar';
import Landing from '../../pages/Landing';

const AuthLayout = ({ children, isgetStarted, setIsgetStarted }) => {
    return (
        <div className="h-screen w-full relative flex flex-col bg-gray-50 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                 <div
                     className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10"
                     style={{
                         backgroundImage: `url('https://zqjexxnaxfpdqiewwugv.supabase.co/storage/v1/object/sign/cloud/clouds.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iYjI3ZjU1OS1hNWU1LTQ1YjYtOWMwZC0zNzRkOGNkMjE5YzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbG91ZC9jbG91ZHMuanBnIiwiaWF0IjoxNzY3OTY3NDI1LCJleHAiOjE3NzA1NTk0MjV9.uigcpBIlqLwFfiChuZa1EknlfpwsUlWgdB66Aob8s6M')`
                     }}
                 />
                 <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-200 h-200 bg-blue-100/40 rounded-full blur-3xl opacity-50"></div>
                 <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-150 h-150 bg-indigo-100/40 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <Navbar setIsgetStarted={setIsgetStarted} />
                
                <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-hidden">
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
