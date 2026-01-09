import Input from '../components/common/Input';

const Signup = ({ onToggle }) => {
    const inputFields = [
         {
            id: 'fullName',
            name: 'fullName',
            type: 'text',
            label: 'Full Name',
            placeholder: 'John Doe',
            required: true,
        },
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
        }
    ];

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-white font-bold text-3xl sm:text-4xl mb-2 tracking-tight">Create Account</h1>
                <p className="text-blue-100 text-sm sm:text-base font-light opacity-90">Get started with your dashboard</p>
            </div>

            <form className="space-y-6">
                {inputFields.map((field) => (
                    <Input 
                        key={field.id}
                        {...field}
                    />
                ))}

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200 mt-2">
                    Sign Up
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
