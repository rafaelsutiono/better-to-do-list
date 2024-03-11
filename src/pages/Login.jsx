import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        if (user) {
            navigate('/todo'); // Navigate to the Todo page after successful login
        }
    }, [user, navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="bg-gray-100 opacity-80 flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{ height: '40vh' }}>
        <div className="w-full max-w-xs">
            <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">Login</h1>
            <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
                <div className="mb-4">
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="px-4 py-2 font-bold text-white bg-yellow-700 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
                {error && <p className="mt-4 text-xs italic text-red-500">Error: {error.message}</p>}
            </div>
            <p className="text-xs text-center text-gray-500">
                Don't have an account?{' '}
                <button
                    className="font-bold text-yellow-700 hover:text-yellow-800"
                    onClick={() => navigate('/')}
                >
                    Sign up.
                </button>
            </p>
        </div>
    </div>
    
    );
};

export default Login;
