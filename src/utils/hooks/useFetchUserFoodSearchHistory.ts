import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

import { GetUserHistory, GetUserID } from "src/utils/helpers/supabase";
import { Log, LogLevel } from "src/utils/helpers/debugLog";
import { HistoryData } from "@/src/types/supabaseDataTypes";

// Separate client for realtime subscriptions
const realtime = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export const useFetchUserFoodSearchHistory = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [history, setHistory] = useState<HistoryData>([]);

	useEffect(() => {
		const fetchHistory = async () => {
			const history = await GetUserHistory((await GetUserID()) as string);
			setHistory(history);
			setIsLoading(false);
		};

		fetchHistory();

		// Subscribe to realtime updates
		const channel = realtime.channel("table_db_changes");
		channel
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "users"
				},
				(payload) => {
					setHistory(payload.new.foodSearch_keyword_history);
				}
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, []);

	return { isLoading, history };
};
