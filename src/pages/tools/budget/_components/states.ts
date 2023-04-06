import { useLocalStorage } from "@/components/hooks";
import { Budget } from "@adenpun2000/budget";

export const saveData = useLocalStorage("save", new Budget(), {
    deserializer(value) {
        return Budget.fromJSON(JSON.parse(value));
    },
    serializer(value) {
        return value.toString();
    },
});
