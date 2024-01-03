export enum EXERCISE_TYPE {
	Compound,
	Cardio,
	Isolation,
	Stretching,
	Calisthenics,
	Plyometrics
}

export enum MANDATORY_EQUIPMENT {
	Barbell,
	Dumbbell,
	Machine,
	Bodyweight,
	ResistanceBand,
	Kettlebell,
	Other
}

export enum MUSCLE {
	"bicep_long_head",
	"bicep_short_head",
	"upper_abs",
	"lower_abs",
	"pectoralis_sternal_head",
	"pectoralis_calvicular_head",
	"lower_pectoralis",
	"deltoid_lateral",
	"deltoid_anterior",
	"upper_trapezius",
	"neck",
	"outer_quadricep",
	"inner_quadricep",
	"rectus_femoris",
	"inner_thigh",
	"tibialis",
	"soleus",
	"gastrocnemius",
	"wrist_extensors",
	"wrist_flexors",
	"hands",
	"obliques"
}

export interface ExerciseData {
	id: string;
	created_at: string;
	name: string;
	alternate_name: string[];
	primary_muscles: MUSCLE[];
	secondary_muscles: MUSCLE[];
	description: string;
	proper_form: string;
	modifications: string[];
	load: string;
	volume: string;
	progression: string;
	rest_period: string;
	precautions: string[];
	common_mistakes: string[];
	risks: string[];
	mandatory_equipment: MANDATORY_EQUIPMENT[];
	optional_equipment: string[];
	alternative_exercises: string[];
	exercise_type: EXERCISE_TYPE;
}
