import { FC } from "react";
import { Button } from "../../UI/Button/Button";
import { useJournalLogic } from "@/src/utils/hooks/useJournalLogic";

interface StepOneProps {}

const StepOne: FC<StepOneProps> = ({}) => {
	return (
		<>
			<label className="form-control w-full max-w-xs gap-2">
				<div className="label">
					<span className="label-text">Age</span>
				</div>
				<input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
				<div className="label">
					<span className="label-text">Gender</span>
				</div>
				<select className="select select-bordered">
					{/* <option disabled selected>
						Pick one
					</option> */}
					<option>Male</option>
					<option>Female</option>
				</select>
				<div className="label">
					<span className="label-text">Height</span>
				</div>
				<input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
				<div className="label">
					<span className="label-text">Weight</span>
				</div>
				<input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
			</label>
		</>
	);
};

export default StepOne;
