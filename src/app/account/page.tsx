'use client';

import { useEffect, useState } from 'react'
import { GetUser, GetUserID } from '../../utils/helpers/supabase'

import CalorieCalculator from '@/src/components/calorie-calculator/CalorieCalculator';
import BodyFatCalculator from '@/src/components/body-fat/BodyFatCalculator';
import FoodScanner from '@/src/components/food-scanner/FoodScanner';

export default function Account() {
	const [isLoading, setIsLoading] = useState(true)
	const [userID, setUserID] = useState<any>([])

	useEffect(() => {
		const fetchPosts = async () => {
			const user = await GetUser()
			const user_id = await GetUserID(user?.id as string)
			setUserID(user_id)
			setIsLoading(false)
		}

		fetchPosts()
	  }, [])

	return (
		<>
			<div>
				Account
				<div>{userID}</div>
				<CalorieCalculator />
				<FoodScanner />
			</div>
		</>
	)
}