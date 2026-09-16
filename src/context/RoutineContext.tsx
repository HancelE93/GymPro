import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from 'react';

export type Routine = {
    id: string;
    name: string;
    muscleGroup: string;
    duration: number;
    createdAt: string;
};

type RoutineContextType = {
    routines: Routine[];

    addRoutine: (
        routine: Omit<Routine, 'id' | 'createdAt'>
    ) => void;

    updateRoutine: (
        id: string,
        routine: Omit<Routine, 'id' | 'createdAt'>
    ) => void;

    deleteRoutine: (id: string) => void;
};

const RoutineContext = createContext<
    RoutineContextType | undefined
>(undefined);

function RoutineProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [routines, setRoutines] = useState<Routine[]>([
        {
            id: '1',
            name: 'Pecho y Tríceps',
            muscleGroup: 'Pecho',
            duration: 45,
            createdAt: new Date().toLocaleDateString(),
        },
        {
            id: '2',
            name: 'Espalda Completa',
            muscleGroup: 'Espalda',
            duration: 50,
            createdAt: new Date().toLocaleDateString(),
        },
        {
            id: '3',
            name: 'Piernas',
            muscleGroup: 'Piernas',
            duration: 55,
            createdAt: new Date().toLocaleDateString(),
        },
    ]);

    const addRoutine = (
        routineNew: Omit<Routine, 'id' | 'createdAt'>
    ) => {

        const newRoutine: Routine = {
            ...routineNew,
            id: Date.now().toString(),
            createdAt: new Date().toLocaleDateString(),
        };

        setRoutines((currentRoutines) => [
            ...currentRoutines,
            newRoutine,
        ]);
    };

    const updateRoutine = (
        id: string,
        routineUpdated: Omit<Routine, 'id' | 'createdAt'>
    ) => {

        setRoutines((currentRoutines) =>
            currentRoutines.map((routine) =>
                routine.id === id
                    ? {
                        ...routine,
                        ...routineUpdated,
                    }
                    : routine
            )
        );
    };

    const deleteRoutine = (id: string) => {

        setRoutines((currentRoutines) =>
            currentRoutines.filter(
                (routine) => routine.id !== id
            )
        );
    };

    return (
        <RoutineContext.Provider
            value={{
                routines,
                addRoutine,
                updateRoutine,
                deleteRoutine,
            }}
        >
            {children}
        </RoutineContext.Provider>
    );
}

export function useRoutines() {
    const context = useContext(RoutineContext);

    if (!context) {
        throw new Error(
            'useRoutines debe ser usado dentro de RoutineProvider'
        );
    }

    return context;
}

export default RoutineProvider;