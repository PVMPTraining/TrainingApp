'use client'

import UserWorkouts from "@/src/components/user-workouts/UserWorkouts"
import exp from "constants"
import { FC } from "react"

const UserWorkoutsPage: FC = () => {
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

export default UserWorkoutsPage;