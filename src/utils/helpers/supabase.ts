'use client'

// Supabase
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function GetUser() {
	const { data: user } = await supabase.auth.getUser();
	return user.user;
}

// export async function GetUsersID() {
// 	const { data: user } = await supabase.auth.getUser()
// 	return user?.user?.id
// }

// Dev only
export async function GetUserID(id: string) {
	const { data: user_id } = await supabase.from('users').select('id').eq('id', id).single()
	return user_id?.id
}

export async function SignOut () {
	await supabase.auth.signOut()
}