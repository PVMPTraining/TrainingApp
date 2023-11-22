'use client'

// Supabase
import { createBrowserClient } from '@supabase/ssr';
import { LogLevel, Log } from './debugLog';

const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export const GetUser = async () => {
	const { data: user } = await supabase.auth.getUser();
	Log(LogLevel.DEBUG, `GetUser: ${user?.user?.id}`)
	return user.user;
}

// export async function GetUsersID() {
// 	const { data: user } = await supabase.auth.getUser()
// 	return user?.user?.id
// }

// Dev only
export const GetUserID = async (id: string) => {
	const { data: user_id } = await supabase.from('users').select('id').eq('id', id).single()
	Log(LogLevel.DEBUG, `GetUserID: ${user_id?.id}`)
	return user_id?.id
}

export const SignOut = async () => {
	await supabase.auth.signOut()
}

export const GetUserWorkoutsRow = async (id: string) => {
	const { data: user_workouts } = await supabase.from('user_workouts').select('*').eq('id', id).single()
	Log(LogLevel.DEBUG, `GetUserWorkoutsRow: ${user_workouts?.workouts}`)
	return user_workouts?.workouts
}

export const GetUserWorkouts = async (id: string) => {
	const { data: user_workouts } = await supabase.from('user_workouts').select('workouts').eq('id', id).single()
	Log(LogLevel.DEBUG, `GetUserWorkouts: ${user_workouts?.workouts}`)
	return user_workouts?.workouts
}