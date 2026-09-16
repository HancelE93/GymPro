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

export default function RoutineDetailScreen({ route }: any) {

    const idToView = route.params?.id;

    const { routines } = useRoutines();

    const routine = routines.find(
        item => item.id === idToView
    );

    if (!routine) {
        return (
            <SafeAreaView style={styles.safeArea}>

                <View style={styles.emptyContainer}>

                    <View style={styles.emptyIcon}>
                        <Ionicons
                            name="alert-circle-outline"
                            size={55}
                            color="#D90429"
                        />
                    </View>

                    <Text style={styles.emptyTitle}>
                        Rutina no encontrada
                    </Text>

                    <Text style={styles.emptyText}>
                        No se pudo encontrar la información
                        de esta rutina.
                    </Text>

                </View>

            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* ENCABEZADO */}
                <View style={styles.heroCard}>

                    <View style={styles.heroIcon}>
                        <Ionicons
                            name="fitness-outline"
                            size={42}
                            color="#D90429"
                        />
                    </View>

                    <Text style={styles.title}>
                        {routine.name}
                    </Text>

                    <Text style={styles.subtitle}>
                        Detalle de tu entrenamiento
                    </Text>

                </View>

                {/* INFORMACIÓN PRINCIPAL */}
                <View style={styles.mainCard}>

                    {/* GRUPO MUSCULAR */}
                    <View style={styles.infoRow}>

                        <View style={styles.iconBox}>
                            <Ionicons
                                name="body-outline"
                                size={24}
                                color="#D90429"
                            />
                        </View>

                        <View style={styles.infoContent}>

                            <Text style={styles.label}>
                                Grupo muscular
                            </Text>

                            <Text style={styles.value}>
                                {routine.muscleGroup}
                            </Text>

                        </View>

                    </View>

                    <View style={styles.divider} />

                    {/* DURACIÓN */}
                    <View style={styles.infoRow}>

                        <View style={styles.iconBox}>
                            <Ionicons
                                name="time-outline"
                                size={24}
                                color="#D90429"
                            />
                        </View>

                        <View style={styles.infoContent}>

                            <Text style={styles.label}>
                                Duración
                            </Text>

                            <Text style={styles.value}>
                                {routine.duration} minutos
                            </Text>

                        </View>

                    </View>

                    <View style={styles.divider} />

                    {/* FECHA */}
                    <View style={styles.infoRow}>

                        <View style={styles.iconBox}>
                            <Ionicons
                                name="calendar-outline"
                                size={24}
                                color="#D90429"
                            />
                        </View>

                        <View style={styles.infoContent}>

                            <Text style={styles.label}>
                                Fecha de creación
                            </Text>

                            <Text style={styles.value}>
                                {routine.createdAt}
                            </Text>

                        </View>

                    </View>

                </View>

                {/* RESUMEN */}
                <View style={styles.sectionHeader}>

                    <View style={styles.redIndicator} />

                    <Text style={styles.sectionTitle}>
                        Resumen
                    </Text>

                </View>

                <View style={styles.summaryCard}>

                    {/* GRUPO */}
                    <View style={styles.summaryItem}>

                        <View style={styles.summaryIcon}>
                            <Ionicons
                                name="fitness"
                                size={26}
                                color="#D90429"
                            />
                        </View>

                        <Text
                            style={styles.summaryNumber}
                            numberOfLines={2}
                        >
                            {routine.muscleGroup}
                        </Text>

                        <Text style={styles.summaryLabel}>
                            Grupo muscular
                        </Text>

                    </View>

                    {/* DURACIÓN */}
                    <View style={styles.summaryItem}>

                        <View style={styles.summaryIcon}>
                            <Ionicons
                                name="time"
                                size={26}
                                color="#D90429"
                            />
                        </View>

                        <Text style={styles.summaryNumber}>
                            {routine.duration}
                        </Text>

                        <Text style={styles.summaryLabel}>
                            Minutos
                        </Text>

                    </View>

                </View>

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: '#050505',
    },

    scrollContent: {
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 40,
    },

    /* ENCABEZADO ROJO */
    heroCard: {
        backgroundColor: '#D90429',
        borderRadius: 22,
        paddingVertical: 28,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 16,

        elevation: 7,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.35,
        shadowRadius: 7,
    },

    heroIcon: {
        width: 78,
        height: 78,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },

    title: {
        fontSize: 27,
        fontWeight: '900',
        color: '#FFFFFF',
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 14,
        color: '#FDECEF',
        marginTop: 6,
        textAlign: 'center',
    },

    /* CARD PRINCIPAL */
    mainCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
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

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#FDECEF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },

    infoContent: {
        flex: 1,
    },

    label: {
        fontSize: 12,
        color: '#888888',
        marginBottom: 4,
    },

    value: {
        fontSize: 17,
        fontWeight: '800',
        color: '#171717',
    },

    divider: {
        height: 1,
        backgroundColor: '#EAEAEA',
        marginVertical: 18,
    },

    /* TÍTULO DE SECCIÓN */
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

    /* RESUMEN */
    summaryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 22,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',

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

    summaryItem: {
        alignItems: 'center',
        width: '45%',
    },

    summaryIcon: {
        width: 54,
        height: 54,
        borderRadius: 17,
        backgroundColor: '#FDECEF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    summaryNumber: {
        fontSize: 17,
        fontWeight: '900',
        color: '#171717',
        marginTop: 9,
        textAlign: 'center',
    },

    summaryLabel: {
        fontSize: 12,
        color: '#777777',
        marginTop: 4,
        textAlign: 'center',
    },

    /* RUTINA NO ENCONTRADA */
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#050505',
    },

    emptyIcon: {
        width: 85,
        height: 85,
        borderRadius: 25,
        backgroundColor: '#26070D',
        borderWidth: 1,
        borderColor: '#450B16',
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyTitle: {
        fontSize: 23,
        fontWeight: '800',
        color: '#FFFFFF',
        marginTop: 18,
    },

    emptyText: {
        fontSize: 14,
        color: '#999999',
        marginTop: 8,
        lineHeight: 21,
        textAlign: 'center',
    },

});