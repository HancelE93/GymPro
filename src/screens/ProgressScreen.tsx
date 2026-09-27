import React from 'react';

import {
    Text,
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useRoutines } from '../context/RoutineContext';

export default function ProgressScreen() {

    const { routines } = useRoutines();

    const totalRoutines = routines.length;

    const totalDuration = routines.reduce(
        (total, routine) => total + routine.duration,
        0
    );

    const averageDuration =
        totalRoutines > 0
            ? Math.round(totalDuration / totalRoutines)
            : 0;

    const muscleGroupCounts: { [key: string]: number } = {};

    routines.forEach((routine) => {
        muscleGroupCounts[routine.muscleGroup] =
            (muscleGroupCounts[routine.muscleGroup] || 0) + 1;
    });

    const mostFrequentMuscleGroup =
        Object.keys(muscleGroupCounts).length > 0
            ? Object.keys(muscleGroupCounts).reduce((a, b) =>
                muscleGroupCounts[a] >= muscleGroupCounts[b]
                    ? a
                    : b
            )
            : 'Sin datos';

    // BUSCAR LA RUTINA DESTACADA
    const featuredRoutine = routines.find(
        (routine) => routine.featured
    );

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* ENCABEZADO */}
                <View style={styles.header}>

                    <View style={styles.headerIcon}>
                        <Ionicons
                            name="stats-chart"
                            size={28}
                            color="#FFFFFF"
                        />
                    </View>

                    <View style={styles.headerInfo}>

                        <Text style={styles.title}>
                            Mi Progreso
                        </Text>

                        <Text style={styles.subtitle}>
                            Sigue avanzando hacia tus objetivos
                        </Text>

                    </View>

                </View>

                {/* PROGRESO SEMANAL */}
                <View style={styles.progressCard}>

                    <View style={styles.cardHeader}>

                        <View style={styles.iconContainer}>
                            <Ionicons
                                name="trophy"
                                size={30}
                                color="#D90429"
                            />
                        </View>

                        <View style={styles.cardHeaderInfo}>

                            <Text style={styles.progressTitle}>
                                Progreso semanal
                            </Text>

                            <Text style={styles.smallText}>
                                Objetivo: 4 entrenamientos
                            </Text>

                        </View>

                    </View>

                    <View style={styles.progressNumberRow}>

                        <Text style={styles.percentage}>
                            75%
                        </Text>

                        <View style={styles.progressBadge}>
                            <Ionicons
                                name="trending-up"
                                size={15}
                                color="#D90429"
                            />

                            <Text style={styles.progressBadgeText}>
                                En progreso
                            </Text>
                        </View>

                    </View>

                    <View style={styles.progressBackground}>
                        <View style={styles.progressBar} />
                    </View>

                    <Text style={styles.progressText}>
                        Has completado 3 de 4 entrenamientos
                    </Text>

                </View>

                {/* ESTADÍSTICAS */}
                <View style={styles.sectionHeader}>

                    <View style={styles.redIndicator} />

                    <Text style={styles.sectionTitle}>
                        Estadísticas
                    </Text>

                </View>

                <View style={styles.statsContainer}>

                    {/* TOTAL DE RUTINAS */}
                    <View style={styles.statCard}>

                        <View style={styles.statIcon}>
                            <Ionicons
                                name="barbell"
                                size={26}
                                color="#D90429"
                            />
                        </View>

                        <Text style={styles.statNumber}>
                            {totalRoutines}
                        </Text>

                        <Text style={styles.statLabel}>
                            Rutinas
                        </Text>

                    </View>

                    {/* DURACIÓN TOTAL */}
                    <View style={styles.statCard}>

                        <View style={styles.statIcon}>
                            <Ionicons
                                name="time"
                                size={26}
                                color="#D90429"
                            />
                        </View>

                        <Text style={styles.statNumber}>
                            {totalDuration}
                        </Text>

                        <Text style={styles.statLabel}>
                            Minutos totales
                        </Text>

                    </View>

                </View>

                {/* ESTADÍSTICAS ADICIONALES */}
                <View style={styles.statsContainer}>

                    {/* PROMEDIO */}
                    <View style={styles.statCard}>

                        <View style={styles.statIcon}>
                            <Ionicons
                                name="analytics"
                                size={26}
                                color="#D90429"
                            />
                        </View>

                        <Text style={styles.statNumber}>
                            {averageDuration}
                        </Text>

                        <Text style={styles.statLabel}>
                            Minutos promedio
                        </Text>

                    </View>

                    {/* GRUPO MUSCULAR */}
                    <View style={styles.statCard}>

                        <View style={styles.statIcon}>
                            <Ionicons
                                name="body"
                                size={26}
                                color="#D90429"
                            />
                        </View>

                        <Text style={styles.muscleGroupNumber}>
                            {mostFrequentMuscleGroup}
                        </Text>

                        <Text style={styles.statLabel}>
                            Grupo más trabajado
                        </Text>

                    </View>

                </View>

                {/* RUTINA DESTACADA */}
                <View style={styles.sectionHeader}>

                    <View style={styles.redIndicator} />

                    <Text style={styles.sectionTitle}>
                        Rutina destacada
                    </Text>

                </View>

                {featuredRoutine ? (

                    <View style={styles.featuredCard}>

                        <View style={styles.featuredIcon}>
                            <Ionicons
                                name="star"
                                size={30}
                                color="#FFFFFF"
                            />
                        </View>

                        <View style={styles.featuredInfo}>

                            <Text
                                style={styles.featuredTitle}
                                numberOfLines={2}
                            >
                                {featuredRoutine.name}
                            </Text>

                            <View style={styles.featuredDetail}>

                                <Ionicons
                                    name="body-outline"
                                    size={15}
                                    color="#D90429"
                                />

                                <Text style={styles.featuredText}>
                                    {featuredRoutine.muscleGroup}
                                </Text>

                            </View>

                            <View style={styles.featuredDetail}>

                                <Ionicons
                                    name="time-outline"
                                    size={15}
                                    color="#777777"
                                />

                                <Text style={styles.featuredDuration}>
                                    {featuredRoutine.duration} minutos
                                </Text>

                            </View>

                        </View>

                        <View style={styles.featuredBadge}>

                            <Ionicons
                                name="checkmark-circle"
                                size={18}
                                color="#D90429"
                            />

                        </View>

                    </View>

                ) : (

                    <View style={styles.noFeaturedCard}>

                        <View style={styles.noFeaturedIcon}>

                            <Ionicons
                                name="star-outline"
                                size={28}
                                color="#D90429"
                            />

                        </View>

                        <View style={styles.noFeaturedInfo}>

                            <Text style={styles.noFeaturedTitle}>
                                No hay rutina destacada
                            </Text>

                            <Text style={styles.noFeaturedText}>
                                Selecciona una rutina desde Mis Rutinas
                                para destacarla.
                            </Text>

                        </View>

                    </View>

                )}

                {/* META */}
                <View style={styles.sectionHeader}>

                    <View style={styles.redIndicator} />

                    <Text style={styles.sectionTitle}>
                        Meta semanal
                    </Text>

                </View>

                <View style={styles.goalCard}>

                    <View style={styles.goalIcon}>
                        <Ionicons
                            name="flag"
                            size={27}
                            color="#D90429"
                        />
                    </View>

                    <View style={styles.goalInfo}>

                        <Text style={styles.goalTitle}>
                            4 entrenamientos
                        </Text>

                        <Text style={styles.goalText}>
                            Te falta 1 entrenamiento para completar tu meta
                        </Text>

                    </View>

                    <View style={styles.goalProgress}>

                        <Text style={styles.goalNumber}>
                            3/4
                        </Text>

                    </View>

                </View>

                {/* RACHA */}
                <View style={styles.sectionHeader}>

                    <View style={styles.redIndicator} />

                    <Text style={styles.sectionTitle}>
                        Tu racha
                    </Text>

                </View>

                <View style={styles.streakCard}>

                    <View style={styles.streakIcon}>
                        <Ionicons
                            name="flame"
                            size={31}
                            color="#FFFFFF"
                        />
                    </View>

                    <View style={styles.streakInfo}>

                        <Text style={styles.streakNumber}>
                            8 días
                        </Text>

                        <Text style={styles.streakText}>
                            Mantén tu constancia y sigue entrenando
                        </Text>

                    </View>

                    <View style={styles.streakBadge}>

                        <Text style={styles.streakBadgeText}>
                            🔥
                        </Text>

                    </View>

                </View>

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    /* CONTENEDOR */
    container: {
        flex: 1,
        backgroundColor: '#050505',
    },

    scrollContent: {
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 35,
    },

    /* ENCABEZADO */
    header: {
        backgroundColor: '#121212',
        borderRadius: 20,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#292929',
        marginBottom: 17,
    },

    headerIcon: {
        width: 54,
        height: 54,
        borderRadius: 17,
        backgroundColor: '#D90429',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },

    headerInfo: {
        flex: 1,
    },

    title: {
        fontSize: 27,
        fontWeight: '900',
        color: '#FFFFFF',
    },

    subtitle: {
        fontSize: 13,
        color: '#A7A7A7',
        marginTop: 4,
    },

    /* PROGRESO */
    progressCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 21,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E7E7E7',
        elevation: 6,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },

    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 18,
        backgroundColor: '#FDECEF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 13,
    },

    cardHeaderInfo: {
        flex: 1,
    },

    progressTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#171717',
    },

    smallText: {
        fontSize: 12,
        color: '#777777',
        marginTop: 4,
    },

    progressNumberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 17,
    },

    percentage: {
        fontSize: 44,
        fontWeight: '900',
        color: '#D90429',
    },

    progressBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FDECEF',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },

    progressBadgeText: {
        fontSize: 11,
        fontWeight: '800',
        color: '#D90429',
        marginLeft: 4,
    },

    progressBackground: {
        height: 12,
        backgroundColor: '#E8E8E8',
        borderRadius: 10,
        marginTop: 10,
        overflow: 'hidden',
    },

    progressBar: {
        width: '75%',
        height: '100%',
        backgroundColor: '#D90429',
        borderRadius: 10,
    },

    progressText: {
        fontSize: 13,
        color: '#777777',
        marginTop: 11,
    },

    /* SECCIONES */
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 11,
    },

    redIndicator: {
        width: 5,
        height: 22,
        borderRadius: 3,
        backgroundColor: '#D90429',
        marginRight: 9,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: '900',
        color: '#FFFFFF',
    },

    /* ESTADÍSTICAS */
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },

    statCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        paddingVertical: 19,
        paddingHorizontal: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E7E7E7',
        elevation: 5,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.22,
        shadowRadius: 5,
    },

    statIcon: {
        width: 53,
        height: 53,
        borderRadius: 17,
        backgroundColor: '#FDECEF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    statNumber: {
        fontSize: 28,
        fontWeight: '900',
        color: '#171717',
        marginTop: 9,
    },

    muscleGroupNumber: {
        fontSize: 17,
        fontWeight: '900',
        color: '#171717',
        marginTop: 14,
        textAlign: 'center',
    },

    statLabel: {
        fontSize: 13,
        color: '#777777',
        marginTop: 4,
        textAlign: 'center',
    },

    /* RUTINA DESTACADA */
    featuredCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 19,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#D90429',
        elevation: 5,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.22,
        shadowRadius: 5,
    },

    featuredIcon: {
        width: 58,
        height: 58,
        borderRadius: 18,
        backgroundColor: '#D90429',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 13,
    },

    featuredInfo: {
        flex: 1,
    },

    featuredTitle: {
        fontSize: 17,
        fontWeight: '900',
        color: '#171717',
    },

    featuredDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },

    featuredText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#D90429',
        marginLeft: 5,
    },

    featuredDuration: {
        fontSize: 12,
        color: '#777777',
        marginLeft: 5,
    },

    featuredBadge: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: '#FDECEF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    noFeaturedCard: {
        backgroundColor: '#121212',
        borderRadius: 18,
        padding: 17,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#292929',
    },

    noFeaturedIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: '#26070D',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 13,
    },

    noFeaturedInfo: {
        flex: 1,
    },

    noFeaturedTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#FFFFFF',
    },

    noFeaturedText: {
        fontSize: 12,
        color: '#999999',
        marginTop: 4,
        lineHeight: 17,
    },

    /* META */
    goalCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 17,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E7E7E7',
        elevation: 5,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.22,
        shadowRadius: 5,
    },

    goalIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: '#FDECEF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 13,
    },

    goalInfo: {
        flex: 1,
        paddingRight: 8,
    },

    goalTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#171717',
    },

    goalText: {
        fontSize: 12,
        color: '#777777',
        marginTop: 4,
        lineHeight: 17,
    },

    goalProgress: {
        minWidth: 45,
        height: 45,
        borderRadius: 14,
        backgroundColor: '#FDECEF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    goalNumber: {
        fontSize: 16,
        fontWeight: '900',
        color: '#D90429',
    },

    /* RACHA */
    streakCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 17,
        marginBottom: 25,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E7E7E7',
        elevation: 5,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.22,
        shadowRadius: 5,
    },

    streakIcon: {
        width: 58,
        height: 58,
        borderRadius: 18,
        backgroundColor: '#D90429',
        justifyContent: 'center',
        alignItems: 'center',
    },

    streakInfo: {
        marginLeft: 13,
        flex: 1,
        paddingRight: 8,
    },

    streakNumber: {
        fontSize: 21,
        fontWeight: '900',
        color: '#171717',
    },

    streakText: {
        fontSize: 12,
        color: '#777777',
        marginTop: 4,
        lineHeight: 17,
    },

    streakBadge: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: '#FDECEF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    streakBadgeText: {
        fontSize: 20,
    },

});