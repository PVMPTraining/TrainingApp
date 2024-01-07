import { useState, useEffect } from "react";
import { RealtimePostgresChangesPayload, createClient } from "@supabase/supabase-js";

import { GetUserKeywordHistory, GetUserID, GetUserProductHistory } from "src/utils/helpers/supabase";
import { Log, LogLevel } from "src/utils/helpers/debugLog";
import { KeywordHistoryData, ProductHistoryData } from "@/src/types/supabase/foodSearchData";

type Payload = {
	new: {
		foodSearch_product_history: ProductHistoryData;
		foodSearch_keyword_history: KeywordHistoryData;
	};
};

// Separate client for realtime subscriptions
const realtime = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export const useFetchUserFoodSearchHistory = () => {
	const [historyFetchIsLoading, setHistoryFetchIsLoading] = useState(true);
	const [keywordHistory, setKeywordHistory] = useState<KeywordHistoryData>([]);
	const [productHistory, setProductHistory] = useState<ProductHistoryData>([]);

	useEffect(() => {
		const fetchKeywordHistory = async () => {
			setHistoryFetchIsLoading(true);
			const history = await GetUserKeywordHistory((await GetUserID()) as string);
			setKeywordHistory(history);
			setHistoryFetchIsLoading(false);
		};

		const fetchProductHistory = async () => {
			setHistoryFetchIsLoading(true);
			const history = await GetUserProductHistory((await GetUserID()) as string);
			setProductHistory(history);
			setHistoryFetchIsLoading(false);
		};

		fetchKeywordHistory();
		fetchProductHistory();

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
					console.log(payload);
					setProductHistory(payload.new.foodSearch_product_history);
					setKeywordHistory(payload.new.foodSearch_keyword_history);
				}
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, []);

	return { historyFetchIsLoading, keywordHistory, productHistory };
};
