"use client";

import { Input, Button } from '@nextui-org/react';
import { MouseEventHandler, useState } from 'react';

export default function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	}

	const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		// @TODO: Implement login logic
	}

	return (
		<form className="flex flex-col items-center">
			<Input
				type="email"
				placeholder="Email"
				value={email}
				onChange={handleEmailChange}
			/>
			<Input
				type="password"
				placeholder="Password"
				value={password}
				onChange={handlePasswordChange}
			/>
			<Button onClick={handleSubmit}>Login</Button>
		</form>
	)
}


