'use client'

import UserWorkouts from "@/src/components/user-workouts/UserWorkouts"

export default function Login() {
	return (
		<>
			<div>
				User Workouts
				<div className="flex flex-col flex-wrap">
					<UserWorkouts></UserWorkouts>
				</div>
			</div>
		</>
	)
}