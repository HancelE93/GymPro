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

                    <View style={styles.headerTop}>

                        <View style={styles.brandRow}>

                            <View style={styles.brandIcon}>

                                <Ionicons
                                    name="stats-chart"
                                    size={20}
                                    color="#FFFFFF"
                                />

                            </View>

                            <Text style={styles.brandText}>
                                GYMPRO
                            </Text>

                        </View>

                        <View style={styles.progressBadge}>

                            <Ionicons
                                name="trending-up"
                                size={15}
                                color="#D90429"
                            />

                            <Text style={styles.progressBadgeText}>
                                PROGRESO
                            </Text>

                        </View>

                    </View>

                    <Text style={styles.title}>
                        Mi Progreso
                    </Text>

                    <Text style={styles.subtitle}>
                        Visualiza el rendimiento de tus rutinas
                    </Text>

                </View>

                {/* ESTADÍSTICAS */}

                <View style={styles.sectionHeader}>

                    <View style={styles.redIndicator} />

                    <View>

                        <Text style={styles.sectionTitle}>
                            Resumen de entrenamiento
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                            Datos actualizados de tus rutinas
                        </Text>

                    </View>

                </View>

                {/* PRIMERA FILA */}

                <View style={styles.statsContainer}>

                    <View style={styles.statCard}>

                        <View style={styles.statCardTop}>

                            <View style={styles.statIcon}>

                                <Ionicons
                                    name="barbell"
                                    size={24}
                                    color="#D90429"
                                />

                            </View>

                            <View style={styles.statMiniBadge}>

                                <Ionicons
                                    name="fitness"
                                    size={13}
                                    color="#D90429"
                                />

                            </View>

                        </View>

                        <Text style={styles.statNumber}>
                            {totalRoutines}
                        </Text>

                        <Text style={styles.statLabel}>
                            Rutinas creadas
                        </Text>

                    </View>

                    <View style={styles.statCard}>

                        <View style={styles.statCardTop}>

                            <View style={styles.statIcon}>

                                <Ionicons
                                    name="time"
                                    size={24}
                                    color="#D90429"
                                />

                            </View>

                            <View style={styles.statMiniBadge}>

                                <Ionicons
                                    name="timer-outline"
                                    size={13}
                                    color="#D90429"
                                />

                            </View>

                        </View>

                        <View style={styles.numberRow}>

                            <Text style={styles.statNumber}>
                                {totalDuration}
                            </Text>

                            <Text style={styles.unitText}>
                                min
                            </Text>

                        </View>

                        <Text style={styles.statLabel}>
                            Tiempo total
                        </Text>

                    </View>

                </View>

                {/* SEGUNDA FILA */}

                <View style={styles.statsContainer}>

                    <View style={styles.statCard}>

                        <View style={styles.statCardTop}>

                            <View style={styles.statIcon}>

                                <Ionicons
                                    name="analytics"
                                    size={24}
                                    color="#D90429"
                                />

                            </View>

                            <View style={styles.statMiniBadge}>

                                <Ionicons
                                    name="speedometer-outline"
                                    size={13}
                                    color="#D90429"
                                />

                            </View>

                        </View>

                        <View style={styles.numberRow}>

                            <Text style={styles.statNumber}>
                                {averageDuration}
                            </Text>

                            <Text style={styles.unitText}>
                                min
                            </Text>

                        </View>

                        <Text style={styles.statLabel}>
                            Duración promedio
                        </Text>

                    </View>

                    <View style={styles.statCard}>

                        <View style={styles.statCardTop}>

                            <View style={styles.statIcon}>

                                <Ionicons
                                    name="body"
                                    size={24}
                                    color="#D90429"
                                />

                            </View>

                            <View style={styles.statMiniBadge}>

                                <Ionicons
                                    name="trophy-outline"
                                    size={13}
                                    color="#D90429"
                                />

                            </View>

                        </View>

                        <Text
                            style={styles.muscleGroupNumber}
                            numberOfLines={1}
                        >
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

                    <View>

                        <Text style={styles.sectionTitle}>
                            Rutina destacada
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                            Tu entrenamiento seleccionado
                        </Text>

                    </View>

                </View>

                {featuredRoutine ? (

                    <View style={styles.featuredCard}>

                        <View style={styles.featuredTop}>

                            <View style={styles.featuredIcon}>

                                <Ionicons
                                    name="star"
                                    size={28}
                                    color="#FFFFFF"
                                />

                            </View>

                            <View style={styles.featuredLabel}>

                                <Ionicons
                                    name="star"
                                    size={13}
                                    color="#D90429"
                                />

                                <Text style={styles.featuredLabelText}>
                                    DESTACADA
                                </Text>

                            </View>

                        </View>

                        <Text
                            style={styles.featuredTitle}
                            numberOfLines={2}
                        >
                            {featuredRoutine.name}
                        </Text>

                        <View style={styles.featuredDetailsRow}>

                            <View style={styles.featuredDetail}>

                                <Ionicons
                                    name="body-outline"
                                    size={16}
                                    color="#D90429"
                                />

                                <Text style={styles.featuredText}>
                                    {featuredRoutine.muscleGroup}
                                </Text>

                            </View>

                            <View style={styles.featuredSeparator} />

                            <View style={styles.featuredDetail}>

                                <Ionicons
                                    name="time-outline"
                                    size={16}
                                    color="#777777"
                                />

                                <Text style={styles.featuredDuration}>
                                    {featuredRoutine.duration} minutos
                                </Text>

                            </View>

                        </View>

                        <View style={styles.featuredFooter}>

                            <Text style={styles.featuredFooterText}>
                                Rutina seleccionada en Mis Rutinas
                            </Text>

                            <View style={styles.checkIcon}>

                                <Ionicons
                                    name="checkmark"
                                    size={17}
                                    color="#FFFFFF"
                                />

                            </View>

                        </View>

                    </View>

                ) : (

                    <View style={styles.noFeaturedCard}>

                        <View style={styles.noFeaturedIcon}>

                            <Ionicons
                                name="star-outline"
                                size={30}
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

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    /* CONTENEDOR */

    container: {
        flex: 1,
        backgroundColor: '#070707',
    },

    scrollContent: {
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 35,
    },

    /* ENCABEZADO */

    header: {
        backgroundColor: '#111111',
        borderRadius: 20,
        padding: 17,
        borderWidth: 1,
        borderColor: '#292929',
        marginBottom: 4,
    },

    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },

    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    brandIcon: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#D90429',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 9,
    },

    brandText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#D90429',
        letterSpacing: 2,
    },

    progressBadge: {
        height: 28,
        paddingHorizontal: 9,
        borderRadius: 9,
        backgroundColor: '#26070D',
        borderWidth: 1,
        borderColor: '#4A0B17',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    progressBadgeText: {
        fontSize: 9,
        fontWeight: '900',
        color: '#D90429',
        letterSpacing: 0.7,
    },

    title: {
        fontSize: 29,
        fontWeight: '900',
        color: '#FFFFFF',
    },

    subtitle: {
        fontSize: 12,
        color: '#858585',
        marginTop: 4,
    },

    /* SECCIONES */

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 22,
        marginBottom: 11,
    },

    redIndicator: {
        width: 5,
        height: 31,
        borderRadius: 3,
        backgroundColor: '#D90429',
        marginRight: 10,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: '900',
        color: '#FFFFFF',
    },

    sectionSubtitle: {
        fontSize: 11,
        color: '#777777',
        marginTop: 2,
    },

    /* ESTADÍSTICAS */

    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 11,
    },

    statCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 15,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        elevation: 5,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.22,
        shadowRadius: 5,
    },

    statCardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    statIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: '#FDECEF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    statMiniBadge: {
        width: 28,
        height: 28,
        borderRadius: 9,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
    },

    statNumber: {
        fontSize: 28,
        fontWeight: '900',
        color: '#171717',
        marginTop: 12,
    },

    numberRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 0,
    },

    unitText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#777777',
        marginLeft: 4,
    },

    muscleGroupNumber: {
        fontSize: 18,
        fontWeight: '900',
        color: '#171717',
        marginTop: 14,
    },

    statLabel: {
        fontSize: 11,
        color: '#777777',
        marginTop: 3,
    },

    /* RUTINA DESTACADA */

    featuredCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 17,
        borderWidth: 2,
        borderColor: '#D90429',
        elevation: 6,

        shadowColor: '#D90429',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },

    featuredTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    featuredIcon: {
        width: 53,
        height: 53,
        borderRadius: 16,
        backgroundColor: '#D90429',
        justifyContent: 'center',
        alignItems: 'center',
    },

    featuredLabel: {
        height: 28,
        paddingHorizontal: 10,
        borderRadius: 9,
        backgroundColor: '#FDECEF',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    featuredLabelText: {
        fontSize: 9,
        fontWeight: '900',
        color: '#D90429',
        letterSpacing: 0.5,
    },

    featuredTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#171717',
        marginTop: 13,
    },

    featuredDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 9,
    },

    featuredDetail: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    featuredText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#D90429',
        marginLeft: 5,
    },

    featuredDuration: {
        fontSize: 12,
        color: '#777777',
        marginLeft: 5,
        fontWeight: '600',
    },

    featuredSeparator: {
        width: 1,
        height: 18,
        backgroundColor: '#DDDDDD',
        marginHorizontal: 11,
    },

    featuredFooter: {
        marginTop: 15,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    featuredFooterText: {
        fontSize: 10,
        color: '#888888',
        fontWeight: '600',
    },

    checkIcon: {
        width: 30,
        height: 30,
        borderRadius: 9,
        backgroundColor: '#D90429',
        justifyContent: 'center',
        alignItems: 'center',
    },

    /* SIN RUTINA DESTACADA */

    noFeaturedCard: {
        backgroundColor: '#111111',
        borderRadius: 19,
        padding: 17,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#292929',
    },

    noFeaturedIcon: {
        width: 53,
        height: 53,
        borderRadius: 16,
        backgroundColor: '#26070D',
        borderWidth: 1,
        borderColor: '#450B16',
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

});