import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { db } from '../firebase'; // Assuming you have this export in your firebase.js
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore'; // Import required Firestore functions

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // Initialize username state
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(email, password);
            // After the user is created, use the user's UID to store the username in Firestore
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                userid : user.uid,
                username: username,
            });
            navigate('/login');
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div className="bg-gray-100 opacity-80 flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{ height: '50vh' }}>
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">Sign Up</h1>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-custom focus:border-custom focus:z-10 sm:text-sm"

            />
            <button 
                onClick={handleSignUp}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mt-6"
            >
                Sign Up
            </button>
            {error && <p className="mt-2 text-center text-sm text-red-600">{error.message}</p>}
            <p className="mt-4 text-sm text-gray-600 text-center">
                Already have an account?{' '}
                <button
                    onClick={() => navigate('/login')}
                    className="font-medium text-yellow-600 hover:text-yellow-500"
                >
                    Login.
                </button>
            </p>
        </div>
    </div>
</div>

    );
};

export default SignUp;
