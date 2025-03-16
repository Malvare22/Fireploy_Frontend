import { Rating } from "@mui/material";

type ScoreProps = {
    value: number | null;
    setValue: (newValue: number | null) => void;
};

function Score({ value, setValue }: ScoreProps) {
    return (
        <Rating
            name="simple-controlled"
            value={value}
            onChange={(_event, newValue) => setValue(newValue)}
        />
    );
}

export default Score;
