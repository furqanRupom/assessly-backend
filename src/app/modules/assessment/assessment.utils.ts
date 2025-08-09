import { CompetencyLevel } from "../questions";

export const STEP_LEVEL_MAP: Record<number, CompetencyLevel[]> = {
    1: [CompetencyLevel.A1, CompetencyLevel.A2],
    2: [CompetencyLevel.B1, CompetencyLevel.B2],
    3: [CompetencyLevel.C1, CompetencyLevel.C2],
};

export const getCertificationLevel = (step: number, score: number): string => {
    if (step === 1) {
        if (score < 25) return "FAIL";
        if (score < 50) return CompetencyLevel.A1;
        if (score < 75) return CompetencyLevel.A2;
        return CompetencyLevel.A2;
    }
    if (step === 2) {
        if (score < 25) return CompetencyLevel.A2;
        if (score < 50) return CompetencyLevel.B1;
        if (score < 75) return CompetencyLevel.B2;
        return CompetencyLevel.B2;
    }
    if (step === 3) {
        if (score < 25) return CompetencyLevel.B2;
        if (score < 50) return CompetencyLevel.C1;
        return CompetencyLevel.C2;
    }
    return "";
};