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
        <div>
            <h1>Sign Up</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignUp}>Sign Up</button>
            {error && <p>{error.message}</p>}
        </div>
    );
};

export default SignUp;
