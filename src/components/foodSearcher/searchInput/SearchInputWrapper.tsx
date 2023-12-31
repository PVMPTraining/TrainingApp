import { FC } from "react";
import SearchInput from "./SearchInput";
import CategoryButtons from "../categoryButtons/CategoryButtons";
import { useScrollPosition } from "@/src/utils/hooks/useScrollPosition";
import { RootState } from "@/src/utils/redux/store";
import { useSelector } from "react-redux";
import ResultsPaginate from "../resultsPaginate/ResultsPaginate";

interface SearchInputWrapperProps {}

const SearchInputWrapper: FC<SearchInputWrapperProps> = ({}) => {
	const { selectedBrandFoodData, isLoading } = useSelector((state: RootState) => state.foodFetch);
	// const { scrollDirection, setIsModalOpen } = useScrollPosition();

	return (
		<div
			// className={`${
			// 	scrollDirection === "up" && !selectedBrandFoodData?._id ? "sticky top-14 z-50 bg-slate-700 rounded-b-xl animate-fade-down" : "flex flex-col"
			// } w-full gap-5 p-1`}
			className={`${!selectedBrandFoodData?._id ? "sticky top-14 z-50 bg-slate-700 rounded-b-xl animate-fade-down" : "flex flex-col"} w-full gap-5 p-1`}
		>
			<div className="flex flex-col items-center pb-2">
				<SearchInput />
				<CategoryButtons />
			</div>
			{!isLoading ? <ResultsPaginate /> : null}
			<div className="flex flex-col gap-2">
				<p className="font-bold">
					Filter <strong>this page</strong> results based by their nutrition score
				</p>
				<select
					// value={selectedNutritionScoreForFilter}
					className="select select-ghost w-full max-w-xs"
					// onChange={(e) => {
					// 	setSelectedNutritionScoreForFilter(e.target.value);
					// }}
				>
					<option value="">All</option>
					<option value="a">A</option>
					<option value="b">B</option>
					<option value="c">C</option>
					<option value="d">D</option>
					<option value="e">E</option>
					<option value="unknown">Unknown</option>
				</select>
			</div>
			{/* <div className="flex flex-col gap-4">
				<ReactPaginate
					breakLabel="..."
					nextLabel=">"
					pageRangeDisplayed={1}
					marginPagesDisplayed={2}
					previousLinkClassName="text-xl px-2.5 py-2 bg-blue-500 rounded-md text-white"
					nextLinkClassName="text-xl px-2.5 py-2 bg-blue-500 rounded-md text-white"
					pageClassName=" bg-black text-white text-sm px-2.5 py-2 rounded-md"
					className="flex text-sm items-center justify-center gap-2 self-center text-black"
					activeClassName="bg-blue-500"
					pageCount={pageCount}
					onPageChange={(data) => {
						brandedFetchHandler(data.selected + 1);
					}}
					forcePage={activePage}
					// onPageActive={(number) => brandedFetchHandler(number.selected + 1)}
					// onClick={(number) => console.log(number)}
					previousLabel="<"
					renderOnZeroPageCount={null}
				/>
				<p className="font-bold text-center">
					Showing {filteredResults?.length >= 1 ? filteredResults?.length : brandFoodData.page_count} results for this page, go to another page for
					see more results.
				</p>
				<div className="flex flex-col gap-2">
					<p className="font-bold">
						Filter <strong>this page</strong> results based by their nutrition score
					</p>
					<select
						value={selectedNutritionScoreForFilter}
						className="select select-ghost w-full max-w-xs"
						onChange={(e) => {
							setSelectedNutritionScoreForFilter(e.target.value);
						}}
					>
						<option value="">All</option>
						<option value="a">A</option>
						<option value="b">B</option>
						<option value="c">C</option>
						<option value="d">D</option>
						<option value="e">E</option>
						<option value="unknown">Unknown</option>
					</select>
				</div>
			</div> */}
		</div>
	);
};

export default SearchInputWrapper;
