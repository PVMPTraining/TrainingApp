import { FC } from 'react';
import useFetchUserWorkouts from '@/src/utils/hooks/useFetchUserWorkouts';

interface UserWorkoutsProps {}

const UserWorkouts: FC<UserWorkoutsProps> = ({}) => {
	const { isLoading, userWorkouts } = useFetchUserWorkouts();
	return (<div>{userWorkouts}</div>);
};

export default UserWorkouts;