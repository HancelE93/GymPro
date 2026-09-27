import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';

import { useSQLiteContext } from 'expo-sqlite';

export type Routine = {
    id: string;
    name: string;
    muscleGroup: string;
    duration: number;
    createdAt: string;
    featured: boolean;
};

type RoutineContextType = {
    routines: Routine[];

    addRoutine: (
        routine: Omit<Routine, 'id' | 'createdAt'>
    ) => Promise<void>;

    updateRoutine: (
        id: string,
        routine: Omit<Routine, 'id' | 'createdAt'>
    ) => Promise<void>;

    deleteRoutine: (id: string) => Promise<void>;

    toggleFeatured: (id: string) => Promise<void>;
};

const RoutineContext = createContext<
    RoutineContextType | undefined
>(undefined);

type RoutineRow = {
    id: string;
    name: string;
    muscleGroup: string;
    duration: number;
    createdAt: string;
    featured: number;
};

function RoutineProvider({
    children,
}: {
    children: ReactNode;
}) {

    const db = useSQLiteContext();

    const [routines, setRoutines] = useState<Routine[]>([]);

    useEffect(() => {
        loadRoutines();
    }, []);

    const loadRoutines = async () => {

        const rows = await db.getAllAsync<RoutineRow>(
            'SELECT * FROM routines ORDER BY createdAt ASC'
        );

        if (rows.length === 0) {

            const initialRoutines: Routine[] = [
                {
                    id: '1',
                    name: 'Pecho y Tríceps',
                    muscleGroup: 'Pecho',
                    duration: 45,
                    createdAt: new Date().toLocaleDateString(),
                    featured: false,
                },
                {
                    id: '2',
                    name: 'Espalda Completa',
                    muscleGroup: 'Espalda',
                    duration: 50,
                    createdAt: new Date().toLocaleDateString(),
                    featured: false,
                },
                {
                    id: '3',
                    name: 'Piernas',
                    muscleGroup: 'Piernas',
                    duration: 55,
                    createdAt: new Date().toLocaleDateString(),
                    featured: false,
                },
            ];

            for (const routine of initialRoutines) {

                await db.runAsync(
                    `INSERT INTO routines
                    (id, name, muscleGroup, duration, createdAt, featured)
                    VALUES (?, ?, ?, ?, ?, ?)`,
                    routine.id,
                    routine.name,
                    routine.muscleGroup,
                    routine.duration,
                    routine.createdAt,
                    routine.featured ? 1 : 0
                );
            }

            setRoutines(initialRoutines);

            return;
        }

        const loadedRoutines: Routine[] = rows.map((row) => ({
            id: row.id,
            name: row.name,
            muscleGroup: row.muscleGroup,
            duration: row.duration,
            createdAt: row.createdAt,
            featured: row.featured === 1,
        }));

        setRoutines(loadedRoutines);
    };

    const addRoutine = async (
        routineNew: Omit<Routine, 'id' | 'createdAt'>
    ) => {

        const newRoutine: Routine = {
            ...routineNew,
            id: Date.now().toString(),
            createdAt: new Date().toLocaleDateString(),
        };

        await db.runAsync(
            `INSERT INTO routines
            (id, name, muscleGroup, duration, createdAt, featured)
            VALUES (?, ?, ?, ?, ?, ?)`,
            newRoutine.id,
            newRoutine.name,
            newRoutine.muscleGroup,
            newRoutine.duration,
            newRoutine.createdAt,
            newRoutine.featured ? 1 : 0
        );

        setRoutines((currentRoutines) => [
            ...currentRoutines,
            newRoutine,
        ]);
    };

    const updateRoutine = async (
        id: string,
        routineUpdated: Omit<Routine, 'id' | 'createdAt'>
    ) => {

        await db.runAsync(
            `UPDATE routines
             SET name = ?,
                 muscleGroup = ?,
                 duration = ?,
                 featured = ?
             WHERE id = ?`,
            routineUpdated.name,
            routineUpdated.muscleGroup,
            routineUpdated.duration,
            routineUpdated.featured ? 1 : 0,
            id
        );

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

    const deleteRoutine = async (id: string) => {

        await db.runAsync(
            'DELETE FROM routines WHERE id = ?',
            id
        );

        setRoutines((currentRoutines) =>
            currentRoutines.filter(
                (routine) => routine.id !== id
            )
        );
    };

    const toggleFeatured = async (id: string) => {

        const routine = routines.find(
            (item) => item.id === id
        );

        if (!routine) {
            return;
        }

        const newFeaturedValue = !routine.featured;

        await db.withTransactionAsync(async () => {

            await db.runAsync(
                'UPDATE routines SET featured = 0'
            );

            if (newFeaturedValue) {
                await db.runAsync(
                    'UPDATE routines SET featured = 1 WHERE id = ?',
                    id
                );
            }
        });

        setRoutines((currentRoutines) =>
            currentRoutines.map((item) => {

                if (item.id === id) {
                    return {
                        ...item,
                        featured: newFeaturedValue,
                    };
                }

                return {
                    ...item,
                    featured: false,
                };
            })
        );
    };

    return (
        <RoutineContext.Provider
            value={{
                routines,
                addRoutine,
                updateRoutine,
                deleteRoutine,
                toggleFeatured,
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